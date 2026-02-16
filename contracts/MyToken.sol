// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

// 1. ASSET TOKEN (The currency being staked)
contract AssetToken is ERC20, Ownable {
    // WARNING: 'mint' is public for testing purposes only. 
    // In production, restrict this to Ownable or specific roles.
    constructor() ERC20("USDNTL", "USDNTL") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

// 2. SHARE TOKEN (The receipt token received when staking)
contract ShareToken is ERC20, Ownable {
    address public stakingContract;

    constructor() ERC20("Staked USDNTL", "S USDNTL") Ownable(msg.sender) {}

    function setStakingContract(address _stakingContract) external onlyOwner {
        stakingContract = _stakingContract;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == stakingContract, "Only Staking Contract can mint");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(msg.sender == stakingContract, "Only Staking Contract can burn");
        _burn(from, amount);
    }
}

interface IShareToken is IERC20 {
    function mint(address to, uint256 amount) external;
    function burn(address from, uint256 amount) external;
}

// 3. STAKING MECHANISM (Logic updated)
contract StakingMechanism is Ownable {
    IERC20 public assetToken;
    IShareToken public shareToken;
    
    // Annual Interest Rate in Basis Points (1000 = 10%)
    uint256 public interestRateBasisPoints; 
    uint256 public constant SECONDS_IN_YEAR = 31536000; 

    struct StakeInfo {
        uint256 principal;      // Amount of AssetToken deposited
        uint256 startTime;      // Timestamp when deposit happened
    }

    // Mapping to track each user's stake
    mapping(address => StakeInfo) public stakes;

    constructor(
        address _assetToken, 
        address _shareToken, 
        uint256 _interestRateBasisPoints
    ) Ownable(msg.sender) {
        assetToken = IERC20(_assetToken);
        shareToken = IShareToken(_shareToken);
        interestRateBasisPoints = _interestRateBasisPoints;
    }

    // --- REWARD LOGIC ---

    /**
     * @dev Calculates the interest earned based on time elapsed since deposit.
     * Formula: (Principal * Rate * TimeDelta) / (Year * 10000)
     */
    function calculateReward(address _user) public view returns (uint256) {
        StakeInfo memory userStake = stakes[_user];
        
        if (userStake.principal == 0) return 0;

        uint256 timeElapsed = block.timestamp - userStake.startTime;
        
        // Interest calculation
        // Example: 100 Tokens * 10% (1000 bps) * 1 Year (31536000) / (31536000 * 10000) = 10 Tokens
        uint256 reward = (userStake.principal * interestRateBasisPoints * timeElapsed) / (SECONDS_IN_YEAR * 10000);
        
        return reward;
    }

    // --- CORE FUNCTIONS ---

    function deposit(uint256 assets) external {
        require(assets > 0, "Cannot stake 0");
        require(stakes[msg.sender].principal == 0, "Already staking. Withdraw first.");

        // 1. Transfer Assets from User to Contract
        assetToken.transferFrom(msg.sender, address(this), assets);

        // 2. Record the stake details (State Update)
        stakes[msg.sender] = StakeInfo({
            principal: assets,
            startTime: block.timestamp
        });

        // 3. Mint Receipt Tokens (1:1 ratio for simplicity of tracking)
        shareToken.mint(msg.sender, assets);
    }

    function withdraw() external {
        StakeInfo memory userStake = stakes[msg.sender];
        require(userStake.principal > 0, "No active stake found");

        // 1. Calculate Interest
        uint256 interest = calculateReward(msg.sender);
        uint256 totalPayout = userStake.principal + interest;

        // 2. Check if Contract has liquidity to pay interest
        require(assetToken.balanceOf(address(this)) >= totalPayout, "Contract has insufficient liquidity for rewards");

        // 3. Clear User State
        delete stakes[msg.sender];

        // 4. Burn the Receipt Tokens
        shareToken.burn(msg.sender, userStake.principal);

        // 5. Transfer Principal + Interest to User
        assetToken.transfer(msg.sender, totalPayout);
    }

    // --- ADMIN FUNCTIONS ---

    // Allow owner to change the interest rate
    function setInterestRate(uint256 _newBasisPoints) external onlyOwner {
        interestRateBasisPoints = _newBasisPoints;
    }

    // Allow owner to deposit funds to pay for the rewards (Inject Liquidity)
    function fundRewards(uint256 amount) external {
        assetToken.transferFrom(msg.sender, address(this), amount);
    }
}
