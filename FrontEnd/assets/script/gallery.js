// Import de la liste des travaux et catégories à partir de "data.js"
import {works, categories} from "./data.js";
// Import de la fonction "editMode" à partir de "editMode.js" permettant d'actualiser la page INDEX.HTML si authentifié.
import { editMode } from "./editMod.js";
// Import de la fonction "modale" à partir de "modale.js" permettant de gérer l'affichage de la MODALE dans index.html
import { modale } from "./modale.js";
// Export de la fonction "generateWorks" dans "modale.js" pour actualisation de l'affichage des "Galleries" après ajout ou suppression d'un projet.
export { generateWorks };

        //Affichage des projets sur la page

function generateWorks(works){
   // Parcours des données "works" pour les ajouter au HTML (Gallerie de travaux).
  for(let i=0; i < works.length; i++){
    
    const projet = works[i];
    // Récupération de l'élément du DOM qui accueillera les fiches des différents travaux.    
    const galleryWorks = document.querySelector(".gallery");
    // Création d'une balise dédiée à une fiche de travaux
    const figureWorks = document.createElement("figure");
    figureWorks.dataset.id = projet.id;
    // Création des balises.
    const imgWork = document.createElement("img");
    imgWork.src = projet.imageUrl;
    imgWork.alt = projet.title;    
    const titleWork = document.createElement("figcaption");
    titleWork.innerText = projet.title;
    // Rattachement de la balise "figure" à la class "Gallery".
    figureWorks.appendChild(imgWork);
    // Rattachement des balises "img" et "figcaption" à la balise "figure".
    figureWorks.appendChild(titleWork);
    galleryWorks.appendChild(figureWorks);
};
};

generateWorks(works);

        //Affichage des projets filtrés
//Mise en place des boutons filtres pour les projets
const galleryWorks = document.querySelector(".gallery");
// Création d'un balise dédiée à la classe "filter"
const filtersWorks = document.createElement("div");
filtersWorks.classList.add("filter");
galleryWorks.before(filtersWorks);
// Création du boutton "Tous"
const filterButtonAll = document.createElement("button");
filterButtonAll.innerText = "Tous";
filtersWorks.appendChild(filterButtonAll);

filterButtonAll.addEventListener("click", function() { 
  document.querySelector(".gallery").innerHTML = "";        
  generateWorks(works);
});

 // Création des boutons du tableau "categories"

for(let i=0; i < categories.length ; i++){
  let btnFiltres = document.createElement("button");
  btnFiltres.innerText = categories[i].name;
  filtersWorks.appendChild(btnFiltres);        

  btnFiltres.addEventListener("click", function() {            
    const filteredWorks = works.filter(function(work){
    return work.category.name === categories[i].name;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
  });
};      
    
  // ---------------Changement de couleurs au click sur les filtres---------------

// Sélection de tous les boutons
const buttons = document.querySelectorAll(".filter button");

// Parcours tous les "buttons"
for (let i = 0; i < buttons.length; i++) {
  // Ajout d'une class "filter-selected" pour chaque "buttons"
  buttons[i].classList.add("filter-selected");
};

// Fonction pour réinitialiser le style de tous les boutons
function resetButtonColors() {
  // "button" parcours chaque élements de "buttons"
  for (let button of buttons) {
    // Les boutons non concernés par le click prendront ce style :
    button.style.backgroundColor = "white";
    button.style.color = "#1D6154";
  };
};

// "button" parcours chaque élements de "buttons"
for (let button of buttons) {
  // Chaque "button" au click
  button.addEventListener("click", function () {
    // Appel de la fonction "resetButtonColors()" qui va réinitialiser le style
    resetButtonColors();
    // Changement de style au bouton cliqué :
    button.style.backgroundColor = "#1D6154";
    button.style.color = "white";
  });
};

    
// Affiche le mode édition si connecté
editMode();

// Appel de la fonction de gestion de la "Modale" dans "modale.js" qui permet de gérer les projets si authentifié.
modale();


