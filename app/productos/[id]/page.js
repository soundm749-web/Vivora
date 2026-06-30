import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return {};
  return {
    title: `${product.name} — Vivora`,
    description: product.description,
  };
}

export default function ProductoDetallePage({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  const hasDiscount =
    product.discountedPrice && product.discountedPrice < product.price;

  const relacionados = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link href="/productos" className="text-sm font-medium text-sage-600 hover:text-terracota-600">
        ← Volver a productos
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-beige-100 sm:h-[420px]">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-sage-500">
            {product.category}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-sage-900">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-sage-600">
            <span className="text-amber-500">★</span>
            <span className="font-semibold">{product.valoracion_media}</span>
            <span className="text-sm">— {product.resenas_resumen}</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            {hasDiscount ? (
              <>
                <span className="text-3xl font-bold text-terracota-600">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-lg text-sage-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="rounded-full bg-sage-100 px-2 py-1 text-xs font-semibold text-sage-700">
                  -{Math.round((1 - product.discountedPrice / product.price) * 100)}%
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-terracota-600">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="mt-4 text-sage-700">{product.description}</p>

          {product.destacado_editorial && (
            <div className="mt-5 rounded-xl border border-terracota-200 bg-terracota-50 p-4 text-sm text-terracota-700">
              <strong className="block font-semibold">Opinión Vivora</strong>
              {product.destacado_editorial}
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-sage-800">Pros</h3>
              <ul className="mt-2 space-y-1 text-sm text-sage-600">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-sage-500">✓</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sage-800">Contras</h3>
              <ul className="mt-2 space-y-1 text-sm text-sage-600">
                {product.contras.map((con, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-terracota-400">✕</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href={product.affiliate_link}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="btn-primary mt-8 inline-block"
          >
            Comprar en Amazon
          </a>
          <p className="mt-2 text-xs text-sage-400">
            Como afiliados de Amazon, podemos ganar una comisión por compras que cumplan los requisitos aplicables.
          </p>
        </div>
      </div>

      {relacionados.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-sage-900">También te puede interesar</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
