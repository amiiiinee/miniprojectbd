import { useQuery } from '@tanstack/react-query';
import { getSalles } from '../api/salles';

export default function Salles() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['salles'],
    queryFn: getSalles,
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-gray-800">Salles</h1>
      
      {isLoading && <p className="text-gray-600">Chargement des salles...</p>}
      {error && <p className="text-red-500 bg-red-50 p-4 rounded-md shadow-sm border border-red-200">Erreur: {error.message}</p>}
      
      {data && (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs sm:text-sm font-semibold text-gray-700">
                <th className="p-4 whitespace-nowrap">Nom de la salle</th>
                <th className="p-4 text-center whitespace-nowrap">Capacité</th>
                <th className="p-4 whitespace-nowrap">Type</th>
                <th className="p-4 w-1/3 whitespace-nowrap">Équipements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((salle) => (
                <tr key={salle.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-gray-900 whitespace-nowrap text-sm sm:text-base">{salle.nom}</td>
                  <td className="p-4 text-center text-gray-700 whitespace-nowrap text-sm sm:text-base">{salle.capacite} places</td>
                  <td className="p-4 whitespace-nowrap">
                     <span className="capitalize px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-[10px] sm:text-sm">
                       {salle.type?.replace('_', ' ')}
                     </span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm sm:text-base min-w-[200px]">{salle.equipements}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="p-8 text-center text-gray-500">Aucune salle trouvée.</div>
          )}
        </div>
      )}
    </div>
  );
}
