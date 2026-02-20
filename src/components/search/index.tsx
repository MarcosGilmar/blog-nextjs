import { cn } from "@/lib/utils";
import { CircleX, SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useCallback } from "react";

export function Search() {
  const router = useRouter();
  const query = (router.query.q as string) ?? "";

  const handleSearch = useCallback(
    (event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (query.trim()) {
        router.push(`/blog?q=${encodeURIComponent(query)}`);
      }
    },
    [query, router],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    router.push(`/blog?q=${encodeURIComponent(newQuery)}`, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  const resetSearch = () => {
    router.push(`/blog`, undefined, {
        scroll: false,
        shallow: true
    })
  }

  return (
    <form onSubmit={handleSearch} className="relative group w-full md:w-60">
      <SearchIcon
        className={cn(
          `
                    absolute left-3 top-1/2 -translate-y-1/2  
                    h-4 w-4 transition-colors duration-200 
                    text-gray-300 group-focus-within:text-blue-300`,
          query && "text-blue-300",
        )}
      />
      <input
        type="text"
        value={query}
        placeholder="Buscar"
        onChange={handleQueryChange}
        className="
                    bg-transparent border border-gray-400 text-gray-100 text-body-sm
                    h-10 w-full md:w-60 pl-9 rounded-md outline-none transition-all duration-200 
                    focus-within:border-blue-300 focus-within:ring-1 focus-whitin:ring-blue-300
                    placeholder:text-gray-300 placeholder:text-body-sm
                    "
      />
        { query && (
            <CircleX 
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4"
                onClick={resetSearch}
            />
        )}
    </form>
  );
}
