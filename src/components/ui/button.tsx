import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-exo",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-neon hover:shadow-neon",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-gold hover:shadow-gold",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "bg-gradient-primary text-primary-foreground hover:shadow-neon transition-all duration-300",
        street: "bg-gradient-street text-foreground font-bold hover:scale-105 transition-all duration-300 shadow-card",
        krump: "bg-muted text-muted-foreground border-2 border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-neon transition-all duration-300",
        hero: "bg-gradient-dark text-foreground border border-primary/30 hover:border-primary hover:shadow-neon backdrop-blur-sm transition-all duration-300",
        premium: "bg-gradient-to-br from-primary via-secondary to-accent text-white font-bold shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)] transform hover:scale-105 border border-primary/30 backdrop-blur-sm",
        cyber: "bg-gradient-to-r from-cyan via-primary to-magenta text-white font-semibold shadow-[0_0_20px_hsl(180_100%_50%/0.3)] hover:shadow-[0_0_40px_hsl(180_100%_50%/0.5)] transform hover:scale-105 relative overflow-hidden",
        glass: "glass text-foreground hover:bg-background/60 border border-border/30 hover:border-border/50 shadow-lg hover:shadow-xl transform hover:scale-105"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-lg",
        xl: "h-14 rounded-xl px-10 text-xl",
        xxl: "h-16 rounded-xl px-16 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
