import "./globals.css";

export const metadata = {
  title: "Vivora — Gadgets que hacen tu hogar más fácil",
  description:
    "Vivora selecciona los mejores gadgets para el hogar: smart home, cocina, limpieza y organización. Reseñas honestas y recomendaciones cuidadas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-crema-100 font-sans text-sage-800">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="border-b border-beige-200 bg-crema-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="font-display text-2xl font-bold text-terracota-600">
          Vivora
        </a>
        <nav className="flex gap-6 text-sm font-medium text-sage-700">
          <a href="/" className="hover:text-terracota-500">Inicio</a>
          <a href="/productos" className="hover:text-terracota-500">Productos</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-beige-200 bg-sage-800 text-beige-100">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold text-crema-100">Vivora</p>
          <p className="mt-2 text-sm text-beige-200">
            Gadgets cuidadosamente seleccionados para hacer tu hogar más cálido, práctico y bonito.
          </p>
        </div>
        <div>
          <p className="font-semibold text-crema-100">Explora</p>
          <ul className="mt-2 space-y-1 text-sm text-beige-200">
            <li><a href="/productos" className="hover:text-crema-100">Todos los productos</a></li>
            <li><a href="/productos?categoria=smart-home" className="hover:text-crema-100">Smart Home</a></li>
            <li><a href="/productos?categoria=cocina" className="hover:text-crema-100">Cocina</a></li>
            <li><a href="/productos?categoria=limpieza" className="hover:text-crema-100">Limpieza</a></li>
            <li><a href="/productos?categoria=organizacion" className="hover:text-crema-100">Organización</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-crema-100">Aviso</p>
          <p className="mt-2 text-sm text-beige-200">
            Vivora participa en el Programa de Afiliados de Amazon. Podemos recibir una
            comisión por compras realizadas a través de nuestros enlaces, sin coste extra para ti.
          </p>
        </div>
      </div>
      <div className="border-t border-sage-700 py-4 text-center text-xs text-beige-200">
        © {new Date().getFullYear()} Vivora. Todos los derechos reservados.
      </div>
    </footer>
  );
}
