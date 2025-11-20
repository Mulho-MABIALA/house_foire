import { useState, useEffect } from "react";
import { generateDraw } from "../services/drawService";
import { PARTICIPANT_PASSWORDS, SEED_PARTICIPANTS } from "../utils/seedData";

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
      try {
        const data = JSON.parse(savedData);
        let loadedParticipants = data.participants || [];

        // Valider que tous les participants existent dans PARTICIPANT_PASSWORDS
        const validParticipants = loadedParticipants.filter(
          (p) => PARTICIPANT_PASSWORDS[p] !== undefined
        );

        // Si des participants ont été filtrés (données obsolètes), nettoyer
        if (validParticipants.length !== loadedParticipants.length) {
          console.log("🧹 Nettoyage des données obsolètes détecté");
          // Réinitialiser complètement si données corrompues
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(AUTH_KEY);
          setParticipants([]);
          setDraws(null);
          setHasDrawn(false);
          setCurrentUser(null);
          return;
        }

        setParticipants(validParticipants);
        setDraws(data.draws || null);
        setHasDrawn(data.hasDrawn || false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    }

    // Charger l'utilisateur connecté
    const savedAuth = localStorage.getItem(AUTH_KEY);
    if (savedAuth) {
      // Valider que l'utilisateur existe
      if (PARTICIPANT_PASSWORDS[savedAuth]) {
        setCurrentUser(savedAuth);
      } else {
        // Utilisateur invalide, déconnecter
        localStorage.removeItem(AUTH_KEY);
      }
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

  // Ajouter un participant
  const addParticipant = (name) => {
    if (!name.trim()) return false;
    if (participants.some((p) => p.toLowerCase() === name.toLowerCase())) {
      return false; // Doublon
    }
    const newParticipants = [...participants, name.trim()];
    setParticipants(newParticipants);
    saveToStorage(newParticipants, draws, hasDrawn);
    return true;
  };

  // Supprimer un participant
  const removeParticipant = (name) => {
    const newParticipants = participants.filter((p) => p !== name);
    setParticipants(newParticipants);
    // Réinitialiser le tirage si on supprime quelqu'un
    saveToStorage(newParticipants, null, false);
    setDraws(null);
    setHasDrawn(false);
  };

  // Effectuer le tirage au sort
  const performDraw = () => {
    if (participants.length < 2) return false;
    const newDraws = generateDraw(participants);
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

  // Ajouter plusieurs participants à la fois
  const addMultipleParticipants = (names) => {
    let newParticipants = [...participants];
    let added = 0;

    for (const name of names) {
      if (
        name.trim() &&
        !newParticipants.some((p) => p.toLowerCase() === name.toLowerCase())
      ) {
        newParticipants.push(name.trim());
        added++;
      }
    }

    if (added > 0) {
      setParticipants(newParticipants);
      saveToStorage(newParticipants, null, false);
      setDraws(null);
      setHasDrawn(false);
    }

    return added;
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
    addParticipant,
    removeParticipant,
    performDraw,
    resetAll,
    resetDraw,
    addMultipleParticipants,
    login,
    logout,
    getCurrentUserDraw,
  };
}
