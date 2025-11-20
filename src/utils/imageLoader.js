/**
 * Helper pour charger les images de manière sécurisée et flexible
 */

/**
 * Tente de charger une image depuis les assets
 * @param {string} imageName - Nom de l'image (ex: "house.jpg")
 * @returns {string|null} - URL de l'image ou null si non trouvée
 */
export function loadImageFromAssets(imageName) {
  try {
    // Essai de charger l'image dynamiquement
    const image = require(`../assets/${imageName}`);
    return image;
  } catch (error) {
    console.warn(
      `Image non trouvée: ${imageName}. Assurez-vous qu'elle existe dans src/assets/`
    );
    return null;
  }
}

/**
 * Précharge une image pour éviter les flashs
 * @param {string} imageUrl - URL ou path de l'image
 * @returns {Promise} - Promise qui se résout quand l'image est chargée
 */
export function preloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    if (!imageUrl) {
      resolve(null);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(imageUrl);
    img.onerror = () => {
      console.warn(`Erreur lors du chargement de l'image: ${imageUrl}`);
      resolve(null); // Résout quand même pour ne pas bloquer
    };
    img.src = imageUrl;
  });
}

/**
 * Charge et précharge une image
 * @param {string} imageName - Nom du fichier image
 * @returns {Promise<string|null>}
 */
export async function loadAndPreloadImage(imageName) {
  const imageUrl = loadImageFromAssets(imageName);
  if (!imageUrl) {
    return null;
  }
  return preloadImage(imageUrl);
}
