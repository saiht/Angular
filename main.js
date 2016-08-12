/**
 * Déclaration de l'application MyPhonesApp
 */
var MyApp = angular.module('MyApp', []);

// Filtre de regex pour les tranches d'âge
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

// Filtre l'âge en fonction de l'entrée du DatePicker
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

// Filtre les users en fonction de la valeur de la rangebar NoteBac
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

// filtre qui permet d'afficher le sexe des users au lieu des booleans
MyApp.filter('sexe',function(){
  return function(sexe){
      if(sexe === false){
        return "Femme";
      }
      return  "Homme";
   };
});

// filtre mineurs majeurs en fonction de la checkbox switch
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

// filtre qui affiche les drapeau en fonction de la langue des users
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


MyApp.filter('fav', function () {
  return function (tableau, favoris) {
    if ($scope.lesLikes != undefined) {
      return _.intersection(tableau, favoris);
    }
    console.log("indéfini");
  };
});


// Controller START
MyApp.controller('MainCtrl', ['$scope','$http', function($scope, $http) {
  //Création d'ue variable title dans la scope
  $scope.title = "Exo 3 Gestion de contacts";
  $scope.nbrUsers = 0;

  $http.get('https://jsonblob.com/api/57ac253ae4b0dc55a4ec09eb').success(function (response) {
    $scope.utilisateurs = response;
    $scope.concatNP();
    remplissage();
    $scope.nbrUsers = $scope.utilisateurs.length;
  });

  // Création d'un attribut NomPrenom pour faciliter les recherches en input text
  // Pas trop recommandé de modifier le tableau JSON
  $scope.concatNP = function () {
    for (user of $scope.utilisateurs) {
      user.NomPrenom = user.prenom + " " + user.nom;
    }
  };

  /**
   * Ajout utilisateur
   */
  $scope.add = function () {
    $scope.nbrUsers++;

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
      langue: $scope.langue,
      aydee : $scope.nbrUsers
   });

   // Vider les champs du formulaire après click sur bouton de création d'user
   $scope.nom =  $scope.sexe = $scope.ville =  $scope.biographie = $scope.prenom = $scope.age = $scope.photo = $scope.birth = $scope.noteBac = "";

   // Relance les calculs / initialisations
   $scope.moyenneAge();
   $scope.concatNP();
   $scope.moisAnnif();
   remplissage();

  };

  // Récupération des données dans le sessionStorage
  if (typeof sessionStorage != undefined) {
    $scope.save = sessionStorage.getItem('lesLikes');
    $scope.lesLikes = [];

    if (sessionStorage.lesLikes != null) {
      $scope.save = $scope.save.split(",");
      for (nb of $scope.save) {
        nb = parseInt(nb);
        $scope.lesLikes.push(nb);
      }
    }
  }

  // Fonction qui permet d'afficher un cake si le mois d'annif est égal au mois courant
  $scope.moisAnnif = function (user) {
    // console.log(user.birth);
      var mois = parseInt(user.birth.substr(3,2));
      var moisCourant = new Date().getMonth()+1;

      if (mois == moisCourant) {
        return true;
      }
      return false;
  };

/**
 * Like ou Dislike en fonction de l'ID de chaque utilisateurs pour changer le logo favorite ou favorite_border
 */
  // $scope.lesLikes = [];   //Tableau des likes comportant les id des users

  // Fonction permettant d'observer la présence de l'id de user dans le tableau lesLikes
  $scope.estDedans = function (identifiant) {
    $scope.lesLikes = _.uniq($scope.lesLikes);
    if ($scope.lesLikes.indexOf(identifiant) != -1) {
      return true;
    }
    return false;
  };

  // Fonction permettant d'ajouter/retirer l'id de l'user liké
  $scope.addLikeOrRemove = function (user) {
    if (user == undefined) {      //Vérification undefined
      return true;
    }
    if ($scope.estDedans(user.aydee)) {
      var indiceDansLesLikes = $scope.lesLikes.indexOf(user.aydee);
      $scope.lesLikes.splice(indiceDansLesLikes, 1);
    }
    else {
      $scope.lesLikes.push(user.aydee);
    }
    // Stockage
    sessionStorage.setItem("lesLikes", $scope.lesLikes);
  };

  // Incrémentation de +1 sur un utilisateur
  $scope.nbrPlus = [];
  //Fonction remplissage qui initialise nbrPlus de la forme idUser:Compteur par user
  function remplissage() {
    // for (user of $scope.utilisateurs) {
    //   var indexUser = user.aydee;
    //   if (!$scope.nbrPlus[indexUser]) {
    //     $scope.nbrPlus[user.aydee] = 0;
    //   }
    // }
    for (var i = 0; i < $scope.nbrUsers; i++) {
      var indexUser = $scope.utilisateur[i].aydee;
      if (!$scope.nbrPlus[indexUser]) {
        $scope.nbrPlus[$scope.utilisateur[i].aydee] = 0;
      }
    }
  }
  //fonction incrémentation des +1 en fonction des users
  $scope.plusUn = function (userId) {
    if (!$scope.nbrPlus[userId]) {
      $scope.nbrPlus[userId] = 0;
    }
    $scope.nbrPlus[userId]++;
  };

  /**
   * Calcul de la moyenne Age utilisateurs
   */
  $scope.moyenneAge = function () {
    if ($scope.utilisateurs != undefined) {
      return (_.reduce($scope.utilisateurs, function(memo, num){ return memo + num.age; }, 0)/ $scope.utilisateurs.length).toFixed(0);
    }
  };

  //sortBy pour trier le tableau utilisateurs, puis sortedIndex pour trouver renvoyer l'indice du dernier user ayant un age inférieur à 46 ans
  $scope.vieux = function () {
    return _.sortedIndex(_.sortBy($scope.utilisateurs, function(num){ return num.age; }), {age : 46}, 'age');
  };

  /*
  + Créer un bouton "remove" à chaque utilisateur permettant au click de supprimer l'utilisateur
  */
  $scope.suppUser = function (user) {
    var indexUser;
    if ($scope.utilisateurs.indexOf(user) != -1) {

      indexUser = $scope.utilisateurs.indexOf(user);
      $scope.utilisateurs.splice(indexUser, 1);
      $scope.lesLikes.splice(indexUser,1);
    }

    if ($scope.lesLikes.indexOf(user.aydee) != -1) {

      indexUser = $scope.lesLikes.indexOf(user.aydee);
      $scope.lesLikes.splice(indexUser, 1);
    }

    sessionStorage.setItem("lesLikes", $scope.lesLikes);

  };





}]);  // Controller END
