import { Search } from "@/components/search";
import { useRouter } from "next/router";
import { PostCard } from "./components/post-card";
import { PostGridCard } from "./components/post-grid-card";
import { allPosts } from "contentlayer/generated";
import { Inbox } from "lucide-react";

export function BlogList() {
  const router = useRouter();
  const query = (router.query.q as string) ?? "";

  const blogTitle = query
    ? `Resultados de pesquisa para: ${query} `
    : "Dicas e estratégias para impulsionar seu negócio";

  const posts = query ? allPosts.filter((post) => post.title.toLowerCase()?.includes(query.toLowerCase())) : allPosts;

  const hasPosts = posts.length > 0;

  return (
    <div className="flex flex-col py-15 grow h-full">
      <header className="pb-5">
        <div className="container gap-6 flex flex-col items-start justify-between md:flex-row md:items-end">
          <div className="flex flex-col gap-4 px-4 md:px-0">
            <span className="text-body-tag text-cyan-100 w-fit rounded-md text-center md:text-left py-2 px-4 bg-cyan-300">
              Blog
            </span>

            <h1 className="text-start text-wrap md:text-left text-heading-lg md:text-heading-xl text-gray-200 max-w-2xl ">
              {blogTitle}
            </h1>
          </div>
          <div className="px-4 w-full md:w-60">
            <Search />
          </div>
        </div>
      </header>

      {hasPosts && (
        <PostGridCard>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              title={post.title}
              description={post.description}
              date={new Date(post.date).toLocaleDateString("pt-BR")}
              image={post.image}
              slug={post.slug}
              author={{
                avatar: post.author?.avatar,
                name: post.author?.name,
              }}
            />
          ))}
        </PostGridCard>
      )}

      {!hasPosts && (
        <div className="container">
          <div className="
            flex flex-col items-center justify-center
            gap-8 border-dashed border-2 border-gray-300
            p-8 md:p-12 rounded-lg
            "
          >
            <Inbox  className="h-12 w-12 text-cyan-100"/>
            <p className="text-gray-100 text-center">Nenhum post encontrado</p>
          </div>
        </div>
      )}
    </div>
  );
}
