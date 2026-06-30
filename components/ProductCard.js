import Image from "next/image";
import Link from "next/link";

const CATEGORY_LABELS = {
  "smart-home": "Smart Home",
  cocina: "Cocina",
  limpieza: "Limpieza",
  organizacion: "Organización",
};

export default function ProductCard({ product }) {
  const hasDiscount =
    product.discountedPrice && product.discountedPrice < product.price;

  return (
    <div className="card flex flex-col overflow-hidden">
      <Link href={`/productos/${product.id}`} className="relative block h-48 w-full bg-beige-100">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
        />
        {product.isFeatured && (
          <span className="absolute left-3 top-3 rounded-full bg-terracota-500 px-3 py-1 text-xs font-semibold text-white">
            Destacado
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-sage-500">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </span>
        <Link href={`/productos/${product.id}`}>
          <h3 className="font-display text-lg font-semibold text-sage-900 hover:text-terracota-600">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-sage-600">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-terracota-600">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-sage-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-terracota-600">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-sm text-sage-600">
            ★ {product.valoracion_media}
          </span>
        </div>

        <a
          href={product.affiliate_link}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="btn-primary mt-3 text-center text-sm"
        >
          Ver en Amazon
        </a>
      </div>
    </div>
  );
}
