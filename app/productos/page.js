"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";

const CATEGORIES = [
  { value: "todas", label: "Todas" },
  { value: "smart-home", label: "Smart Home" },
  { value: "cocina", label: "Cocina" },
  { value: "limpieza", label: "Limpieza" },
  { value: "organizacion", label: "Organización" },
];

export default function ProductosPage() {
  return (
    <Suspense fallback={null}>
      <ProductosContent />
    </Suspense>
  );
}

function ProductosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("categoria") || "todas";
  const [categoria, setCategoria] = useState(initialCategory);

  useEffect(() => {
    setCategoria(searchParams.get("categoria") || "todas");
  }, [searchParams]);

  const filtrados = useMemo(() => {
    if (categoria === "todas") return products;
    return products.filter((p) => p.category === categoria);
  }, [categoria]);

  function handleSelect(cat) {
    setCategoria(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "todas") {
      params.delete("categoria");
    } else {
      params.set("categoria", cat);
    }
    const qs = params.toString();
    router.push(qs ? `/productos?${qs}` : "/productos");
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-sage-900">Todos los productos</h1>
      <p className="mt-2 text-sage-600">
        Filtra por categoría para encontrar el gadget perfecto para tu hogar.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => handleSelect(c.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              categoria === c.value
                ? "border-terracota-500 bg-terracota-500 text-white"
                : "border-beige-300 bg-white text-sage-700 hover:bg-sage-50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtrados.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtrados.length === 0 && (
        <p className="mt-12 text-center text-sage-500">
          No hay productos en esta categoría todavía.
        </p>
      )}
    </div>
  );
}
