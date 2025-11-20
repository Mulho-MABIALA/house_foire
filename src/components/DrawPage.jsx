import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function DrawPage({
  participants,
  draws,
  hasDrawn,
  onPerformDraw,
  onResetDraw,
  currentUser = null,
  onLogout = null,
  isUserLoggedIn = false,
}) {
  const navigate = useNavigate();
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [drawLocked, setDrawLocked] = useState(() => {
    return localStorage.getItem("secret_santa_draw_locked") === "true";
  });

  const confettiStyle = `
    @keyframes fall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }

    @keyframes explosion {
      0% {
        transform: translate(0, 0) scale(1) rotate(0deg);
        opacity: 1;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-30px);
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg) scale(1);
      }
      50% {
        transform: rotate(180deg) scale(1.2);
      }
      100% {
        transform: rotate(360deg) scale(0.5);
      }
    }

    @keyframes wobble {
      0%, 100% {
        transform: translateX(0) rotate(0deg);
      }
      25% {
        transform: translateX(30px) rotate(15deg);
      }
      50% {
        transform: translateX(0) rotate(0deg);
      }
      75% {
        transform: translateX(-30px) rotate(-15deg);
      }
    }

    @keyframes pulse-scale {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
    }

    @keyframes rainbow-glow {
      0% {
        filter: drop-shadow(0 0 10px #ff0000) drop-shadow(0 0 5px #ff7700);
      }
      25% {
        filter: drop-shadow(0 0 10px #ffff00) drop-shadow(0 0 5px #ff00ff);
      }
      50% {
        filter: drop-shadow(0 0 10px #00ff00) drop-shadow(0 0 5px #00ffff);
      }
      75% {
        filter: drop-shadow(0 0 10px #0000ff) drop-shadow(0 0 5px #ff00ff);
      }
      100% {
        filter: drop-shadow(0 0 10px #ff0000) drop-shadow(0 0 5px #ff7700);
      }
    }

    @keyframes spiral {
      0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(var(--tx), var(--ty)) rotate(720deg) scale(0);
        opacity: 0;
      }
    }

    @keyframes shake-burst {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.3);
      }
    }

    @keyframes starburst {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(var(--tx), var(--ty)) scale(0);
        opacity: 0;
      }
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }

    @keyframes glow-pulse {
      0%, 100% {
        box-shadow: 0 0 20px rgba(255, 140, 0, 0.5), inset 0 0 20px rgba(255, 140, 0, 0.2);
      }
      50% {
        box-shadow: 0 0 40px rgba(255, 140, 0, 0.8), inset 0 0 30px rgba(255, 140, 0, 0.4);
      }
    }

    @keyframes result-scale {
      0% {
        transform: scale(0.95);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `;

  const handlePerformDraw = () => {
    if (
      window.confirm(
        "Attention ! Le tirage au sort secret va être lancé.\nCette action ne peut pas être annulée.\n\nÊtes-vous sûr ?"
      )
    ) {
      // Sauvegarder un flag pour bloquer les futurs tirages
      localStorage.setItem("secret_santa_draw_locked", "true");
      onPerformDraw();
      setShowResult(false);
      setSelectedParticipant(null);
      // Recharger la page pour appliquer le verrouillage
      window.location.reload();
    }
  };

  const handleRevealResult = (participant) => {
    // Si l'utilisateur est connecté, il ne peut cliquer que sur son propre nom
    if (isUserLoggedIn && participant.toLowerCase() !== currentUser.toLowerCase()) {
      return;
    }
    setSelectedParticipant(participant);
    setShowResult(true);
  };

  const getResultForParticipant = (participantName) => {
    if (!draws) return null;
    const draw = draws.find((d) => d.from === participantName);
    return draw ? draw.to : null;
  };

  const handleLogout = () => {
    setSelectedParticipant(null);
    setShowResult(false);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black py-8 px-4 relative overflow-hidden">
      {/* Orbes subtils en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Confettis FESTIFS - Explosion totale */}
      {showResult && selectedParticipant && (
        <>
          {/* Particules colorées - 60 carrés */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i / 60) * 360;
            const distance = 120 + Math.random() * 250;
            const tx = Math.cos((angle * Math.PI) / 180) * distance;
            const ty = Math.sin((angle * Math.PI) / 180) * distance;
            const duration = 2 + Math.random() * 1.5;
            const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF00FF', '#FF8C00'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            return (
              <div
                key={`particle-${i}`}
                className="fixed pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "10px",
                  height: "10px",
                  background: color,
                  borderRadius: "2px",
                  animation: `starburst ${duration}s ease-out forwards`,
                  animationDelay: `${Math.random() * 0.3}s`,
                  "--tx": `${tx}px`,
                  "--ty": `${ty}px`,
                  boxShadow: `0 0 15px ${color}`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            );
          })}

          {/* Anneaux pulsants */}
          <div
            className="fixed pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "3px solid #FF6B6B",
              animation: `pulse-scale 0.6s ease-out`,
              boxShadow: "0 0 40px #FF6B6B",
            }}
          />
          <div
            className="fixed pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "2px solid #FFD93D",
              animation: `pulse-scale 0.8s ease-out`,
              boxShadow: "0 0 30px #FFD93D",
            }}
          />
          <div
            className="fixed pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              border: "1px solid #6BCB77",
              animation: `pulse-scale 1s ease-out`,
              boxShadow: "0 0 20px #6BCB77",
            }}
          />
        </>
      )}

      <div className="max-w-3xl mx-auto relative z-10">
        {/* En-tête */}
        <div className="text-center mb-8 lg:mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
            Maison de Foire
          </h1>
          <p className="text-white/60 text-xs sm:text-sm">Tirage au Sort Secret</p>

          {isUserLoggedIn && (
            <div className="mt-4 lg:mt-6 inline-block rounded-lg bg-gradient-to-r from-orange-600/30 to-red-600/30 border border-orange-500/40 px-4 lg:px-6 py-2 lg:py-3 backdrop-blur-sm">
              <p className="text-white/90 text-xs lg:text-sm">
                Connecté : <span className="text-orange-300 font-bold">{currentUser}</span>
              </p>
              <button
                onClick={handleLogout}
                className="mt-2 px-2 lg:px-3 py-1 lg:py-1.5 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white font-light rounded text-xs uppercase transition"
              >
                Déconnecter
              </button>
            </div>
          )}
        </div>

        {/* Boîte principale */}
        <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 lg:p-8 mb-6 border border-white/10">
          {!hasDrawn ? (
            <>
              <div className="mb-10 text-center">
                {/* Gift Emoji */}
                <div className="mb-8">
                  <div className="inline-block text-6xl"
                    style={{
                      animation: "bounce 1.5s ease-in-out infinite"
                    }}
                  >
                    🎁
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Prêt pour le tirage ?
                </h2>

                {/* Participants Count Box - Simple */}
                <div className="mb-6 rounded-lg border border-orange-400/40 bg-black/30 backdrop-blur-sm p-6">
                  <p className="text-white text-xl font-bold mb-2">
                    🎉 {participants.length} Participants 🎉
                  </p>
                  <p className="text-white/70 text-sm">
                    Chacun découvrira qui il doit offrir
                  </p>
                </div>

                {/* Warning Box - Simple */}
                <div className="mb-8 rounded-lg border border-red-500/40 bg-red-950/30 backdrop-blur-sm p-4">
                  <p className="text-red-200 text-sm font-semibold">
                    ⚠️ Cette action est IRRÉVERSIBLE
                  </p>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={handlePerformDraw}
                  disabled={drawLocked}
                  className={`flex-1 px-6 py-3 rounded-lg transition-all transform font-bold ${
                    drawLocked
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
                      : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white hover:scale-105 active:scale-95 shadow-lg"
                  }`}
                >
                  {drawLocked ? "✓ Tirage Verrouillé" : "🎲 Lancer le tirage"}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-light rounded-lg transition border border-white/20"
                >
                  ← Retour
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-10 text-center">
                <div className="text-5xl mb-6" style={{
                  animation: "bounce 1s ease-in-out infinite"
                }}>
                  🎊
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Le Tirage est Fait !
                </h2>
                <p className="text-white/70 text-sm">
                  Clique sur ton nom pour découvrir à qui tu dois offrir un cadeau
                </p>
              </div>

              {/* Grille des participants - RESPONSIVE */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mb-6 lg:mb-8">
                {participants.map((participant, index) => {
                  const isCurrentUser = participant.toLowerCase() === currentUser?.toLowerCase();
                  const isDisabled = isUserLoggedIn && !isCurrentUser;
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
                    <button
                      key={participant}
                      onClick={() => handleRevealResult(participant)}
                      disabled={isDisabled}
                      className={`relative overflow-hidden rounded-lg lg:rounded-xl transition-all duration-300 transform shadow-lg ${
                        isDisabled
                          ? "opacity-40 cursor-not-allowed"
                          : selectedParticipant === participant
                            ? "scale-105 ring-2 ring-yellow-300"
                            : "hover:scale-105 hover:shadow-xl active:scale-95"
                      }`}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-95`}></div>

                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 opacity-0 hover:opacity-20 transition bg-gradient-to-r from-white via-transparent to-transparent rounded-lg lg:rounded-xl"/>

                      {/* Content */}
                      <div className="relative z-10 p-3 lg:p-6 text-center min-h-24 lg:h-32 flex flex-col items-center justify-center gap-1 lg:gap-2">
                        <div className="text-3xl lg:text-5xl font-black drop-shadow-lg">{participant.charAt(0).toUpperCase()}</div>
                        <div className="text-white font-bold text-xs lg:text-lg drop-shadow-md line-clamp-2 max-w-full">{participant}</div>
                        {isCurrentUser && isUserLoggedIn && (
                          <div className="text-yellow-200 text-xs font-black mt-1">✨ TOI ✨</div>
                        )}
                      </div>

                      {/* Bottom accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 lg:h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent hover:via-white/60 transition"></div>
                    </button>
                  );
                })}
              </div>

              {/* Résultat - SPECTACULAIRE & RESPONSIVE */}
              {showResult && selectedParticipant && (
                <div className="relative mb-6 lg:mb-8 overflow-hidden rounded-xl lg:rounded-2xl"
                  style={{
                    animation: "result-scale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 opacity-90"></div>

                  {/* Animated light rays */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
                    backgroundSize: "60px 60px",
                    animation: "shimmer-bg 3s linear infinite"
                  }}/>

                  <div className="absolute inset-0 border-2 lg:border-3 border-yellow-300/40 rounded-xl lg:rounded-2xl"></div>

                  {/* Content */}
                  <div className="relative z-10 backdrop-blur-sm bg-black/30 p-6 lg:p-12 text-center">
                    <div className="mb-4 lg:mb-6 inline-block px-3 lg:px-6 py-1 lg:py-2 rounded-full bg-white/10 border border-white/30">
                      <p className="text-yellow-200 text-xs uppercase tracking-widest font-black">✨ RÉSULTAT ✨</p>
                    </div>

                    <h3 className="text-2xl lg:text-5xl font-black text-white mb-4 lg:mb-10 tracking-tight drop-shadow-lg line-clamp-2">
                      {selectedParticipant}
                    </h3>

                    <div className="bg-gradient-to-b from-yellow-400 to-orange-500 rounded-xl lg:rounded-2xl p-5 lg:p-10 mb-6 lg:mb-8 transform hover:scale-105 transition shadow-2xl">
                      <p className="text-black/80 text-xs lg:text-sm mb-3 lg:mb-6 uppercase tracking-widest font-black">Doit offrir un cadeau à</p>
                      <div className="text-4xl lg:text-7xl font-black text-white drop-shadow-2xl mb-2 lg:mb-3 line-clamp-2" style={{
                        animation: "bounce-big 2s ease-in-out infinite"
                      }}>
                        {getResultForParticipant(selectedParticipant)}
                      </div>
                      <div className="inline-block px-2 lg:px-4 py-1 lg:py-2 bg-black/20 rounded-lg mt-2 lg:mt-0">
                        <p className="text-white font-black text-xs lg:text-sm">🎁 LE DESTINATAIRE 🎁</p>
                      </div>
                    </div>

                    <p className="text-white/70 text-xs uppercase tracking-widest font-bold leading-relaxed">
                      🔒 RÉSULTAT 100%<br className="lg:hidden" /> CONFIDENTIEL 🔒
                    </p>
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="text-center text-white/60 text-xs mb-8 space-y-1">
                <p>{participants.length} participants • Tirage aléatoire • Juste pour tous</p>
              </div>

              {/* Boutons */}
              {isUserLoggedIn ? (
                <div className="text-center text-white/60 text-sm py-4">
                  Vous ne pouvez voir que votre résultat
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/")}
                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-light rounded-lg transition border border-white/20"
                  >
                    Accueil
                  </button>
                  <button
                    onClick={onResetDraw}
                    className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition"
                  >
                    Nouveau Tirage
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Foire House — Tirage au Sort
          </p>
        </div>
      </div>

      {/* Styles pour les animations */}
      <style>{confettiStyle}</style>
    </div>
  );
}
