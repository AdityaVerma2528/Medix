import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  showLabel?: boolean;
}

/**
 * Logo mark built purely from gradients + shape — swap the inner
 * shape for your real mark later, the wrapper sizing/spacing can stay.
 */
export function BrandMark({ className, showLabel = true }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#5B8CFF] to-[#9B6BFF] shadow-[0_0_20px_rgba(91,140,255,0.45)]">
        <div className="h-2.5 w-2.5 rounded-[3px] bg-white/95" />
      </div>
      {showLabel && (
        <span className="text-[15px] font-semibold tracking-tight text-white">
          Acme
        </span>
      )}
    </div>
  );
}