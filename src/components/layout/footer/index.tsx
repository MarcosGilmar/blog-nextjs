import { Logo } from "@/components/logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className=" bg-gray-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-6 lg:px-8">
        <div className="flex justify-between items-center sm:justify-evenly md:flex-row md:justify-between gap-8 py-8">
          <Logo src="/Brand-Logo.svg" />
          <nav
            className="
                        flex flex-col md:flex-row 
                        items-center gap-4 
                        text-sm text-blue-100
                        justify-center
                        "
          >
            <Link href="/termos-de-uso" className="hover:text-blue-200">
              Termos de uso
            </Link>
            <Link
              href="/politica-de-privacidade"
              className="hover:text-blue-200"
            >
              Política de privacidade
            </Link>
            <Link href="/feedback" className="hover:text-blue-200">
              Feedback
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
