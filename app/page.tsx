export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-green-400 mb-4">
        🌌 Bienvenido a la App
      </h1>
      <p className="text-gray-300 mb-8">Selecciona una sección:</p>

      <div className="flex gap-6">
        <a
          href="/pokemon"
          className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-800 transition"
        >
          Pokédex
        </a>
        <a
          href="/rickandmorty"
          className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-800 transition"
        >
          Rick and Morty
        </a>
      </div>
    </main>
  );
}
