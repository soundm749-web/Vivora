import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "@/data/posts.json";
import products from "@/data/products.json";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Vivora`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const recommended = post.recommended_product_id
    ? products.find((p) => p.id === post.recommended_product_id)
    : null;

  const paragraphs = post.content.split("\n\n");

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/blog" className="text-sm font-medium text-sage-600 hover:text-terracota-600">
        ← Volver al blog
      </Link>

      <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-sage-500">
        {formatDate(post.date)}
      </span>
      <h1 className="mt-2 font-display text-3xl font-bold text-sage-900 sm:text-4xl">
        {post.title}
      </h1>

      <div className="relative mt-6 h-64 w-full overflow-hidden rounded-2xl bg-beige-100 sm:h-96">
        <Image
          src={post.image_url}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <article className="mt-8 space-y-4 text-sage-700">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>

      {recommended && (
        <div className="mt-10 rounded-2xl border border-terracota-200 bg-terracota-50 p-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-terracota-600">
            Producto recomendado
          </span>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl bg-white sm:w-32">
              <Image
                src={recommended.image_url}
                alt={recommended.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-sage-900">
                {recommended.name}
              </h3>
              <p className="mt-1 text-sm text-sage-600 line-clamp-2">
                {recommended.description}
              </p>
              <Link
                href={`/productos/${recommended.id}`}
                className="btn-primary mt-3 inline-block text-sm"
              >
                Ver producto
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
