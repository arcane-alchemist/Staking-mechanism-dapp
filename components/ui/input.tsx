import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, onChange, min, ...props }, ref) => {
    const isNumber = type === 'number'
    const effectiveMin = isNumber && min === undefined ? 0 : min

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isNumber && e.target.value !== '') {
        const num = parseFloat(e.target.value)
        if (!Number.isNaN(num) && num < 0) {
          e = { ...e, target: { ...e.target, value: '0' } } as React.ChangeEvent<HTMLInputElement>
        }
      }
      onChange?.(e)
    }

    return (
      <input
        type={type}
        min={effectiveMin}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
