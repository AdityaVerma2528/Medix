interface AuthHeaderProps {
    title: string;
    subtitle: string;
  }
  
  export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
    return (
      <div className="mb-7 text-center sm:text-left">
        <h2 className="text-[22px] font-semibold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#8791A6]">
          {subtitle}
        </p>
      </div>
    );
  }