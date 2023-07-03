// Fonction, "Mode édition"
  export function editMode() {
    // Récupération de l'état de connexion
    const authState = sessionStorage.getItem("authState");    
  
    // Si connecté, alors
    if (authState === "true") {
      console.log("Vous êtes connecté"); // Message dans la console pour vérifier que vous êtes connecté
       
      // Fonction qui retire les filtres
      function noFilter(state) {
      const filtersWorks = document.querySelector(".filter");
      filtersWorks.style.display = state;
    }
      //   Masque les filtres
      noFilter("none");
      // Ancre "login" qui passe en "none"
      document.getElementById("login").style.display = "none";

      // Sinon si déconnecté alors,
    } else {
      // Ancre "logout" qui passe en "none"
      document.getElementById("logout").style.display = "none";
      console.log("Vous êtes déconnecté"); // Message dans la console pour vérifier que vous êtes dèconnecté
    }
  }
      
    //Récupération de l'ancre "logout"
    const logoutButton = document.querySelector("#logout");
    // Au click du bouton "Logout"
    logoutButton.addEventListener("click", function () {
    // Récupération du token
    const authToken = sessionStorage.getItem("authToken");
    // Récupération de l'état de connexion
    const authState = sessionStorage.getItem("authState");
    // Retire le token
    sessionStorage.removeItem("authToken");
    // Retire l'état de connexion
    sessionStorage.removeItem("authState");    
    // Ancre "login" qui passe en "flex"
    document.getElementById("login").style.display = "flex";
  });
   