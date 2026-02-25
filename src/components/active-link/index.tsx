'use client'
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactNode;
}

export function ActiveLink({ children, href, ...rest }: ActiveLinkProps) {
  const linkPath = (typeof href === 'string' ? href : href.pathname) ?? "";
  const pathname = usePathname();
  const isActive = linkPath === pathname || pathname?.startsWith(`${linkPath}`)

  return (
    <Link
      {...rest}
      href={href}
      className={cn(
        "text-actio-sm transition-colors hover:text-blue-200",
        isActive ? "text-blue-500" : "text-gray-100",
      )}
    >
      {children}
    </Link>
  );
}
