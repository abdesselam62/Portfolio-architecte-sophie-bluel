// Import de la liste de tous les travaux, à partir de "data.js"
import { works, categories } from "./data.js";
// Import de la fonction "generateGallery" à partir de "gallery.js"
import { generateWorks } from "./gallery.js"

          
    // Fonction qui gére l'affichage ou le masquage des fenêtres "modales" en fonction du "click"
let modal = null;
export function modale() {

    const openModalBtn = document.querySelectorAll(".open-modal-btn");
    const closeModalBtn = document.querySelectorAll(".close-modal-btn");
    const modal = document.querySelector(".modal");

    // Bouton pour ouvrir la 1ére fenêtre modale
    for (let i = 0; i < openModalBtn.length; i++) {
        openModalBtn[i].addEventListener("click", function (e) {
            // Empêcher le comportement par défaut du clic
            e.preventDefault();
            modal.style.display = null;
            modal.removeAttribute('aria-hidden');
            modal.setAttribute('aria-modal', 'true');
        });
    };

    // Bouton pour fermer la 1ére ou 2éme fenêtre modale
    if (modal === null) return;
    for (let i = 0; i < closeModalBtn.length; i++) {
        closeModalBtn[i].addEventListener("click", function (e) {
            // Empêcher le comportement par défaut du clic
            e.preventDefault();
            modal.style.display = "none";
            modal.setAttribute('aria-hidden', 'true')
            modal.removeAttribute('aria-modal')
        });
    };

   // Ferme la modale au click à l'extérieur de la 1ére ou 2éme fenêtre modale
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            // Empêcher le comportement par défaut du clic
            e.preventDefault();
            modal.style.display = "none";
            modal.setAttribute('aria-hidden', 'true')
            modal.removeAttribute('aria-modal')
        };
    });


    // Bouton pour ouvrir la 2éme fenêtre modale

    // Récupération de la class "addPhotoBtn" de "modalContent"
    const addPhotoBtn = document.querySelector(".add-photo-btn");
    // Au click, masque la 1ére fenêtre modale et affiche la 2éme 
    addPhotoBtn.addEventListener("click", function (e) {
        // Empêcher le comportement par défaut du clic
        e.preventDefault();
        const modalContent = document.querySelector(".modal-content");
        modalContent.style.display = "none";
        const modalForm = document.querySelector(".modal-content-form");
        modalForm.style.display = "flex";
    });

    // Récupération de la class "returnModalBtn"
    const returnModalBtn = document.querySelector(".return-modal-btn");
    // Au click sur "returnModalBtn", retour sur "modalContent" (1ére fenêtre modale) 
    returnModalBtn.addEventListener("click", function (e) {
        // Empêcher le comportement par défaut du clic
        e.preventDefault();
        const modalContent = document.querySelector(".modal-content");
        modalContent.style.display = "flex";
        // et fermeture de la seconde fenêtre modale
        const modalForm = document.querySelector(".modal-content-form");
        modalForm.style.display = "none";
    });
};

 
// Fonction pour générer la "gallery" de la modale
function generateWorksModale(works) {
    // Parcours des données "works" pour les ajouter au HTML de la Modale.
    for (let i = 0; i < works.length; i++) {
        // "work" contient tout les travaux de api/work
        const work = works[i];
        // Récupération de la class "modal-gallery" du DOM
        const modalGallery = document.querySelector(".modal-gallery");
        // Création d'une balise "figure" dédiée à une fiche de travaux.
        const modalGalleryFigure = document.createElement("figure");
        //  Récupération de chaque "id" des fiches de travaux.
        modalGalleryFigure.dataset.id = work.id;
        // Création d'une balise "img" pour chaque fiche de travaux.
        const modalGalleryImage = document.createElement("img");
        // Récupération dès URL de chaque image  
        modalGalleryImage.src = work.imageUrl;
        // Récupération dès titres de chaque image     
        modalGalleryImage.alt = work.title;

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
        const editModalBtn = document.createElement("button");
        editModalBtn.className = "edit-btn-modale";
        editModalBtn.innerText = "éditer";

        // Rattachement de la balise "figure" à la balise "modalGallery".
        modalGallery.appendChild(modalGalleryFigure);
        // Rattachement de chaque élement à la balise "figure"
        modalGalleryFigure.appendChild(modalGalleryImage);        
        modalGalleryFigure.appendChild(editModalBtn);
        modalGalleryFigure.appendChild(btnIconTrash);
        modalGalleryFigure.appendChild(btnIconMove);
        // Rattachement des icones à son parent
        btnIconMove.appendChild(iconMove);        
        btnIconTrash.appendChild(iconTrash);
    };
};

// Appel de la fonction
generateWorksModale(works);

// Récupération du Token d'authentification
const authToken = sessionStorage.getItem("authToken");

