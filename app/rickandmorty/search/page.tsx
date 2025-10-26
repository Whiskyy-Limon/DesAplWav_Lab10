"use client";

import { useEffect, useState } from "react";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  gender: string;
  type: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
        .then((res) => res.json())
        .then((data) => setCharacters(data.results || []))
        .catch(() => setCharacters([]));
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-green-400 mb-4">Buscar Personajes</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por nombre..."
        className="text-black rounded-md px-4 py-2 mb-6 w-80"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {characters.map((c) => (
          <div key={c.id} className="bg-gray-800 p-4 rounded-xl">
            <img src={c.image} alt={c.name} className="rounded-lg mb-2" />
            <h2 className="text-lg font-semibold">{c.name}</h2>
            <p className="text-sm text-gray-400">{c.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
