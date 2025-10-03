// badgeVariants.js
import { cva } from "class-variance-authority";

export const badgeVariants = cva("inline-flex items-center rounded-md text-sm font-medium", {
  variants: {
    variant: {
      default: "bg-gray-200 text-gray-900",
      primary: "bg-blue-500 text-white",
    },
    size: {
      default: "px-2 py-1",
      sm: "px-1 py-0.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
