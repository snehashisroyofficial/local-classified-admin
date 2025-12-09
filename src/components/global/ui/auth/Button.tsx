import { cn } from "@/src/utils/tw/cn";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function SubmitButton({
  className,
  children,
  isLoading,
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={cn(
        // 1. Layout & Typography
        "w-full rounded-2xl p-3 font-semibold text-white",
        "flex items-center justify-center gap-2", // Centers text and spinner
        "transition-all duration-200", // Smooth hover animations

        // 2. Light Mode Colors
        "bg-primary hover:bg-primary/80",

        // 3. Dark Mode Colors (Using your theme variables)
        "dark:bg-dark-tertiary dark:hover:bg-dark-quinary",

        // 4. Interaction Effects
        "active:scale-[0.98]", // Subtle shrink on click

        // 5. Disabled State (Opacity + No cursor + No shrink)
        "disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100",

        className
      )}
      {...props}
    >
      {/* Show spinner if loading */}
      {isLoading && <Loader2 className="animate-spin" size={18} />}

      {/* Show text */}
      {children}
    </button>
  );
}
