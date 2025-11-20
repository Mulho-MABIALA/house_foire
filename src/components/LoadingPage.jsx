import { useEffect, useState } from "react";

export function LoadingPage({ onLoadingComplete, backgroundImage }) {
  const [progress, setProgress] = useState(0);
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    // Générer des orbes flottants sophistiqués
    const generatedOrbs = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      size: 40 + Math.random() * 60,
    }));
    setOrbs(generatedOrbs);
  }, []);

  // Animation de progression
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 25;
      });
    }, 300);

    return () => clearInterval(progressInterval);
  }, []);

  // Gestion du clavier (Espace pour continuer)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        onLoadingComplete();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onLoadingComplete]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: backgroundImage
          ? `linear-gradient(135deg, rgba(15, 15, 35, 0.85) 0%, rgba(25, 25, 50, 0.85) 100%), url(${backgroundImage})`
          : "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d0d2a 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Orbes flottants sophistiqués */}
      {orbs.map((orb) => (
        <div
          key={`orb-${orb.id}`}
          className="absolute rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `linear-gradient(135deg, rgba(255, 140, 0, 0.6), rgba(255, 69, 0, 0.3))`,
            animation: `drift 20s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
            filter: "blur(40px)",
          }}
        />
      ))}

      {/* Grille légère de fond */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(255, 140, 0, 0.1) 25%, rgba(255, 140, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 140, 0, 0.1) 75%, rgba(255, 140, 0, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 140, 0, 0.1) 25%, rgba(255, 140, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 140, 0, 0.1) 75%, rgba(255, 140, 0, 0.1) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Contenu principal */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">

        {/* Titre minimaliste */}
        <div className="mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="text-xs uppercase tracking-widest text-orange-400">Initialisation</p>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-3 tracking-tight">
            Foire House
          </h1>
          <p className="text-white/60 text-lg font-light tracking-wide">
            Tirage au sort sécurisé
          </p>
        </div>

        {/* Barre de progression ultra minimaliste */}
        <div className="mb-16 max-w-xs mx-auto">
          <div className="relative h-1 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 30px rgba(255, 140, 0, 0.8)",
              }}
            />
          </div>
          <p className="text-white/50 text-xs mt-4 font-mono">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Status dots */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
          <p className="text-white/60 text-sm font-light tracking-widest">Préparation en cours</p>
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
        </div>

        {/* Instructions */}
        <p className="text-white/40 text-xs uppercase tracking-widest mt-16">
          Appuyez sur <span className="text-orange-400 font-semibold">ESPACE</span> pour continuer
        </p>
      </div>

      {/* Dégradé subtle en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Animations CSS */}
      <style>{`
        @keyframes drift {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(30px, -30px);
          }
          50% {
            transform: translate(0, 60px);
          }
          75% {
            transform: translate(-30px, -20px);
          }
        }
      `}</style>
    </div>
  );
}
