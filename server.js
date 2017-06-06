//*****************************************************************
//* Création d’une "to do list" minimaliste
//*
//* La "to do list" sera matérialisée en javascript par un tableau.
//* Chaque entrée du tableau représentera une tâche à faire ou un rdv.
//* Elle devra être gérée totalement par un serveur web.
//*
//******************************************************************

// Import du module permettant de créer un seveur web
var http = require("http");
// Import des modules "url" et "querystring" permettant d'exploiter les informations
// contenues dans l'URL, envoyées par le navigateur vers le serveur.
var url  = require("url");
var querystring = require("querystring");

// Création d'une variable todoList contenant une liste de tâche & rdv enregistrées 
// dans un tableau JS.
var todoList = [
  "rdv chez le médecin", 
  "chercher colis au point relais", 
  "dej pro avec John", 
  "cours de tennis"
];
      

// Initialisation du serveur Web grace à l'execution
// de la méthode "createServer()" de l'objet "http".
// Un copie de cette création est retourné" par "créateServer()" puis 
// stocké dans une variable nomée "server"
var server = http.createServer(
  
  // Fonction qui sera exécutée automatiquement 
  // a chaque fois que le serveur reçoit une 
  // demande de la part d'un navigateur.
  // La fonction reçoit deux variables (ici "req" et "res")
  // nous permettant d'avoir un accés à un objet representant la question
  // envoyée par le navigateur et une autre representant la réponse à envoyer au navigateur
  function(req, res) {
    
    // L'URL qui corespond à la question envoyée par le navigateur
    // est contenue dans la propriétée "req.url"
    // On passe cette valeur à la méthode "url.parse()" pour la décortiquer 
    // On accede ensuite à la propriétée "query" du résultat retrouné par "url.parse()"
    // pour la stocker dans la variable urlQuery;
    var urlQuery  = url.parse(req.url).query;
    // urlQuery corespond à la chaine de caractère de l'URL située apres le "?"
    // Nous souhaitons décortiquer encore plus cette partie afin de la
    // rendre exploitable encore plus facilement.
    // On va utiliser et passer la valeur de "urlQuery" à la méthode "querystring.parse()"
    // et ensuite récuperer le résultat dans une variable "params"
    var params = querystring.parse(urlQuery);
   
    // On envoie des information d'en tête au navigateur grace la méthode "res.writeHead()"
    // Ces informations servent au navigateur uniquement pour lui informer que la réponse sera au format HTML encodé en UTF-8 (gestion des caractères accentués)
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    
    // On test si la valeur de la propriété "params.task" est differente de undefined
    if(params.task != undefined) {
      // On ajoute au tableau todoList la valeur de "params.task" qui corespond à la nouvelle  
      // tache envoyé par le navigateur via l'URL
      todoList.push(params.task);
    }
    
    // Lecture du tableau "todoList":
    // On boucle en initialisant le compteur i à 0. On test ensuite à chaque tours de boucle si la valeur du compteur i est inferieur à taille du tableau todoList
    // et on définit que le compteur i augmente de +1 à chauqe tours de boucle
    for(var i=0; i<todoList.length; i++) {
      // On accede à l'élément situé à la position i (valeur du compteur) et on prepare les 
      // informations à envoyer au navigateur grace à la méthode res.write();
      res.write(todoList[i]+"<br>");
    } 
    
    //On valide l'envoi des informations vers le navigateur
    res.end();
  }
);


// On demande au serveur d'écouter 
// sur le port 80
server.listen(80);