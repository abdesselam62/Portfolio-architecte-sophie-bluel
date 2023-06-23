// Import de la liste de tous les travaux, à partir de "data.js"
import {works} from "./data.js";

// ---------------Fonction qui affiche la gallery---------------

// Fonction pour générer la "gallery" avec le paramètre "works" du fichier "data.js"
function generateGallery(works) {
  // Parcours les données "works"
  for (let i = 0; i < works.length; i++) {
    // "projet" contient tout les travaux de api/projet
    const projet = works[i];
    // Récupération de la class "gallery" du DOM
    const gallery = document.querySelector(".gallery");
    // Création d'une balise "figure" pour chaque travaux
    const figure = document.createElement("figure");
    // Création d'une balise "img" pour chaque travaux
    const image = document.createElement("img");
    // Récupération dès URL de chaque image
    image.src = projet.imageUrl;
    // Récupération dès titres de chaque image
    image.alt = projet.title;
    // Création d'une balise "figcaption" pour chaque travaux
    const figcaption = document.createElement("figcaption");
    // Ajout dès titres de chaque image dans la balise "figcaption"
    figcaption.innerText = projet.title;
    // "figure" enfant de "gallery"
    gallery.appendChild(figure);
    // "image" enfant de "figure"
    figure.appendChild(image);
    // "figcaption" enfant de "figure"
    figure.appendChild(figcaption);
  }
}
// Appel de la fonction "generateGallery" avec l'argument "works" du fichier "data.js"
generateGallery(works);
