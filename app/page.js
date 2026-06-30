import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";

export default function HomePage() {
  const destacados = products.filter((p) => p.isFeatured);

  return (
    <>
      <section className="bg-gradient-to-b from-crema-200 to-crema-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center">
          <span className="rounded-full bg-sage-100 px-4 py-1 text-sm font-medium text-sage-700">
            Gadgets para un hogar más fácil
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight text-sage-900 sm:text-5xl">
            Pequeños cambios, <span className="text-terracota-500">grandes mejoras</span> en tu casa
          </h1>
          <p className="max-w-2xl text-lg text-sage-600">
            Hogar inteligente, vida más simple
          </p>
          <Link href="/productos" className="btn-primary">
            Explorar productos
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-sage-900 sm:text-3xl">
            Productos destacados
          </h2>
          <Link href="/productos" className="text-sm font-semibold text-terracota-600 hover:underline">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-sage-100">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:grid-cols-4">
          {[
            { label: "Smart Home", cat: "smart-home" },
            { label: "Cocina", cat: "cocina" },
            { label: "Limpieza", cat: "limpieza" },
            { label: "Organización", cat: "organizacion" },
          ].map((c) => (
            <Link
              key={c.cat}
              href={`/productos?categoria=${c.cat}`}
              className="card flex items-center justify-center px-4 py-8 text-center font-display text-lg font-semibold text-sage-800 hover:text-terracota-600"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
