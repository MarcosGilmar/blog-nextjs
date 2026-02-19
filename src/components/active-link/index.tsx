import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactNode;
}

export function ActiveLink({ children, href, ...rest }: ActiveLinkProps) {
  const router = useRouter();
  const isCurrentPath = router.asPath === href || router.asPath === rest.as;

  return (
    <Link
      href={href}
      className={cn(
        "text-actio-sm transition-colors hover:text-blue-200",
        isCurrentPath ? "text-blue-500" : "text-gray-100",
      )}
    >
      {children}
    </Link>
  );
}
