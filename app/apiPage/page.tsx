import Link from "next/link";

export default function ApiPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 gap-6">
      <h1 className="text-2xl font-bold mb-8">Connect Your APIs</h1>

      {/* Button to connect to Apple Health API with link to menoPausePage */}
      <Link href="/menoPausePage">
        <button className="w-64 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
          Connect to Apple Health
        </button>
      </Link>

      {/* Button to connect to Clue API */}
      <button className="w-64 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none">
        Connect to Clue
      </button>

      {/* Sign-in button */}
      <button className="w-64 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none">
        Sign In
      </button>
    </div>
  );
}
