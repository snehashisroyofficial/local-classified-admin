"use client";
import React, { forwardRef } from "react";
import clsx from "clsx";

export type ActionPopupProps = {
  open: boolean;
  children: React.ReactNode;
  className?: string;
};

const ActionPopup = forwardRef<HTMLDivElement, ActionPopupProps>(
  ({ open, children, className }, ref) => {
    if (!open) return null;

    return (
      <div
        ref={ref}
        className={clsx(
          `
        bg-white shadow-xl border-slate-100 z-50 py-2

        /* Mobile = Bottom Sheet */
        fixed bottom-0 left-0 right-0 w-full 
        rounded-t-2xl border-t
        animate-in slide-in-from-bottom-full fade-in duration-300
        flex flex-col gap-1 pb-6 sm:pb-2

        /* Desktop = Dropdown */
        sm:absolute sm:left-auto sm:right-0 sm:top-full 
        sm:bottom-auto sm:mt-2 sm:w-48 sm:rounded-lg sm:border
        sm:animate-in sm:zoom-in-95 sm:fade-in sm:slide-in-from-top-2
        sm:flex-col sm:gap-0
      `,
          className
        )}
      >
        {/* Mobile Handle */}
        <div className="mx-auto w-12 h-1.5 bg-slate-200 rounded-full my-2 sm:hidden" />

        {children}
      </div>
    );
  }
);

ActionPopup.displayName = "ActionPopup";
export default ActionPopup;
