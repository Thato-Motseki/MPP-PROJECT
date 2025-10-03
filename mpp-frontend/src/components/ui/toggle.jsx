"use client";

import React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle@1.1.2";
import { cn } from "./utils";
import { toggleVariants } from "./toggleVariants";

function Toggle({ className, variant, size, ...props }) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle };
