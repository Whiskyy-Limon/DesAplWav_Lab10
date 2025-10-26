import Link from "next/link";
import { PokemonListResponse, SimplePokemon } from "@/types/pokemon";
import { IoMdList } from "react-icons/io";
import Image from "next/image";

async function getPokemons(): Promise<SimplePokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    next: { revalidate: 86400 }, // 24 horas
  });

  if (!res.ok) throw new Error("Error al cargar pokémon");

  const data: PokemonListResponse = await res.json();

  return data.results.map((pokemon, index) => ({
    name: pokemon.name,
    id: index + 1,
  }));
}

export default async function PokemonList() {
  const pokemons = await getPokemons();

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-left mb-12 drop-shadow-lg flex items-center gap-2">
          <IoMdList size={40} className="inline-block text-purple-400" /> 
          Lista de Pokémons (ISR)
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemons.map((pokemon) => (
            <Link
              key={pokemon.name}
              href={`/pokemon/${pokemon.name}`}
              className="transform transition hover:scale-105"
            >
              <div className="bg-white bg-opacity-10 text-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:bg-opacity-20 cursor-pointer text-center">
                <Image
                  width={120}
                  height={120}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                  alt={pokemon.name}
                  className="w-28 h-28 mx-auto mb-4"
                  priority={false}
                />
                <h2 className="text-xl font-bold capitalize">
                  {pokemon.name}
                </h2>
                <p className="text-gray-300 text-sm">
                  #{pokemon.id.toString().padStart(3, "0")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
