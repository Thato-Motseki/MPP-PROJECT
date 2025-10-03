import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";
import { badgeVariants } from "./badgeVariants";

function Badge(props) {
  const {
    className,
    variant,
    asChild = false,
    ...rest
  } = props;

  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...rest}
    />
  );
}

export { Badge };

