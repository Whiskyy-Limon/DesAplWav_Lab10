import Image from "next/image";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

// 🔹 Función para obtener los datos del Pokémon desde la API
async function getPokemon(name: string): Promise<Pokemon> {
  console.log("🧠 Buscando Pokémon:", name);

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`, {
    cache: "no-store",
  });

  console.log("📡 URL:", res.url, "Status:", res.status);

  if (!res.ok) throw new Error("Pokémon no encontrado");

  return res.json();
}

// 🔹 En Next.js 16 los params son una Promise, así que usamos `await params`
export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params; // ✅ obtenemos el valor real
  let pokemon: Pokemon | null = null;

  try {
    pokemon = await getPokemon(name);
  } catch (error) {
    console.error("❌ Error:", error);
  }

  // 🔹 Si no se encuentra el Pokémon
  if (!pokemon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-400 text-center">
        <h1 className="text-3xl font-bold mb-4">⚠️ Pokémon no encontrado</h1>
        <p className="text-gray-400 mb-8">
          Verifica el nombre en la URL o vuelve a la Pokédex.
        </p>
        <a
          href="/pokemon"
          className="text-purple-300 hover:text-purple-500 underline"
        >
          ← Volver a la Pokédex
        </a>
      </div>
    );
  }

  // 🔹 Si sí existe el Pokémon
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-8">
      <h1 className="text-5xl font-bold mb-6 capitalize text-purple-400 drop-shadow-lg">
        {pokemon.name}
      </h1>

      <Image
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
        width={200}
        height={200}
        className="mb-6"
      />

      <p className="text-xl text-gray-300 mb-2">
        ID: #{pokemon.id.toString().padStart(3, "0")}
      </p>

      <div className="flex gap-3 mt-4">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="bg-purple-700 bg-opacity-40 px-4 py-2 rounded-lg text-sm capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>

      <a
        href="/pokemon"
        className="mt-10 text-purple-300 hover:text-purple-500 underline"
      >
        ← Volver a la Pokédex
      </a>
    </div>
  );
}
