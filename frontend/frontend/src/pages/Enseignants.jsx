import { useQuery } from '@tanstack/react-query';
import { getEnseignants } from '../api/enseignants';

export default function Enseignants() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['enseignants'],
    queryFn: getEnseignants,
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-gray-800">Enseignants</h1>
      
      {isLoading && <p className="text-gray-600">Chargement des enseignants...</p>}
      {error && <p className="text-red-500 bg-red-50 p-4 rounded-md shadow-sm border border-red-200">Erreur: {error.message}</p>}
      
      {data && (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs sm:text-sm font-semibold text-gray-700">
                <th className="p-4 whitespace-nowrap">Matricule</th>
                <th className="p-4 whitespace-nowrap">Nom & Prénom</th>
                <th className="p-4 whitespace-nowrap">Email</th>
                <th className="p-4 whitespace-nowrap">Spécialité</th>
                <th className="p-4 whitespace-nowrap">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((ens) => (
                <tr key={ens.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap text-sm sm:text-base">{ens.matricule}</td>
                  <td className="p-4 text-gray-700 whitespace-nowrap text-sm sm:text-base">{ens.nom} {ens.prenom}</td>
                  <td className="p-4 text-blue-600 hover:text-blue-800 whitespace-nowrap text-sm sm:text-base">
                    <a href={`mailto:${ens.email}`}>{ens.email}</a>
                  </td>
                  <td className="p-4 text-gray-700 text-sm sm:text-base">{ens.specialite}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${ens.statut?.toLowerCase() === 'permanent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {ens.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="p-8 text-center text-gray-500">Aucun enseignant trouvé.</div>
          )}
        </div>
      )}
    </div>
  );
}
