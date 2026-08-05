interface DividerProps {
    label?: string;
  }
  
  export function Divider({ label = "or continue with" }: DividerProps) {
    return (
      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-white/[0.08]" />
        <span className="text-[12px] uppercase tracking-wide text-[#5C6577]">
          {label}
        </span>
        <div className="h-px flex-1 bg-white/[0.08]" />
      </div>
    );
  }