/**
 * Déclaration de l'application MyPhonesApp
 */


var MyApp = angular.module('MyApp', []);

/**
 * Controller MainCtrl qui fera appel au premier module d'Angular, qui est la scope
 * La scope est un objet entre le html et le javascript pour contrôler la DOM
 * Un contrôleur requiert à 99% la scope
 */
MyApp.filter('orderTab', function(){
  return function(input, regex){
    var tableau = [];
    var regexAge = new RegExp(regex);
    if (input != undefined) {
      for (user of input) {
        if (regexAge.test(user.age)) {
          tableau.push(user);
        }
      }
    }

    return tableau;
  };
});

MyApp.filter('filtreAge', function () {
  return function(tableau, date){
    if(date === undefined || date === null){
      return tableau;
    }
    return  _.filter(tableau, function(utilisateur){
      return moment(utilisateur.birth,'DD/MM/YYYY') > moment(date);
    });
  };
});

MyApp.filter('triNoteBacFilter', function () {
  return function(input, triNoteBac){
    var tableau = [];
    if (!angular.isDefined(triNoteBac)) {
      tableau = input;
      return tableau;
    }
    else {
      for (user of input) {
        // console.log("Note user et range value : " + user.noteBac,triNoteBac);
        if (user.noteBac >= triNoteBac) {
          tableau.push(user);
        }
      }
    }
    return tableau;
  };
});

MyApp.filter('sexe',function(){
  return function(sexe){
      if(sexe === false){
        return "Femme";
      }
      return  "Homme";
   };
});

MyApp.filter('mineur',function () {
  return function (input, checked) {
    var majeurs = [];
    var mineurs = [];
    // Rangement des majeurs et mineurs
    for (user of input) {
      if (user.age >= 18) {
        majeurs.push(user);
      }
      else {
        mineurs.push(user);
      }
    }
    //Si switch coché
    if (checked == undefined || checked == false) {
      checked = true;
      return mineurs;
    }
    checked = false;
    return majeurs;
  };
});

MyApp.filter('drapeau',function(){
   return function(langue){
     switch (langue) {
       case "es":
        return "http://www.europetrotteur.com/images/drapeau_Espagne.png";
       case "en":
        return "http://www.europetrotteur.com/images/drapeau_United%20Kingdom.png";
       case "it":
        return "http://www.europetrotteur.com/images/drapeau_Italie.png";
       case "fr":
          return "http://www.europetrotteur.com/images/drapeau_France.png";
       default:
       return "http://yaronet.org/190/image/emoji/flag.gif";
     }
   };
});


