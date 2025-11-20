import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEED_PARTICIPANTS } from "../utils/seedData";

export function HomePage({ participants, onAddParticipant, onAddMultiple }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleAddParticipant = () => {
    setError("");
    if (!inputValue.trim()) {
      setError("Le nom ne peut pas être vide");
      return;
    }

    if (onAddParticipant(inputValue)) {
      setInputValue("");
    } else {
      setError(
        "Ce nom existe déjà ou ne peut pas être ajouté. Veuillez vérifier."
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddParticipant();
    }
  };

  const handleLoadAllParticipants = () => {
    if (participants.length > 0) {
      if (
        !window.confirm(
          "Cela va remplacer la liste actuelle des participants. Êtes-vous sûr ?"
        )
      ) {
        return;
      }
    }
    const added = onAddMultiple(SEED_PARTICIPANTS);
    setError("");
    if (added > 0) {
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-green-600 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* En-tête festif */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">
            🎄 Secret Santa 🎄
          </h1>
          <p className="text-xl text-red-50">Tirage au Sort Secret pour Noël</p>
        </div>

        {/* Boîte principale */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ajouter les participants
            </h2>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Entrez le nom du participant..."
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                />
                <button
                  onClick={handleAddParticipant}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition shadow-md"
                >
                  Ajouter
                </button>
              </div>

              <button
                onClick={handleLoadAllParticipants}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition shadow-md"
              >
                ⭐ Charger tous les participants
              </button>
            </div>
            {error && <p className="text-red-500 font-semibold">{error}</p>}
          </div>

          {/* Liste des participants */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Participants ({participants.length})
            </h3>
            {participants.length === 0 ? (
              <p className="text-gray-500 italic">
                Aucun participant pour le moment...
              </p>
            ) : (
              <ul className="space-y-2">
                {participants.map((participant) => (
                  <li
                    key={participant}
                    className="flex items-center justify-between bg-gradient-to-r from-green-50 to-red-50 p-3 rounded-lg border-l-4 border-green-500"
                  >
                    <span className="text-lg font-semibold text-gray-800">
                      🎁 {participant}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Boutons de navigation */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate("/admin")}
              disabled={participants.length === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 transition shadow-md"
            >
              🔧 Gérer les participants
            </button>
            <button
              onClick={() => navigate("/draw")}
              disabled={participants.length < 2}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 transition shadow-md"
            >
              🎲 Lancer le tirage
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white bg-opacity-90 rounded-lg p-4 text-center">
          <p className="text-gray-700">
            {participants.length === 0
              ? "Commencez par ajouter les participants..."
              : participants.length === 1
                ? "Ajoutez au moins 2 participants pour faire le tirage"
                : `Prêt ! ${participants.length} participants enregistrés`}
          </p>
        </div>
      </div>
    </div>
  );
}
