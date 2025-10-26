// SSR + SSG con revalidación diaria
export const revalidate = 86400; // 1 día (SSG con revalidación)

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
}

async function getCharacters(): Promise<Character[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    next: { revalidate: 86400 }, // Forzar cache (SSG + ISR)
  });

  const data = await res.json();
  return data.results;
}

export default async function RickAndMortyPage() {
  const characters = await getCharacters();

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold mb-8 text-green-400">Rick and Morty</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {characters.map((c) => (
          <a
            key={c.id}
            href={`/rickandmorty/${c.id}`}
            className="bg-gray-800 rounded-xl p-4 hover:scale-105 transition"
          >
            <img
              src={c.image}
              alt={c.name}
              loading="lazy" // Lazy Loading
              className="rounded-lg mb-2"
            />
            <h2 className="text-lg font-semibold">{c.name}</h2>
            <p className="text-sm text-gray-400">{c.status}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
