// Import de la liste des travaux et catégories à partir de "data.js"
import {works, categories} from "./data.js";

import { editMode } from "./editMod.js";

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

  // Création des boutons du tableau "categories"

/*for(let i=0; i < categories.length ; i++){    
    let btnFiltres = document.querySelector(".filter");
    btnFiltres.innerHTML += '<button data-id ="' + categories[i].id + '">' + categories[i].name + '</button';
};
*/

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
    
// Affiche le mode édition si connecté
editMode();



