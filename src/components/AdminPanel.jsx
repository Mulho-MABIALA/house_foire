import { useNavigate } from "react-router-dom";

export function AdminPanel({ participants, onRemoveParticipant }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-purple-600 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🔧 Gestion des Participants
          </h1>
          <p className="text-blue-50">Modifiez la liste des participants avant le tirage</p>
        </div>

        {/* Boîte principale */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Liste des participants */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Participants ({participants.length})
          </h2>

          {participants.length === 0 ? (
            <p className="text-gray-500 italic py-8 text-center">
              Aucun participant pour le moment...
            </p>
          ) : (
            <div className="space-y-3 mb-8">
              {participants.map((participant) => (
                <div
                  key={participant}
                  className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    👤 {participant}
                  </span>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Êtes-vous sûr de vouloir supprimer ${participant} ?`
                        )
                      ) {
                        onRemoveParticipant(participant);
                      }
                    }}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition"
                  >
                    ✕ Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Info */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-8">
            <p className="text-gray-700 font-semibold">
              💡 Vous pouvez ajouter ou supprimer des participants à tout moment
              avant le tirage.
            </p>
          </div>

          {/* Boutons de navigation */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold rounded-lg hover:from-gray-500 hover:to-gray-600 transition shadow-md"
            >
              ← Retour
            </button>
            <button
              onClick={() => navigate("/draw")}
              disabled={participants.length < 2}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 transition shadow-md"
            >
              🎲 Aller au tirage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