// Fonction "suppression" de projet de la "Gallery" "Modale".
async function deleteWork(workId) {
    // Suppression du projet en fonction de l'ID du projet(work.id)
    const responseDelete = await fetch("http://localhost:5678/api/works/" + workId, {
        method: "DELETE",
        // headers : indiquent que les données sont en JSON
        headers: {
        Authorization: "Bearer " + authToken,
        },
      });
    
    // Si la réponse est "ok" alors le projet sera supprimé du DOM (Gallerie et modale)
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


            //Envoi d’un nouveau projet au back-end via le formulaire de la modale
// Gestion du l'aperçu de l'image choisie à "ajout photo" de la "modalForm"
const photoAddInput = document.querySelector("#photo-add-input");

photoAddInput.addEventListener("change", function () {
    // Si la taille du fichier doit être <= à 4 Mo
    if (photoAddInput.files[0].size <= 4 * 1024 * 1024) {
        // Réinitialisation de la zone photo-add-container" du DOM
        const photoAddContainer = document.querySelector(".photo-add-container");
        // Vide le "photoAddContainer" pour afficher l'image sélectionnée
        photoAddContainer.innerHTML = "";
        // Création d'une balise "img"
        const modalPreviewImg = document.createElement("img");
        // Création d'un objet URL à partir de la "src" sélectionnée
        modalPreviewImg.src = URL.createObjectURL(photoAddInput.files[0]);
        // Rattachement de la balise "img".
        photoAddContainer.appendChild(modalPreviewImg);

        // Choix d'une nouvelle image au click en cas d'erreur de choix
        modalPreviewImg.addEventListener("click", function () {
            photoAddInput.click();
        });
        } else {
        photoAddInput.value = "";
            return alert("La taille de l'image doit être inférieure à 4mo")
        };
        });

        // Copie du tableau de "categories" en enlevant l'index 0 (catégorie "Tous")
        const categoriesModale = categories.slice(0);

        // Parcours toutes les données de "categories"
        for (let i = 0; i < categoriesModale.length; i++) {
            const categoryModale = categoriesModale[i];
            // Récupération de la class "work-category"
            const workCategory = document.querySelector("#work-category");
            // Création des balises "option"
            const listScrollCategory = document.createElement("option");
            // Récupération des "id"
            listScrollCategory.value = categoryModale.id;
            // Affichage de chaque nom de "categories"
            listScrollCategory.innerText = categoryModale.name;
            // "listScrollCategory" enfant de "work-category"
            workCategory.appendChild(listScrollCategory);
        };
        // Récupération des deux "input" et du button "Valider"
        const workTitle = document.querySelector("#work-title");
        const workCategory = document.querySelector("#work-category");
        const validForm = document.querySelector(".valid-form");   
        
        // Si les 3 inputs ont une valeur alors affiche le btn "validForm" en vert
        function checkInputs() {
            if (photoAddInput.value && workTitle.value && workCategory.value) {
            validForm.classList.add("valid");
            } else {
            validForm.classList.remove("valid");
            };
        };

        photoAddInput.addEventListener("input", checkInputs);
        workTitle.addEventListener("input", checkInputs);
        workCategory.addEventListener("input", checkInputs);

        // Au click sur le bouton "Valider" du "modalForm"
        validForm.addEventListener("click", function (event) {
        event.preventDefault();
        // Si les 3 champs sont remplis
        if (
        photoAddInput.checkValidity() &&
        workTitle.checkValidity() &&
        workCategory.checkValidity() === true
        ) {
        // Appel de la fonction pour ajouter un projet
        addWork();
        } else {
            return alert("Tous les champs sont requis");
        };
    });
        // Fonction ajouter un projet
        async function addWork() {
        // Création d'un nouvel objet "FormData" pour stocker les données du formulaire
        const formData = new FormData();
    
        // Ajoute le fichier sélectionné "photoAddInput" au "formData"
        formData.append("image", photoAddInput.files[0]);
        // Ajoute la valeur saisie "workTitle" au "formData"
        formData.append("title", workTitle.value);
        // Ajoute la valeur "workCategory" choisie au "formData"
        formData.append("category", workCategory.value);
    
        const addResponse = await fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + authToken,
            accept: "application/json",
        },
        body: formData,
        });
    
        // Si réponse "ok" alors on ajoute le projet au DOM
        if (addResponse.ok) {
        // Ajoute mon nouveau projet à la fin du tableau "works"
        works.push(await addResponse.json());
        returnModalBtn.click();
        // Réinitialisation du DOM
        const modalGallery = document.querySelector(".modal-gallery");
        const sectionGallery = document.querySelector(".gallery");
        modalGallery.innerHTML = "";
        sectionGallery.innerHTML = "";
        // Les galleries se mettent à jour avec les nouvelles valeurs
        generateWorksModale(works);
        generateWorks(works);
        } else {
        return alert("Échec de l'ajout du projet");
        };
    };
    
    
