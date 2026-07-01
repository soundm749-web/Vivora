"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";

const CATEGORIES = [
  { value: "todas", label: "Todas" },
  { value: "smart-home", label: "Smart Home" },
  { value: "cocina", label: "Cocina" },
  { value: "aspiradoras", label: "Aspiradoras" },
  { value: "limpieza", label: "Limpieza" },
  { value: "hogar", label: "Hogar" },
];

function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function matchesSearch(product, term) {
  if (!term) return true;
  const n = normalize(term);
  const haystack = normalize(
    [
      product.name,
      product.marca,
      product.category,
      product.description,
      ...(product.tags || []),
    ].join(" ")
  );
  return haystack.includes(n);
}

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
  const [query, setQuery] = useState("");

  useEffect(() => {
    setCategoria(searchParams.get("categoria") || "todas");
  }, [searchParams]);

  const filtrados = useMemo(() => {
    return products.filter(
      (p) =>
        (categoria === "todas" || p.category === categoria) &&
        matchesSearch(p, query)
    );
  }, [categoria, query]);

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
        Filtra por categoría o busca el gadget perfecto para tu hogar.
      </p>

      {/* Buscador */}
      <div className="mt-6 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-400 text-lg select-none pointer-events-none">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar producto... (ej: freidora, enchufe wifi, cámara)"
          className="w-full rounded-2xl border border-beige-300 bg-white py-4 pl-12 pr-4 text-sage-800 placeholder-sage-400 shadow-sm focus:border-terracota-400 focus:outline-none focus:ring-2 focus:ring-terracota-200 text-base"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600 text-xl"
            aria-label="Borrar búsqueda"
          >
            ×
          </button>
        )}
      </div>

      {/* Filtros de categoría */}
      <div className="mt-4 flex flex-wrap gap-2">
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

      {/* Resultados */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtrados.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtrados.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-2xl">🔎</p>
          <p className="mt-2 font-semibold text-sage-700">
            No encontramos productos para &ldquo;{query}&rdquo;
          </p>
          <p className="mt-1 text-sm text-sage-500">
            Prueba con: freidora, aspiradora, enchufe, cámara, bombilla, difusor...
          </p>
          <button
            onClick={() => { setQuery(""); handleSelect("todas"); }}
            className="btn-secondary mt-4 text-sm"
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  );
}
