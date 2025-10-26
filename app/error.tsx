"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error detectado:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center">
      <h1 className="text-5xl font-bold text-red-500 mb-4">💥 ¡Error en la aplicación!</h1>
      <p className="text-gray-400 mb-6">Algo salió mal. Intenta recargar la página o volver a intentarlo.</p>

      <button
        onClick={() => reset()}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white font-semibold"
      >
        🔄 Reintentar
      </button>
    </div>
  );
}
