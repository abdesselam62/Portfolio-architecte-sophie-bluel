// Récupération des données "works" à partir d'une API
const responseWorks = await fetch("http://localhost:5678/api/works");
const works = await responseWorks.json();
export {works};