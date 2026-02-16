// SPDX-License-Identifier: MIT
// asset contract for testing
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract ShareToken is ERC20, Ownable {
    address public stakingContract;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable(msg.sender) {}

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

contract StakingMechanism {
    IERC20 public assetToken;
    IShareToken public shareToken;
    string public metadataHash; 

    constructor(address _assetToken, address _shareToken, string memory _metadataHash) {
        assetToken = IERC20(_assetToken);
        shareToken = IShareToken(_shareToken);
        metadataHash = _metadataHash;
    }

    function previewDeposit(uint256 assets) public pure returns (uint256) {
        return assets; 
    }
    
    uint256 public constant SECONDS_IN_YEAR = 31536000; // 365 * 24 * 60 * 60
    function calculateReward(uint256 amount, uint256 interestRate, uint256 durationInSeconds) public pure returns (uint256) {
        uint256 interest = (amount * interestRate * durationInSeconds) / (100 * SECONDS_IN_YEAR);
        return interest;
    }
    function previewDeposit(uint256 assetAmount, uint256 interestRate, uint256 durationInSeconds) external pure returns (uint256) {
        uint256 interest = calculateReward(assetAmount, interestRate, durationInSeconds);
        return assetAmount + interest; // Returns total User will have
    }
    function previewWithdraw(uint256 shareAmount, uint256 interestRate, uint256 durationInSeconds) external pure returns (uint256) {
        uint256 principal = shareAmount; 
        
        uint256 interest = calculateReward(principal, interestRate, durationInSeconds);
        return principal + interest; // Returns Principal + Earned Interest
    }

    function deposit(uint256 assets) external {
        require(assets > 0, "Cannot stake 0");
        
        uint256 shares = previewDeposit(assets);

        assetToken.transferFrom(msg.sender, address(this), assets);

        shareToken.mint(msg.sender, shares);
    }

    function previewWithdraw(uint256 shares) public pure returns (uint256) {
        return shares;
    }

    function withdraw(uint256 shares) external {
        require(shares > 0, "Cannot withdraw 0");

        uint256 assets = previewWithdraw(shares);

        shareToken.burn(msg.sender, shares);

        assetToken.transfer(msg.sender, assets);
    }
}
