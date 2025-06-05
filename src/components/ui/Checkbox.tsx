"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, onCheckedChange, ...props }, ref) => {
  const [checked, setChecked] = React.useState(props.checked || false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked
    setChecked(newChecked)
    onCheckedChange?.(newChecked)
    props.onChange?.(e)
  }

  return (
    <div className="relative">
      <input type="checkbox" className="sr-only" ref={ref} {...props} checked={checked} onChange={handleChange} />
      <div
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 check-bg",
          checked ? "bg-primary text-primary-foreground" : "check-bg",
          className,
        )}
        onClick={() => {
          const newChecked = !checked
          setChecked(newChecked)
          onCheckedChange?.(newChecked)
        }}
      >
        {checked && <Check className="h-4 w-4 text-white" />}
      </div>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
