import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Planning from './pages/Planning';
import Modules from './pages/Modules';
import Enseignants from './pages/Enseignants';
import Salles from './pages/Salles';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const NavLinks = () => (
    <ul className="space-y-2 md:space-y-4">
      <li>
        <Link 
          to="/" 
          onClick={() => setIsSidebarOpen(false)}
          className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
        >
          Planning
        </Link>
      </li>
      <li>
        <Link 
          to="/modules" 
          onClick={() => setIsSidebarOpen(false)}
          className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
        >
          Modules
        </Link>
      </li>
      <li>
        <Link 
          to="/enseignants" 
          onClick={() => setIsSidebarOpen(false)}
          className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
        >
          Enseignants
        </Link>
      </li>
      <li>
        <Link 
          to="/salles" 
          onClick={() => setIsSidebarOpen(false)}
          className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
        >
          Salles
        </Link>
      </li>
    </ul>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm border-b px-4 py-3 flex justify-between items-center sticky top-0 z-40">
          <h2 className="text-xl font-bold text-gray-800">Scolarité</h2>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </header>

        {/* Sidebar Overlay (Mobile) */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl md:shadow-lg p-6 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 hidden md:block">Scolarité</h2>
            <div className="flex-1">
              <NavLinks />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Planning />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/enseignants" element={<Enseignants />} />
            <Route path="/salles" element={<Salles />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
