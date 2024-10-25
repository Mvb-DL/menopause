export default function Dashboard() {
  return (
    <div className="min-h-screen  p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Box 1 */}
        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center relative">
          <h2 className="text-2xl font-semibold mb-2">Benutzer</h2>
          <p className="text-4xl font-bold text-blue-500">1,234</p>
          <p className="text-gray-500 mt-2">Aktive Benutzer in dieser Woche</p>
          <button className="absolute bottom-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Details
          </button>
        </div>

        {/* Box 2 */}
        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center relative">
          <h2 className="text-2xl font-semibold mb-2">Umsatz</h2>
          <p className="text-4xl font-bold text-green-500">$ 12,345</p>
          <p className="text-gray-500 mt-2">Umsatz im letzten Monat</p>
          <button className="absolute bottom-4 left-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Details
          </button>
        </div>

        {/* Box 3 */}
        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center relative">
          <h2 className="text-2xl font-semibold mb-2">Neuanmeldungen</h2>
          <p className="text-4xl font-bold text-purple-500">345</p>
          <p className="text-gray-500 mt-2">Neuanmeldungen im letzten Monat</p>
          <button className="absolute bottom-4 left-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Details
          </button>
        </div>

        {/* Box 4 */}
        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center relative">
          <h2 className="text-2xl font-semibold mb-2">Support Tickets</h2>
          <p className="text-4xl font-bold text-red-500">45</p>
          <p className="text-gray-500 mt-2">Offene Tickets aktuell</p>
          <button className="absolute bottom-4 left-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
