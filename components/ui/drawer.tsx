"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  anchor?: "left" | "right" | "top" | "bottom";
  className?: string;
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ open, onClose, children, anchor = "right", className }, ref) => {
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [open]);

    if (!open) return null;

    const slideClasses = {
      right: "right-0 top-0 h-full w-80 sm:w-96 transform transition-transform",
      left: "left-0 top-0 h-full w-80 sm:w-96 transform transition-transform",
      top: "top-0 left-0 w-full h-80 transform transition-transform",
      bottom: "bottom-0 left-0 w-full h-80 transform transition-transform",
    };

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          ref={ref}
          className={cn(
            "fixed bg-white shadow-xl z-50",
            slideClasses[anchor],
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </>
    );
  }
);
Drawer.displayName = "Drawer";

export { Drawer };
