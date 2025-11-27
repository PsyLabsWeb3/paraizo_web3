import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-black/20 animate-pulse rounded-base border-2 border-transparent",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
