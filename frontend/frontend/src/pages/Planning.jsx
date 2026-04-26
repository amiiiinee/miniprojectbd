import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPlanningGroupe } from '../api/seances';
import AddSeanceModal from '../components/AddSeanceModal';

export default function Planning() {
  const [groupeId, setGroupeId] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['planning', groupeId],
    queryFn: () => getPlanningGroupe(groupeId),
    enabled: !!groupeId,
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
          Planning des Enseignements
        </h1>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center shadow-md"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Ajouter une séance
        </button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <label className="block text-sm font-semibold text-gray-600 mb-2">Filtrer par Groupe</label>
        <input
          type="number"
          placeholder="ID du groupe (ex: 1)"
          value={groupeId}
          onChange={e => setGroupeId(e.target.value)}
          className="border rounded-lg p-3 w-full sm:w-64 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Erreur: {error.message}
        </div>
      )}

      {data && data.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-bold text-gray-700 capitalize whitespace-nowrap">Jour</th>
                <th className="p-4 font-bold text-gray-700 whitespace-nowrap">Horaire</th>
                <th className="p-4 font-bold text-gray-700 whitespace-nowrap">Module</th>
                <th className="p-4 font-bold text-gray-700 whitespace-nowrap">Enseignant</th>
                <th className="p-4 font-bold text-gray-700 whitespace-nowrap">Salle</th>
                <th className="p-4 font-bold text-gray-700 whitespace-nowrap">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((s, i) => (
                <tr key={i} className="hover:bg-blue-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{s.jour}</td>
                  <td className="p-4 text-gray-600 whitespace-nowrap">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">{s.heure_debut.substring(0,5)}</span> 
                    <span className="mx-1">→</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">{s.heure_fin.substring(0,5)}</span>
                  </td>
                  <td className="p-4 text-gray-700 min-w-[150px]">{s.module}</td>
                  <td className="p-4 text-gray-700 whitespace-nowrap">{s.enseignant}</td>
                  <td className="p-4 text-gray-700 font-semibold whitespace-nowrap">{s.salle}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                      s.type_seance === 'CM' ? 'bg-purple-100 text-purple-700' :
                      s.type_seance === 'TD' ? 'bg-green-100 text-green-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {s.type_seance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : data && (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">Aucune séance trouvée pour ce groupe.</p>
        </div>
      )}

      {showModal && (
        <AddSeanceModal 
          onClose={() => setShowModal(false)} 
          onSuccess={() => {
            refetch();
          }} 
        />
      )}
    </div>
  );
}
