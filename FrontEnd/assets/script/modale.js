// Import de la liste de tous les travaux, à partir de "data.js"
import { works, categories } from "./data.js";
// Import de la fonction "generateGallery" à partir de "gallery.js"
import { generateWorks } from "./gallery.js"

// Fonction qui affiche ou masque le "mode édition" en fonction du "click"
export function modale() {

    const openModalButton = document.querySelectorAll(".open-modal-button");
    const closeModalButton = document.querySelectorAll(".close-modal-button");
    const modal = document.querySelector(".modal");

    // Bouton ouvrir la modale
    for (let i = 0; i < openModalButton.length; i++) {
        openModalButton[i].addEventListener("click", function () {
            modal.style.display = "flex";
        });
    };

    // Bouton fermer la modale
    for (let i = 0; i < closeModalButton.length; i++) {
        closeModalButton[i].addEventListener("click", function () {
            modal.style.display = "none";
        });
    };

   // Ferme la modale au clique à l'extérieur de la modale
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        };
    });
};

// Récupération de la class "return-modal-button"
const returnModalButton = document.querySelector(".return-modal-button");

// Au click sur "return-modal-button", retour sur "modalContent" (1ére fenêtre modale) 
returnModalButton.addEventListener("click", function () {
    const modalGallerySwitch = document.querySelector(".modal-content");
    modalGallerySwitch.style.display = "flex";
    // et fermeture de la seconde fenêtre modale
    const modalFormSwitch = document.querySelector(".modal-content-form");
    modalFormSwitch.style.display = "none";
});

// Fonction pour générer la "gallery" de la modale
function generateGalleryModale(works) {
    // Parcours des données "works" pour les ajouter au HTML de la Modale.
    for (let i = 0; i < works.length; i++) {
        // "work" contient tout les travaux de api/work
        const work = works[i];
        // Récupération de la class "modal-gallery-grid-container" du DOM
        const sectionGalleryModale = document.querySelector(".modal-gallery-grid-container");
        // Création d'une balise "figure" dédiée à une fiche de travaux.
        const galleryElementModale = document.createElement("figure");
        //  Récupération de chaque "id" des fiches de travaux.
        galleryElementModale.dataset.id = work.id;
        // Création d'une balise "img" pour chaque fiche de travaux.
        const imageElementModale = document.createElement("img");
        // Récupération dès URL de chaque image  
        imageElementModale.src = work.imageUrl;
        // Récupération dès titres de chaque image     
        imageElementModale.alt = work.title;

        // Création d'un "button" pour chaque projet qui contiendra une icone "déplacement"
        const btnIconMove = document.createElement("button");
        btnIconMove.className = "btn-Icon-Move";
        const iconMove = document.createElement("i");
        iconMove.className = "fa-solid fa-arrows-up-down-left-right";

        // Création d'un "button" pour chaque projet qui contiendra une icone "supprimer"
        const btnIconTrash = document.createElement("button");
        btnIconTrash.className = "btn-Icon-Trash";
        const iconTrash = document.createElement("i");
        iconTrash.className = "fa-solid fa-trash-can";

        //Supprime le projet au clique de l'icone "supprimer"
        btnIconTrash.addEventListener("click", function () {
        // Appel de la fonction "deleteWork" pour supprimer le projet
        deleteWork(work.id);
        });
        
        // Création d'un "button" pour chaque projet qui contiendra un texte : "éditer"
        const buttonGalleryElementModale = document.createElement("button");
        buttonGalleryElementModale.className = "edit-button-modale";
        buttonGalleryElementModale.innerText = "éditer";

        // Rattachement de la balise "figure" à la section "sectionGalleryModale".
        sectionGalleryModale.appendChild(galleryElementModale);
        // Rattachement de chaque élement à la balise "figure"
        galleryElementModale.appendChild(imageElementModale);        
        galleryElementModale.appendChild(buttonGalleryElementModale);
        galleryElementModale.appendChild(btnIconTrash);
        galleryElementModale.appendChild(btnIconMove);
        // Rattachement des icones à son parent
        btnIconMove.appendChild(iconMove);        
        btnIconTrash.appendChild(iconTrash);
    };
};

// Appel de la fonction
generateGalleryModale(works);

// Récupération du Token d'authentification
const authToken = sessionStorage.getItem("authToken");

// Fonction "suppression" de projet de la "Gallery" "Modale".
async function deleteWork(workId) {
    // Suppression du projet en fonction de l'ID du projet
    const responseDelete = await fetch("http://localhost:5678/api/works/" + workId, {
        method: "DELETE",
        headers: {
        Authorization: "Bearer " + authToken,
        },
      });
    
    // Si la réponse est "ok" alors le projet sera supprimé
    if (responseDelete.ok) {
        // Récupération de l'ID sélectionné (projet)
        const workToRemove = document.querySelectorAll(`figure[data-id="${workId}"]`);

        // Retire le(s) projet(s)
        for (let i = 0; i < workToRemove.length; i++) {
            workToRemove[i].remove();
        };
        
        // Suppression de l'élément du tableau "works" correspondant à l'ID du projet.
        // Trouver l'index du projet dans le tableau "works" dont l'ID correspond
        const workIndexToRemove = works.findIndex(work => workId === work.id);
        // Supprime l'élément du tableau "works" à l'index "workIndexToRemove", "1" élément
        works.splice(workIndexToRemove, 1);

    } else {
        return alert("Échec de la suppression du projet");
    };
};

// Récupération de la class "add-photo-button" de "modal-content"
const addPhotoButton = document.querySelector(".add-photo-button");

// Masque la "modal-content" et Affiche "modal-content-form" au clique
addPhotoButton.addEventListener("click", function () {
    const modalGallerySwitch = document.querySelector(".modal-content");
    modalGallerySwitch.style.display = "none";
    const modalFormSwitch = document.querySelector(".modal-content-form");
    modalFormSwitch.style.display = "flex";
});