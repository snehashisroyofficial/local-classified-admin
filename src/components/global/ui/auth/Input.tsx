"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { cn } from "@/src/utils/tw/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  passwordType?: "password" | "confirmPassword";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      passwordType = "password",
      label,
      error,
      icon: Icon,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField =
      type === "password" && passwordType === "confirmPassword";

    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <Icon size={18} />
            </div>
          )}

          <input
            ref={ref}
            type={isPasswordField ? (showPassword ? "text" : "password") : type}
            className={cn(
              "w-full rounded-2xl bg-gray-100 p-3 text-sm outline-none transition-all",
              "border-transparent focus:bg-white focus:ring-2 focus:ring-gray-300",
              "dark:bg-[#2d2d2d] dark:text-white dark:focus:ring-gray-600",

              Icon ? "pl-10" : "pl-4",
              isPasswordField ? "pr-10" : "pr-4",

              error && "ring-1 ring-red-500 bg-red-50 dark:bg-red-900/10",

              className
            )}
            {...props}
          />

          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium ml-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
