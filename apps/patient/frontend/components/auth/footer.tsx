import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkLabel: string;
  href: string;
}

export function AuthFooter({ text, linkLabel, href }: AuthFooterProps) {
  return (
    <p className="mt-7 text-center text-[13.5px] text-[#8791A6]">
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-[#8CA0FF] transition-colors duration-150 hover:text-[#A7B7FF]"
      >
        {linkLabel}
      </Link>
    </p>
  );
}