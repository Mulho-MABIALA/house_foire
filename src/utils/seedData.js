/**
 * Script pour pré-charger des participants de test
 * Utile pour les démonstrations et les tests
 */

export const SEED_PARTICIPANTS = [
  "Zéna",
  "Erichelle",
  "Daisy",
  "Ibrahim",
  "yves",
  "orlane",
  "Sarah",
  "Denise",
  "Marcelle",
];

// Mots de passe individuels pour chaque participant
export const PARTICIPANT_PASSWORDS = {
  "Zéna": "1234",
  "Erichelle": "5678",
  "Daisy": "9012",
  "Ibrahim": "3456",
  "yves": "7890",
  "orlane": "2345",
  "Sarah": "0123",
  "Denise": "4567",
  "Marcelle": "6789",
};

// Tirage prédéfini - FIXÉ dans le code
export const PREDEFINED_DRAW = [
  { from: "Zéna", to: "Marcelle" },
  { from: "Erichelle", to: "Ibrahim" },
  { from: "Daisy", to: "orlane" },
  { from: "Ibrahim", to: "Sarah" },
  { from: "yves", to: "Denise" },
  { from: "orlane", to: "Zéna" },
  { from: "Sarah", to: "Erichelle" },
  { from: "Denise", to: "Daisy" },
  { from: "Marcelle", to: "yves" },
];

/**
 * Initialise localStorage avec les participants de démonstration
 */
export function seedData() {
  const STORAGE_KEY = "secret_santa_data";
  const existingData = localStorage.getItem(STORAGE_KEY);

  // Ne pas écraser si des données existent déjà
  if (existingData) {
    console.log("Les données existent déjà, aucune initialisation");
    return false;
  }

  const initialData = {
    participants: SEED_PARTICIPANTS,
    draws: null,
    hasDrawn: false,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  console.log(
    `✓ Données initialisées avec ${SEED_PARTICIPANTS.length} participants`
  );
  return true;
}

/**
 * Réinitialise et charge les données de test
 */
export function resetAndSeedData() {
  const STORAGE_KEY = "secret_santa_data";
  const initialData = {
    participants: SEED_PARTICIPANTS,
    draws: null,
    hasDrawn: false,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  console.log(
    `✓ Données réinitialisées avec ${SEED_PARTICIPANTS.length} participants`
  );
  return true;
}
