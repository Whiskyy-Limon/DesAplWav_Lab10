export async function generateStaticParams() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  return data.results.map((c: any) => ({
    id: c.id.toString(),
  }));
}

export const revalidate = 864000; // 10 días

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
}

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 },
  });
  if (!res.ok) throw new Error("Personaje no encontrado");
  return res.json();
}

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // 👈 aquí esperas la promesa correctamente
  const c = await getCharacter(id);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <img src={c.image} alt={c.name} className="rounded-2xl w-60 mb-6" />
      <h1 className="text-4xl font-bold text-green-400 mb-4">{c.name}</h1>
      <p>Status: {c.status}</p>
      <p>Especie: {c.species}</p>
      <p>Tipo: {c.type || "N/A"}</p>
      <p>Género: {c.gender}</p>
      <p>Origen: {c.origin.name}</p>
      <p>Ubicación: {c.location.name}</p>

      <a href="/rickandmorty" className="mt-6 text-green-300 underline hover:text-green-500">
        ← Volver
      </a>
    </div>
  );
}
