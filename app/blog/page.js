import Image from "next/image";
import Link from "next/link";
import posts from "@/data/posts.json";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const metadata = {
  title: "Blog — Vivora",
  description: "Tips, guías e ideas para hacer tu hogar más simple con los gadgets correctos.",
};

export default function BlogPage() {
  const ordenados = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-sage-900">Blog</h1>
      <p className="mt-2 text-sage-600">
        Tips, guías e ideas para hacer tu hogar más simple con los gadgets correctos.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordenados.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="card flex flex-col overflow-hidden">
            <div className="relative h-44 w-full bg-beige-100">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-sage-500">
                {formatDate(post.date)}
              </span>
              <h2 className="font-display text-lg font-semibold text-sage-900 hover:text-terracota-600">
                {post.title}
              </h2>
              <p className="line-clamp-3 text-sm text-sage-600">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
