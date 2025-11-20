import { useState, useEffect } from "react";
import { PARTICIPANT_PASSWORDS, SEED_PARTICIPANTS, PREDEFINED_DRAW } from "../utils/seedData";

const STORAGE_KEY = "secret_santa_data";
const AUTH_KEY = "secret_santa_auth";

/**
 * Hook personnalisé pour gérer l'état du tirage au sort secret
 */
export function useSecretSantaState() {
  const [participants, setParticipants] = useState([]);
  const [draws, setDraws] = useState(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      // Si des données existent (tirage déjà fait), les charger
      try {
        const data = JSON.parse(savedData);
        setParticipants(data.participants || SEED_PARTICIPANTS);
        setDraws(data.draws || null);
        setHasDrawn(data.hasDrawn || false);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        setParticipants(SEED_PARTICIPANTS);
      }
    } else {
      // Sinon, commencer frais avec les participants par défaut
      setParticipants(SEED_PARTICIPANTS);
      setDraws(null);
      setHasDrawn(false);
    }

    // Charger l'utilisateur connecté s'il existe
    const savedAuth = localStorage.getItem(AUTH_KEY);
    if (savedAuth && PARTICIPANT_PASSWORDS[savedAuth]) {
      setCurrentUser(savedAuth);
    }
  }, []);

  // Sauvegarder les données à chaque changement
  const saveToStorage = (newParticipants, newDraws, newHasDrawn) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        participants: newParticipants,
        draws: newDraws,
        hasDrawn: newHasDrawn,
      })
    );
  };


  // Effectuer le tirage au sort (utilise le tirage PRÉDÉFINI)
  const performDraw = () => {
    if (participants.length < 2) return false;
    // Utiliser le tirage prédéfini du code
    const newDraws = PREDEFINED_DRAW;
    if (newDraws) {
      setDraws(newDraws);
      setHasDrawn(true);
      saveToStorage(participants, newDraws, true);
      return true;
    }
    return false;
  };

  // Réinitialiser tout
  const resetAll = () => {
    setParticipants([]);
    setDraws(null);
    setHasDrawn(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Réinitialiser le tirage seulement
  const resetDraw = () => {
    setDraws(null);
    setHasDrawn(false);
    saveToStorage(participants, null, false);
  };

  // Authentifier un participant
  const login = (name, password) => {
    const participant = participants.find((p) => p.toLowerCase() === name.toLowerCase());
    if (!participant) {
      return false; // Participant n'existe pas
    }

    // Obtenir le mot de passe correct pour ce participant
    const correctPassword = PARTICIPANT_PASSWORDS[participant];
    if (password !== correctPassword) {
      return false; // Mot de passe incorrect
    }

    setCurrentUser(participant);
    localStorage.setItem(AUTH_KEY, participant);
    return true;
  };

  // Déconnexion
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  // Obtenir le tirage de l'utilisateur actuel
  const getCurrentUserDraw = () => {
    if (!currentUser || !draws) return null;
    return draws.find((d) => d.from.toLowerCase() === currentUser.toLowerCase())?.to;
  };

  return {
    participants,
    draws,
    hasDrawn,
    currentUser,
    performDraw,
    resetAll,
    resetDraw,
    login,
    logout,
    getCurrentUserDraw,
  };
}
