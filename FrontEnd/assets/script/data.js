// Récupération des données "works" à partir d'une API dans le swagger
const responseWorks = await fetch("http://localhost:5678/api/works");
const works = await responseWorks.json();
export {works};

// Récupération des données "categories" à partir d'une API dans le swagger
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();
export { categories };