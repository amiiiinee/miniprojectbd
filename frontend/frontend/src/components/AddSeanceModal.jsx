import React, { useState, useEffect } from 'react';
import { createSeance } from '../api/seances';
import { getModules } from '../api/modules';
import { getEnseignants } from '../api/enseignants';
import { getGroupes } from '../api/groupes';
import { getSalles } from '../api/salles';

export default function AddSeanceModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    id_module: '',
    id_enseignant: '',
    id_groupe: '',
    id_salle: '',
    jour: 'Lundi',
    heure_debut: '08:00',
    heure_fin: '10:00',
    type_seance: 'CM'
  });

  const [options, setOptions] = useState({
    modules: [],
    enseignants: [],
    groupes: [],
    salles: []
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [m, e, g, s] = await Promise.all([
          getModules(),
          getEnseignants(),
          getGroupes(),
          getSalles()
        ]);
        console.log('groupes data:', g.data);
        setOptions({ modules: m, enseignants: e, groupes: g, salles: s });
      } catch (err) {
        console.error("Failed to fetch options", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        id_module: parseInt(formData.id_module),
        id_enseignant: parseInt(formData.id_enseignant),
        id_groupe: parseInt(formData.id_groupe),
        id_salle: parseInt(formData.id_salle),
      };

      await createSeance(payload);
      onSuccess();
      onClose();
    } catch (err) {
      if (err.response) {
        setError(err.response.data.detail || "Une erreur est survenue sur le serveur.");
      } else {
        setError("Erreur réseau: Impossible de contacter le serveur. Vérifiez que le backend est lancé.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 text-white rounded-lg shadow-xl w-full mx-4 sm:max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Ajouter une séance</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-300 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Module</label>
                <select 
                  name="id_module" 
                  value={formData.id_module} 
                  onChange={handleChange} 
                  required 
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un module</option>
                  {options.modules.map(opt => <option key={opt.id} value={opt.id}>{opt.intitule}</option>)}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Enseignant</label>
                <select 
                  name="id_enseignant" 
                  value={formData.id_enseignant} 
                  onChange={handleChange} 
                  required 
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un enseignant</option>
                  {options.enseignants.map(opt => <option key={opt.id} value={opt.id}>{opt.nom} {opt.prenom}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Groupe</label>
                <select 
                  name="id_groupe" 
                  value={formData.id_groupe} 
                  onChange={handleChange} 
                  required 
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner</option>
                  {options.groupes.map(g => (
                    <option key={g.id} value={g.id}>
                      {g.nom || g.libelle || g.name || g.intitule || `Groupe ${g.id}`}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Salle</label>
                <select 
                  name="id_salle" 
                  value={formData.id_salle} 
                  onChange={handleChange} 
                  required 
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner</option>
                  {options.salles.map(opt => <option key={opt.id} value={opt.id}>{opt.nom}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Jour</label>
                <select 
                  name="jour" 
                  value={formData.jour} 
                  onChange={handleChange} 
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                <select 
                  name="type_seance" 
                  value={formData.type_seance} 
                  onChange={handleChange} 
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CM">CM</option>
                  <option value="TD">TD</option>
                  <option value="TP">TP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Début</label>
                <input 
                  type="time" 
                  name="heure_debut" 
                  value={formData.heure_debut} 
                  onChange={handleChange} 
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Fin</label>
                <input 
                  type="time" 
                  name="heure_fin" 
                  value={formData.heure_fin} 
                  onChange={handleChange} 
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button 
                type="button" 
                onClick={onClose} 
                className="w-full sm:flex-1 px-4 py-2.5 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 focus:outline-none transition-colors text-sm font-medium"
              >
                Annuler
              </button>
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full sm:flex-1 px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-blue-300 transition-colors text-sm font-bold"
              >
                {loading ? 'Ajout en cours...' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
