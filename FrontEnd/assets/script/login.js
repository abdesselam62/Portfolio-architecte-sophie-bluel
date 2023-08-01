// Récupération de la balise "form"
const formInfos = document.querySelector("form");

// Fonction d'auth à partir des informations de l'API
formInfos.addEventListener("submit", async function (event) {
  // la page ne se rechargera plus en gardant les valeurs entréees
  event.preventDefault();
            // Création de l'objet "userInfos"
  // Récupération de la balise + la valeur entrée de "input[type"email"]"
  const email = document.querySelector("#email").value;
  // Récupération de la balise + la valeur entrée de "input[type"password"]"
  const password = document.querySelector("#password").value;
  // Création d'un objet, contiennent les valeurs récupérées précédemment
  const userInfos = { email, password };

  /* "fetch" pour envoyer une requête HTTP à l’URL spécifiée
     "fetch" renvoie une promesse qui résout en un objet "Response"
     Le mot-clé "await" est utilisé pour attendre que la promesse 
     soit résolue avant de continuer
  */
            // Envoi de ces informations sur l'API "Login"
  // "auth" signifie "authentification"
  const authInfos = await fetch("http://localhost:5678/api/users/login", {
      // method: "POST" : signifie que des données seront envoyées au serveur
      method: "POST",
      // headers : indiquent que les données sont en JSON
      headers: { "Content-Type": "application/json" },
      // La requête est crée en convertissant "userInfos" en JSON
      body: JSON.stringify(userInfos),
    },
  );

  // Extraction des données Json de la réponse HTTP, stokée dans "authResponse"
  const authResponse = await authInfos.json();
  // récupération du jeton d'auth(token)
  const authToken = authResponse.token;
  // Vérification du statut de la réponse HTTP en accédant à la propriété "ok" de l'objet "Response"
  const authState = authInfos.ok;

  // Si connecté alors
  if (authState === true) {
    // Tu me stock le token dans  "authToken"
    sessionStorage.setItem("authToken", authToken);
    // Tu me stock la connexion (200 connected) "authToken"
    sessionStorage.setItem("authState", authState);
    // Me redrige vers la page "index.html"
    window.location.replace("index.html");
    // Sinon
  } else {
    // Récupération de la class "errorUserNotification"
    const errorUserNotification = document.querySelector(".errorUserNotification"); // Message d'erreur
    errorUserNotification.innerText = "Erreur dans l’identifiant ou le mot de passe";
    errorUserNotification.style.color = "red";
  };
});
