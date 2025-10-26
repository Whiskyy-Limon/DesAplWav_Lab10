export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center">
      <h1 className="text-5xl font-bold text-yellow-400 mb-4">
        🚫 Página no encontrada
      </h1>
      <p className="text-gray-400 mb-8">
        La ruta que intentas acceder no existe o fue movida.
      </p>
      <a
        href="/"
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white font-semibold"
      >
        🏠 Volver al inicio
      </a>
    </div>
  );
}
