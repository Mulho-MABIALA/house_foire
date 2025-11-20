import { useNavigate } from "react-router-dom";

export function ResultPage({ currentUser, giftTarget, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center relative overflow-hidden p-4">
      {/* Flocons animés */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none text-3xl"
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animation: `float ${Math.random() * 20 + 15}s ease-in-out infinite`,
            animationDelay: Math.random() * 5 + "s",
            opacity: 0.3,
          }}
        >
          ❄️
        </div>
      ))}

      {/* Contenu principal */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* En-tête */}
        <div className="mb-10">
          <h1 className="text-6xl font-black text-white mb-3 tracking-wider" style={{
            textShadow: "0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(16, 185, 129, 0.4)",
            animation: "pulse 2s ease-in-out infinite",
          }}>
            🎁 Votre Cadeau 🎁
          </h1>
          <p className="text-xl text-emerald-200 font-light">
            Bonjour <span className="font-bold text-emerald-300">{currentUser}</span> !
          </p>
        </div>

        {/* Résultat */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border-2 border-emerald-400/50 shadow-2xl mb-8 transform hover:scale-105 transition duration-300">
          <p className="text-emerald-200 text-xl mb-8 font-light">
            Vous devez offrir un cadeau à :
          </p>

          <div className="mb-8">
            <div className="inline-block">
              <div className="relative">
                {/* Boîte cadeau */}
                <div className="text-8xl mb-6 animate-bounce" style={{
                  textShadow: "0 0 40px rgba(34, 197, 94, 0.8)",
                }}>
                  🎀
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-5xl font-black text-white mb-2 tracking-wider" style={{
            background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))",
          }}>
            {giftTarget}
          </h2>

          <p className="text-emerald-100 text-lg mt-8 font-semibold">
            🎄 Préparez le meilleur cadeau ! 🎄
          </p>
        </div>

        {/* Message inspirant */}
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/20 mb-8">
          <p className="text-white/80 text-center text-sm leading-relaxed">
            ✨ Ce tirage au sort secret est une occasion parfaite de faire plaisir à quelqu'un. <br/>
            Gardez le secret et surprenez <span className="font-bold text-emerald-300">{giftTarget}</span> avec un magnifique cadeau ! 🎁
          </p>
        </div>

        {/* Bouton de déconnexion */}
        <button
          onClick={handleLogout}
          className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-lg text-lg"
        >
          🚪 Déconnexion
        </button>

        {/* Instructions finales */}
        <p className="text-white/50 text-xs mt-8 italic">
          Une fois déconnecté, personne d'autre ne pourra voir ce résultat depuis cet appareil
        </p>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-50px) translateX(20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            text-shadow: 0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(16, 185, 129, 0.4);
            transform: scale(1);
          }
          50% {
            text-shadow: 0 0 40px rgba(34, 197, 94, 1), 0 0 80px rgba(16, 185, 129, 0.6);
            transform: scale(1.03);
          }
        }
      `}</style>
    </div>
  );
}
