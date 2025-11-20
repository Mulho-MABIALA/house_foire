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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-500/30 via-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>

        {/* Grid background */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(255,69,0,.05) 25%, rgba(255,69,0,.05) 26%, transparent 27%, transparent 74%, rgba(255,69,0,.05) 75%, rgba(255,69,0,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,69,0,.05) 25%, rgba(255,69,0,.05) 26%, transparent 27%, transparent 74%, rgba(255,69,0,.05) 75%, rgba(255,69,0,.05) 76%, transparent 77%, transparent)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-16 pt-8">
          <div className="inline-block mb-4 px-6 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition">
            <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 font-bold">
              ✨ Secret Santa Edition ✨
            </p>
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-white mb-2 tracking-tighter">
            Maison de Foire
          </h1>
          <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-light tracking-wide">
            Le Grand Tirage au Sort
          </p>
        </div>

        {/* Main Container */}
        <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/0 rounded-2xl p-12 mb-8 border border-white/20 shadow-2xl">

          {/* Participants Section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-5xl font-black text-white mb-3">
                👥 Les Participants
              </h2>
              <div className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                <p className="text-white/80 text-sm font-semibold">
                  {participants.length} âmes prêtes pour l'aventure
                </p>
              </div>
            </div>

            {/* Participants Grid */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-10">
              {participants.map((participant, index) => {
                const colors = [
                  'from-rose-600 to-pink-500',
                  'from-orange-600 to-yellow-500',
                  'from-emerald-600 to-green-500',
                  'from-cyan-600 to-blue-500',
                  'from-violet-600 to-purple-500',
                  'from-fuchsia-600 to-pink-500',
                  'from-amber-600 to-orange-500',
                  'from-red-600 to-rose-500',
                  'from-indigo-600 to-purple-500',
                ];
                const color = colors[index % colors.length];

                return (
                  <div
                    key={participant}
                    className={`group relative bg-gradient-to-br ${color} rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-110 hover:shadow-2xl cursor-default overflow-hidden`}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition bg-gradient-to-r from-white via-transparent to-transparent" style={{
                      animation: "shimmer 2s infinite"
                    }}/>

                    <div className="relative z-10">
                      <div className="text-5xl font-black text-white mb-3 drop-shadow-lg">
                        {participant.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-white font-bold text-lg drop-shadow-md">
                        {participant}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative py-12 px-8 rounded-2xl bg-gradient-to-r from-orange-600/20 via-red-600/20 to-pink-600/20 border border-orange-500/30 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-50" style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,69,0,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,0,0,0.1) 0%, transparent 50%)",
              animation: "gradient-shift 6s ease-in-out infinite"
            }}/>

            <div className="relative z-10 text-center">
              <div className="mb-6 flex justify-center">
                <div className="text-7xl" style={{
                  animation: "bounce-gift 2s ease-in-out infinite"
                }}>
                  🎁
                </div>
              </div>

              <h3 className="text-3xl font-black text-white mb-2">
                Prêt pour le tirage ?
              </h3>
              <p className="text-white/70 mb-8">
                Cliquez sur le bouton pour déclencher le destin
              </p>

              <button
                onClick={handleLaunchDraw}
                disabled={participants.length < 2 || isDrawing}
                className={`relative px-12 py-4 rounded-xl transition-all transform font-bold text-lg tracking-wider overflow-hidden group ${
                  participants.length < 2 || isDrawing
                    ? "bg-gray-600/50 text-gray-400 cursor-not-allowed opacity-50"
                    : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white hover:scale-110 active:scale-95 shadow-2xl"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isDrawing ? (
                    <>
                      <span style={{animation: "spin 1s linear infinite"}}>⏳</span>
                      Tirage en cours...
                    </>
                  ) : (
                    <>
                      🎲 LANCER LE TIRAGE
                      <span style={{animation: "pulse 2s ease-in-out infinite"}}>✨</span>
                    </>
                  )}
                </span>
                {!isDrawing && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-0 group-hover:opacity-20 transition rounded-xl" style={{
                    animation: "shimmer 2s infinite"
                  }}/>
                )}
              </button>

              {participants.length < 2 && (
                <p className="text-orange-300 text-sm mt-6 font-semibold">
                  ⚠️ Au moins 2 participants sont nécessaires
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-xs uppercase tracking-widest font-light">
            © 2024 Maison de Foire • Tirage au Sort Secret • Édition Exclusive
          </p>
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes bounce-gift {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-40px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}
