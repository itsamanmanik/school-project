import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">🏫 School Project</h1>

      <div className="flex gap-6">
        <Link href="/addSchool">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            ➕ Add School
          </button>
        </Link>

        <Link href="/showSchools">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
            📖 Show Schools
          </button>
        </Link>
      </div>
    </div>
  );
}
