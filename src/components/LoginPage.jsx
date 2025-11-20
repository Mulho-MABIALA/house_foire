import { useState } from "react";
import { PARTICIPANT_PASSWORDS } from "../utils/seedData";

export function LoginPage({ participants, onLogin, hasDrawn }) {
  const [selectedName, setSelectedName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showParticipantPasswords, setShowParticipantPasswords] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedName) {
      setError("Veuillez sélectionner votre nom");
      return;
    }

    if (!password) {
      setError("Veuillez entrer votre mot de passe");
      return;
    }

    if (!onLogin(selectedName, password)) {
      setError("Nom ou mot de passe incorrect");
      setPassword("");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-500/30 via-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-md">
        {/* En-tête Premium */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 px-6 py-2 rounded-full backdrop-blur-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/40">
            <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-bold">
              🔐 Authentification Sécurisée
            </p>
          </div>
          <h1 className="text-6xl font-black text-white mb-3 tracking-tighter">
            Maison de Foire
          </h1>
          <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-light">
            {hasDrawn ? "Découvrez votre destinataire" : "En attente du tirage..."}
          </p>
        </div>

        {/* Formulaire de connexion */}
        <form onSubmit={handleLogin} className="backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/0 rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Message d'attente si pas de tirage */}
          {!hasDrawn && (
            <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <p className="text-orange-300 text-sm text-center font-light">
                En attente du tirage au sort...
              </p>
            </div>
          )}

          {/* Sélection du nom */}
          <div className="mb-6">
            <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wider">
              👤 Votre Nom
            </label>
            <select
              value={selectedName}
              onChange={(e) => {
                setSelectedName(e.target.value);
                setError("");
              }}
              disabled={!hasDrawn}
              className="w-full px-4 py-3 bg-gradient-to-br from-white/10 to-white/5 text-white border border-white/30 rounded-lg font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <option value="" className="bg-gray-900">👉 Choisissez votre nom...</option>
              {participants.map((participant) => (
                <option key={participant} value={participant} className="bg-gray-900 text-white">
                  {participant}
                </option>
              ))}
            </select>
          </div>

          {/* Mot de passe */}
          <div className="mb-8">
            <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wider">
              🔑 Mot de Passe
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                disabled={!hasDrawn}
                placeholder="Entrez votre mot de passe..."
                className="w-full px-4 py-3 bg-gradient-to-br from-white/10 to-white/5 border border-white/30 rounded-lg text-white font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition placeholder-white/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition text-lg"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm font-light">
                {error}
              </p>
            </div>
          )}

          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={!hasDrawn}
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-white/10 disabled:to-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition transform hover:scale-105 active:scale-95 shadow-lg uppercase tracking-wider"
          >
            🚀 Se Connecter
          </button>
        </form>

        {/* Informations de sécurité */}
        <div className="mt-8 text-center">
          <div className="inline-block px-4 py-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white/70 text-xs font-light tracking-wide">
              Après connexion, vous ne verrez que votre propre résultat
            </p>
          </div>
        </div>

        {/* Liste des mots de passe des participants */}
        {showParticipantPasswords && hasDrawn && (
          <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10 max-h-64 overflow-y-auto">
            <p className="text-white/60 text-xs mb-4 uppercase tracking-widest">Mots de passe</p>
            <div className="space-y-2">
              {participants.map((participant) => (
                <div
                  key={participant}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-white/80">{participant}</span>
                  <span className="text-orange-400 font-mono text-xs">
                    {PARTICIPANT_PASSWORDS[participant] || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle pour voir les mots de passe */}
        {hasDrawn && (
          <button
            type="button"
            onClick={() => setShowParticipantPasswords(!showParticipantPasswords)}
            className="w-full mt-6 text-white/60 hover:text-white/80 text-xs uppercase tracking-widest font-light transition"
          >
            {showParticipantPasswords ? "Masquer" : "Afficher"} les mots de passe
          </button>
        )}
      </div>

    </div>
  );
}
