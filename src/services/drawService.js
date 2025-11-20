/**
 * Service pour gérer le tirage au sort secret
 * Résout le problème d'affectation où chaque personne tire une autre personne différente
 */

/**
 * Mélange un tableau aléatoirement (Fisher-Yates)
 * @param {Array} array - Tableau à mélanger
 * @returns {Array} - Tableau mélangé
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Vérifie si le tirage actuel est valide (pas d'auto-attribution)
 * @param {Array} givers - Tableau des noms de ceux qui donnent
 * @param {Array} receivers - Tableau des noms de ceux qui reçoivent
 * @returns {boolean} - True si valide
 */
function isValidDraw(givers, receivers) {
  for (let i = 0; i < givers.length; i++) {
    if (givers[i] === receivers[i]) {
      return false; // Auto-attribution trouvée
    }
  }
  return true;
}

/**
 * Génère un tirage au sort valide
 * @param {Array} participants - Liste des noms des participants
 * @returns {Array|null} - Tableau des résultats [{from, to}, ...] ou null si impossible
 */
export function generateDraw(participants) {
  if (!participants || participants.length < 2) {
    return null; // Besoin d'au moins 2 participants
  }

  const givers = [...participants];
  let receivers;
  let attempts = 0;
  const maxAttempts = 1000; // Sécurité contre les boucles infinies

  // Essaie de générer un tirage valide
  do {
    receivers = shuffleArray(participants);
    attempts++;
    if (attempts > maxAttempts) {
      console.error("Impossible de générer un tirage valide après 1000 tentatives");
      return null;
    }
  } while (!isValidDraw(givers, receivers));

  // Crée le résultat final
  return givers.map((giver, index) => ({
    from: giver,
    to: receivers[index],
  }));
}

/**
 * Récupère le résultat du tirage pour un participant spécifique
 * @param {Array} draws - Résultats du tirage
 * @param {string} participantName - Nom du participant
 * @returns {string|null} - Nom de la personne à gâter
 */
export function getDrawForParticipant(draws, participantName) {
  const draw = draws.find((d) => d.from === participantName);
  return draw ? draw.to : null;
}

/**
 * Vérifie l'intégrité du tirage
 * @param {Array} draws - Résultats du tirage
 * @returns {object} - Objet avec les statistiques
 */
export function validateDraw(draws) {
  if (!draws || draws.length === 0) {
    return { valid: false, issues: ["Aucun tirage"] };
  }

  const issues = [];
  const givers = new Set();
  const receivers = new Set();

  for (const draw of draws) {
    // Vérifier auto-attribution
    if (draw.from === draw.to) {
      issues.push(`Auto-attribution trouvée: ${draw.from}`);
    }

    // Vérifier les doublons
    if (givers.has(draw.from)) {
      issues.push(`Giver en doublon: ${draw.from}`);
    }
    if (receivers.has(draw.to)) {
      issues.push(`Receiver en doublon: ${draw.to}`);
    }

    givers.add(draw.from);
    receivers.add(draw.to);
  }

  return {
    valid: issues.length === 0,
    issues,
    stats: {
      totalParticipants: draws.length,
      uniqueGivers: givers.size,
      uniqueReceivers: receivers.size,
    },
  };
}
