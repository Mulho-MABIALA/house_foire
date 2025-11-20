import { useState } from "react";

export function HomePage({ participants, onPerformDraw }) {
  const [isDrawing, setIsDrawing] = useState(false);

  const handleLaunchDraw = () => {
    setIsDrawing(true);

    // Simulation du tirage avec animation
    setTimeout(() => {
      if (
        window.confirm(
          "⚠️ Attention! Le tirage au sort va être lancé.\nCette action est IRRÉVERSIBLE.\n\nÊtes-vous sûr de continuer ?"
        )
      ) {
        localStorage.setItem("secret_santa_draw_locked", "true");
        onPerformDraw();
        // React gère automatiquement l'affichage de la page de connexion
      } else {
        setIsDrawing(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black py-8 px-4 relative overflow-hidden">
      {/* Orbes subtils en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-3 tracking-tight">
            Foire House
          </h1>
          <p className="text-white/60 text-lg font-light tracking-wide">
            Tirage au Sort Secret
          </p>
        </div>

        {/* Boîte principale */}
        <div className="backdrop-blur-xl bg-white/5 rounded-xl p-10 mb-8 border border-white/10">
          {/* Liste des participants */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                👥 Participants
              </h2>
              <p className="text-white/60 text-sm">
                {participants.length} personnes vont participer au tirage
              </p>
            </div>

            {/* Grille des participants */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {participants.map((participant, index) => {
                const colors = [
                  'from-rose-500 to-pink-400',
                  'from-amber-500 to-orange-400',
                  'from-lime-500 to-green-400',
                  'from-cyan-500 to-blue-400',
                  'from-violet-500 to-purple-400',
                  'from-fuchsia-500 to-pink-400',
                  'from-orange-500 to-yellow-400',
                  'from-red-500 to-orange-400',
                  'from-indigo-500 to-purple-400',
                ];
                const color = colors[index % colors.length];

                return (
                  <div
                    key={participant}
                    className={`bg-gradient-to-br ${color} rounded-lg p-6 text-center transform transition-all hover:scale-105`}
                  >
                    <div className="text-4xl font-bold text-white mb-2">
                      {participant.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-white font-semibold text-sm">
                      {participant}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Zone du bouton tirage */}
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-block text-6xl mb-4" style={{
                animation: "bounce 1.5s ease-in-out infinite"
              }}>
                🎁
              </div>
            </div>

            <button
              onClick={handleLaunchDraw}
              disabled={participants.length < 2 || isDrawing}
              className={`relative px-10 py-4 rounded-lg transition-all transform font-bold text-lg ${
                participants.length < 2 || isDrawing
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white hover:scale-105 active:scale-95 shadow-lg"
              }`}
            >
              {isDrawing ? "⏳ Tirage en cours..." : "🎲 Lancer le tirage"}
            </button>

            {participants.length < 2 && (
              <p className="text-white/60 text-sm mt-4">
                Au moins 2 participants sont nécessaires
              </p>
            )}
          </div>
        </div>

        {/* Info footer */}
        <div className="text-center">
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Foire House — Tirage au Sort Secret
          </p>
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
        }
      `}</style>
    </div>
  );
}