MyApp.controller('MainCtrl', ['$scope','$http', function($scope, $http) {
  //Création d'ue variable title dans la scope
  $scope.title = "Exo 3 Gestion de contacts";

  $http.get('https://jsonblob.com/api/57ac253ae4b0dc55a4ec09eb').success(function (response) {
    $scope.utilisateurs = response;
      $scope.concatNP();
      remplissage();
  });

  $scope.concatNP = function () {
    for (user of $scope.utilisateurs) {
      user.NomPrenom = user.prenom + " " + user.nom;
    }
  };



  //mois anniversaire ng show
  $scope.moisAnnif = function (user) {
    // console.log(user.birth);
      var mois = parseInt(user.birth.substr(3,2));
      var moisCourant = new Date().getMonth()+1;

      if (mois == moisCourant) {
        return true;
      }
      return false;
  };


// Tableau d'ID des j'aimes
  $scope.lesLikes = [];

  $scope.estDedans = function (identifiant) {
    $scope.lesLikes = _.uniq($scope.lesLikes);

    if ($scope.lesLikes.indexOf(identifiant) != -1) {

      return true;
    }
    return false;
  };

  $scope.addLikeOrRemove = function (user) {
    if (user == undefined) {
      return true;
    }

    if ($scope.estDedans(user.aydee)) {
      var indiceDansLesLikes = $scope.lesLikes.indexOf(user.aydee);
      $scope.lesLikes.splice(indiceDansLesLikes, 1);
    }
    else {
      $scope.lesLikes.push(user.aydee);
    }
  };

  // Incrémentation de +1 sur un utilisateur
  $scope.nbrPlus = [];

  function remplissage() {
    for (user of $scope.utilisateurs) {
      var indexUser = user.aydee;
        if (!$scope.nbrPlus[indexUser]) {
          $scope.nbrPlus[user.aydee] = 0;
        }
    }
  }
  $scope.plusUn = function (userId) {
    $scope.nbrPlus[userId]++;
  };


  // $scope.ajoutCompteur = function (userId) {
  //   $scope.nbrPlus.id = userId;
  //   console.log($scope.nbrPlus);
  // };



  /*
  + Afficher tous ces utilisateurs et leusr informations dans des Collections sous Materialize (http://materializecss.com/collections.html)*/

  /*
  + Afficher le nombre d'utilisateur ainsi que la moyenne d'age des utilisateurs
  + Afficher à coté du nombre utilisateurs le mot "utilisateurs" avec un "s" ou pas selon le nombre d'utilisateur avec la directive "ng-show"*/


  $scope.moyenneAge = function () {
    if ($scope.utilisateurs != undefined) {
      return (_.reduce($scope.utilisateurs, function(memo, num){ return memo + num.age; }, 0)/ $scope.utilisateurs.length).toFixed(0);
    }
  };


  /*
  + Afficher le mots "Il y a que des mineurs" si il y a uniquement que  "ng-show" ou "ng-if" (._every)*/

  //sortBy pour trier le tableau utilisateurs, puis sortedIndex pour trouver renvoyer l'indice du dernier user ayant un age inférieur à 46 ans
  $scope.vieux = function () {
    return _.sortedIndex(_.sortBy($scope.utilisateurs, function(num){ return num.age; }), {age : 46}, 'age');
  };

  /*
  + Créer un bouton "remove" à chaque utilisateur permettant au click de supprimer l'utilisateur*/

  $scope.suppUser = function (user) {
    var indexUser = $scope.utilisateurs.indexOf(user);
    $scope.utilisateurs.splice(indexUser, 1);
    $scope.nbrPlus.splice(indexUser,1);
  };

  /*
  + Afficher, si il n'y a plus "Plus aucun utilisateurs" et cacher la moyenne d'age*/

  //OK => dans l'HTML

  /*
  + Créer des boutons radios Lyon, Paris, Marseille pour filtrer les utilisateurs au click de ces bouttons radios*/

  //OK => dans l'HTML

  /*
  + Créer des checkbox de tranches d'age permettant de filtrer par age les utilisateurs incluant les tranches suivantes: -10, 10-18, 18-30 , 30-45 , + de 45 */


//
//   $scope.myFilterRegex = function(/^(([1]\d)|(20))$/) {
//    return regex.test(user.age);
// };

//
// console.log($scope.utilisateurs);
// console.log(tableau);


  /*
  Bonus: Les checkbox de tranches d'age prendra en compte le 1er filtre sur les boutons radios
  + Créer un Datepicker pour filtrer par date de naissances les utilisateurs à partir de cette date : avec Materializecss http://materializecss.com/forms.html#date-picker*/

  /*
  + Créer un input range pour filtrer selon la note au bac de 1 à 20 avec Materialize http://materializecss.com/forms.html#range*/

  /*
  + Créer un formulaire d'ajout d'utilisateurs avec l'ensemble de ces données (on fera la validation plus tard, vous pouvez prendre de l'avance et voir comment on valide un formulaire sous ANgular ici
  https://openclassrooms.com/courses/validation-de-formulaire-simplifiee-avec-angularjs)*/

  $scope.add = function () {

    $scope.utilisateurs.push({
              nom: $scope.nom,
              prenom: $scope.prenom,
              age: parseInt($scope.age),
              photo: $scope.photo,
              birth: moment($scope.birth).format('DD/MM/YYYY'),
              noteBac: parseInt($scope.noteBac),
              sexe: $scope.sexe,
              ville: $scope.ville,
              biographie: $scope.bio,
              langue: $scope.langue
           });


           $scope.nom =  $scope.sexe = $scope.ville =  $scope.biographie = $scope.prenom = $scope.age = $scope.photo = $scope.birth = $scope.noteBac = "";


           $scope.moyenneAge();
           $scope.concatNP();
           $scope.moisAnnif();
           remplissage();
  };



  /*

  + Bonus: Externaliser les users dans un fichier json et chargé ce fichier en AJAX à l'aide de l'opérateur $http
  +
*/

   // Tuto Moment: http://www.lafermeduweb.net/billet/moment-js-manipuler-les-dates-javascript-simplement-1246.html

//   Lien: http://www.tutoriel-angularjs.fr/tutoriel/2-utilisation-complete-d-angularjs/2-les-filtres*/

   /*
		+ Cacher les cards des users quand il y en a pas et y mettre un petite message en rouge: Aucun utilisateurs trouvé :( (attention aux filtres!!)
    + Ajouter 1 classe css "warning" si l'utilisateur n'a pas eu la moyenne au bac: Directive "ng-class"
    + Créer un filtre qui selon la langue affiche le drapeau du pays pour chaque utilisateurs
		+ Créer un bouton Switch permettant de filtrer les utilisateurs majeurs ou les utilisateurs mineurs
   	+ Créer un moteur de recherche instantanée de recherche de d'utilisateurs sur le nom et le prénom
   	+ Ajouter aux utilisateurs le code postal
    + Ajouter un champ département permùettant de filtrer les utilisateurs par départements
    + AJouter un icon "access_time" a coté de chaque utilisateur si ce mois courant est le mois d'anniversaire de l'utilisateur <i class="material-icons">access_time</i> (utiliser moment)
    + Créer une liste déroulante me permettant de trier par nom, par prénom, par age, par note au bac ou par ville
    + Créer un bouton
    + Créer une notification (Toast) quand un utilisateurs se crée http://materializecss.com/dialogs.html#toast
    + Ajouter pour chaque utilisateur des coordonnées GPS avec longitude et latitude
    +
    */

}]);
