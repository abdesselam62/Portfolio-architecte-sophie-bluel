// Import de la liste de tous les travaux à partir du FETCH sur l'API, de "DATA.JS".
import { works } from "./data.js";
// Import de la list des "CATEGORIES" à partir du FETCH sur l'API, de "DATA.JS".
import { categories } from "./data.js";
// Import de la fonction generateGallery à partir de "gallery.js"
import { generateWorks } from "./gallery.js"

// Fonction permettant la gestion de l'ouverture et fermeture de la MODALE en "EDITMODE".
export function modale() {

    const openModalButton = document.querySelectorAll(".open-modal-button");
    const closeModalButton = document.querySelectorAll(".close-modal-button");
    const modal = document.querySelector(".modal");

    // Ajout des Listener pour ouvrir la modale (Boutons "Publier les changements" et "Modifier" à côté de Mes Projets).
    for (let i = 0; i < openModalButton.length; i++) {
        openModalButton[i].addEventListener("click", function () {
            modal.style.display = "flex";
        });
    };

    // Ajout des Listener pour fermer la modale au clique sur un bouton "Fermer".
    for (let i = 0; i < closeModalButton.length; i++) {
        closeModalButton[i].addEventListener("click", function () {
            modal.style.display = "none";
        });
    };

    // Ajout d'un écouteur d'événement pour fermer la modale en cliquant à l'extérieur de celle-ci.
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        };
    });
};

// Définition du fonctionnement du bouton "RETURN" de la partie "Ajout de projet" de la "MODALE".
const returnModalButton = document.querySelector(".return-modal-button");

returnModalButton.addEventListener("click", function () {
    // Switch de la "MODALE" de la partie "Ajout de projet" à "Suppression de projet".
    const modalGallerySwitch = document.querySelector(".modal-content");
    modalGallerySwitch.style.display = "flex";
    const modalFormSwitch = document.querySelector(".modal-content-form");
    modalFormSwitch.style.display = "none";
});

// Génération de la "GALLERY" de la MODALE :
// Fonction pour générer la "GALLERY" de la MODALE.
function generateGalleryModale(works) {
    // Parcours des données WORKS pour les ajouter au HTML de la MODALE.
    for (let i = 0; i < works.length; i++) {

        const work = works[i];
        // Récupération de l'élément du DOM qui accueillera les fiches des différents travaux.
        const sectionGalleryModale = document.querySelector(".modal-gallery-grid-container");
        // Création d'une balise dédiée à une fiche de travaux.
        const galleryElementModale = document.createElement("figure");
        galleryElementModale.dataset.id = work.id;
        // Création des balises.
        const imageElementModale = document.createElement("img");
        imageElementModale.src = work.imageUrl;
        imageElementModale.alt = work.title;
        imageElementModale.crossOrigin = "";      
               
        const buttonGalleryElementModale = document.createElement("button");
        buttonGalleryElementModale.className = "edit-button-modale";
        buttonGalleryElementModale.innerText = "éditer";

        // Rattachement de la balise "figure" à la section "sectionGalleryModale".
        sectionGalleryModale.appendChild(galleryElementModale);
        // Rattachement des balises "img" et "button" à la balise "figure"
        galleryElementModale.appendChild(imageElementModale);        
        galleryElementModale.appendChild(buttonGalleryElementModale);
    };
};

generateGalleryModale(works);

// Passage de la "MODALE" en mode formulaire d'ajout de projet si clique sur le bouton "Ajouter une photo" de la partie "Gallerie / suppresion de projet" de la "MODALE".
// Ajout du Listener sur le bouton "Ajouter une photo" et SWITCH de la "MODALE" si cliqué.
const addPhotoButton = document.querySelector(".add-photo-button");

addPhotoButton.addEventListener("click", function () {
    const modalGallerySwitch = document.querySelector(".modal-content");
    modalGallerySwitch.style.display = "none";
    const modalFormSwitch = document.querySelector(".modal-content-form");
    modalFormSwitch.style.display = "flex";
});