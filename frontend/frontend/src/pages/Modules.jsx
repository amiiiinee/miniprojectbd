import { useQuery } from '@tanstack/react-query';
import { getModules } from '../api/modules';

export default function Modules() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['modules'],
    queryFn: getModules,
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-gray-800">Modules</h1>
      
      {isLoading && <p className="text-gray-600">Chargement des modules...</p>}
      {error && <p className="text-red-500 bg-red-50 p-4 rounded-md shadow-sm border border-red-200">Erreur: {error.message}</p>}
      
      {data && (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs sm:text-sm font-semibold text-gray-700">
                <th className="p-4 whitespace-nowrap">Code</th>
                <th className="p-4 whitespace-nowrap">Intitulé</th>
                <th className="p-4 whitespace-nowrap">Coefficient</th>
                <th className="p-4 text-center whitespace-nowrap">CM (h)</th>
                <th className="p-4 text-center whitespace-nowrap">TD (h)</th>
                <th className="p-4 text-center whitespace-nowrap">TP (h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((module) => (
                <tr key={module.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap text-sm sm:text-base">{module.code}</td>
                  <td className="p-4 text-gray-700 min-w-[200px] text-sm sm:text-base">{module.intitule}</td>
                  <td className="p-4 text-gray-700 text-sm sm:text-base">{module.coefficient}</td>
                  <td className="p-4 text-center text-gray-700 text-sm sm:text-base">{module.volume_cm}</td>
                  <td className="p-4 text-center text-gray-700 text-sm sm:text-base">{module.volume_td}</td>
                  <td className="p-4 text-center text-gray-700 text-sm sm:text-base">{module.volume_tp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="p-8 text-center text-gray-500">Aucun module trouvé.</div>
          )}
        </div>
      )}
    </div>
  );
}
