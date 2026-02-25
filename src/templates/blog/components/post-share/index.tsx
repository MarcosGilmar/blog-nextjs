'use client'
import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/use-share";

type PostShareProps = {
  url: string;
  title: string;
  description: string;
};

export function PostShare({ url, description, title }: PostShareProps) {
  const { shareButtons } = useShare({
    url,
    title,
    text: description
  });

  return (
    <aside className="space-y-6">
      <div className="rounded-lg bg-gray-700 md:px-6">
        <h2 className="mb-4 text-heading-xs">Compartilhar</h2>

        <div className="space-y-3">
          {shareButtons.map((provider) => (
            <Button
              key={provider.provider}
              variant="outline"
              onClick={() => provider.action()}
              className="w-full justify-start gap-2"
            >
              {provider.icon}
              {provider.name}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}
