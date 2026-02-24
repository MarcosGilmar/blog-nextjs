import { Avatar } from "@/components/avatar";
import { Markdown } from "@/components/markdown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/use-share";
import { allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export function PostPage() {
  const router = useRouter();

  const slug = router.query.slug as string;

  const posts = allPosts.find((posts) =>
    slug ? posts.slug.toLowerCase() === slug.toLowerCase() : false,
  );

  const publishedDate = posts?.date
    ? new Date(posts.date).toLocaleDateString("pt-BR")
    : "";

  const postUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `/blog/${slug}`;

  const { shareButtons } = useShare({
    url: postUrl,
    title: posts?.title,
    text: posts?.description,
  });

  return (
    <main className="mt-32 text-gray-100 text-action-sm">
      <div className="container space-y-12 px-4 md:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/blog">Blog</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <span className="text-blue-200 text-action-sm">
                {posts?.title}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-12">
          <article className="bg-gray-600 rounded-lg overflow-hidden border-gray-400 border">
            <figure className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={posts?.image ?? ""}
                alt={posts?.description ?? ""}
                fill
                className="object-cover"
              ></Image>
            </figure>

            <header className="p-4 md:p-6 lg:p-12 pb-0 mt-8 md:mt-12">
              <h1 className="mb-8 text-balance text-heading-lg md:text-heading-xl lg:text-heading-xl">
                {posts?.title}
              </h1>

              <Avatar.Container>
                <Avatar.Image
                  src={posts?.author.avatar ?? ""}
                  alt={posts?.author.name ?? ""}
                  size="sm"
                />
                <Avatar.Content>
                  <Avatar.Title>{posts?.author.name}</Avatar.Title>
                  <Avatar.Description>
                    Publicado em
                    <time dateTime={posts?.date}> {publishedDate}</time>
                  </Avatar.Description>
                </Avatar.Content>
              </Avatar.Container>
            </header>

            <div className="prose prose-invert max-w-none px-4 mt-12 md:px-6 lg:px-12">
              <Markdown content={posts?.body.raw ?? ""} />
            </div>
          </article>

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
        </div>
      </div>
    </main>
  );
}
