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
    for (user of input) {
      if (regexAge.test(user.age)) {
        tableau.push(user);
      }
    }
    return tableau;
  };
});

MyApp.filter('filtreAge', function () {
  return function(input, date){
    var tableau = [];
    var indexUser = input.indexOf(user);
    var anneeBirth;
    if (!angular.isDefined(date)) {
      tableau = input;
      return tableau;
    }
    else {
      date = new Date(date).getFullYear();
      // console.log(date);
      for (user of input) {
        anneeBirth = parseInt(user.birth.substr(6,4));
        // console.log(anneeBirth);
        indexUser = input.indexOf(user);
        // console.log(indexUser);
        if (anneeBirth>date) {
          tableau.push(user);
        }
      }
    }
    return tableau;
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
     }
   };
});


MyApp.controller('MainCtrl', ['$scope', function($scope) {
  //Création d'ue variable title dans la scope
  $scope.title = "Exo 3 Gestion de contacts";
  /**
  * Les evenements et directives sous AngularJS
  */
  /*
  *  Application "Carnet d'Adresses"*/


  /*

  + Créer un tableau de 8 utilisateurs avec nom, prénom, age, photo,  date de naissances(dd/mm/YYYY),noteBac (de 1 à 20), sexe(boolean), ville (Paris ou Lyon ou Marseille), biographie, langue(fr,en,it ou es) */
 $scope.utilisateurs = [
    {
      nom : "Dujardin",
      prenom : "Jean",
      age : 45,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Jean_Dujardin_Cannes_2011.jpg/220px-Jean_Dujardin_Cannes_2011.jpg",
      birth : "19/06/1972",
      noteBac : 5,
      sexe : true,
      ville : "Paris",
      bio : "Après une enfance dans les Yvelines à Plaisir et un baccalauréat A3 (philosophie et arts plastiques), Jean Dujardin débute dans la vie active en tant que serrurier dans l'entreprise de son père, Jacques Dujardin.",
      langue : "fr",
      codeP : 75000
    },
    {
      nom : "Eve",
      prenom : "Alice",
      age : 34,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Alice_Eve%2C_Men_in_Black_3%2C_2012_%28crop%29.jpg/260px-Alice_Eve%2C_Men_in_Black_3%2C_2012_%28crop%29.jpg",
      birth : "06/02/1978",
      noteBac : 20,
      sexe : false,
      ville : "Marseille",
      bio : "Alice Eve est née à Londres. Elle est la fille de Trevor Eve et de Sharon Maughan, tous deux acteurs. Elle a deux plus jeunes frères, Jack et George, et a été élevée au Royaume-Uni et à Los Angeles, aux États-Unis. Elle a obtenu son A-level à l’école de Westminster, à Londres. Pendant son année sabbatique, elle a suivi les cours de l’école d’acteurs et d’actrices Beverly Hills Playhouse, puis a étudié l’anglais au St Catherine’s College (en), à l’université d’Oxford. Pendant sa période à Oxford, elle est apparue dans diverses productions étudiantes, dont une adaptation d’Un mari idéal.",
      langue : "en",
      codeP : 13000
    },
    {
      nom : "Clarke",
      prenom : "Emilia",
      age : 30,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Emilia_Clarke_2013_%28Straighten_Colors_2%29.jpg/220px-Emilia_Clarke_2013_%28Straighten_Colors_2%29.jpg",
      birth : "26/10/1986",
      noteBac : 9,
      sexe : false,
      ville : "Lyon",
      bio : "Emilia Clarke a grandi dans le Berkshire. Son père est ingénieur du son dans un théâtre4, sa mère femme d'affaires, et son plus jeune frère étudie la politique. Elle a commencé à jouer à l'âge de 3 ans après avoir vu la comédie musicale Show Boat sur laquelle son père travaillait à l'époque. Elle a étudié à la St Edward's School (2000-2005) et Rye St Antony School (Oxford). Emilia Clarke est diplômée en 2009 du Drama Centre London (en), école de théâtre qu'elle a intégrée à 18 ans.",
      langue : "en",
      codeP : 69000
    },
    {
      nom : "Mendes",
      prenom : "Eva",
      age : 42,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Eva_Mend%C3%A8s_66%C3%A8me_Festival_de_Venise_%28Mostra%29.jpg/260px-Eva_Mend%C3%A8s_66%C3%A8me_Festival_de_Venise_%28Mostra%29.jpg",
      birth : "05/03/1974",
      noteBac : 18,
      sexe : false,
      ville : "Paris",
      bio : "Née à Miami de parents cubains, elle est la plus jeune des quatre enfants (elle a deux sœurs et un frère, Tony), mais également la seule de la fratrie à être née aux États-Unis. Elle a vécu à Los Angeles, dans la banlieue de Glendale, après le divorce de ses parents. Élevée dans la religion catholique, elle aspirait à devenir religieuse. Elle parle couramment espagnol.",
      langue : "es",
      codeP : 75000
    },
    {
      nom : "Dujardin2",
      prenom : "Jean2",
      age : 11,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Jean_Dujardin_Cannes_2011.jpg/220px-Jean_Dujardin_Cannes_2011.jpg",
      birth : "19/06/1978",
      noteBac : 10,
      sexe : true,
      ville : "Marseille",
      bio : "Après une enfance dans les Yvelines à Plaisir et un baccalauréat A3 (philosophie et arts plastiques), Jean Dujardin débute dans la vie active en tant que serrurier dans l'entreprise de son père, Jacques Dujardin.",
      langue : "fr",
      codeP : 13000
    },
    {
      nom : "Merad",
      prenom : "Kad",
      age : 17,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kad-Le_Petit_Nicolas-_Avant_Premi%C3%A8re.jpg/220px-Kad-Le_Petit_Nicolas-_Avant_Premi%C3%A8re.jpg",
      birth : "27/03/1964",
      noteBac : 14,
      sexe : true,
      ville : "Marseille",
      bio : "Né le 27 mars 1964 à Sidi Bel Abbès en Algérie, Kadour Merad est le troisième enfant de Mohamed Merad (père algérien arrivé en France à 16 ans, devenu ouvrier dans une société qui fabriquait des wagons de marchandises près de Saint-Etienne) et de Janine Béguin (mère française berrichonne, coiffeuse puis femme au foyer après la naissance de ses enfants). Kaddour Merad a deux frères, Karim et Reda, et une sœur Yasmina. Il est divorcé d'Emmanuelle Cosso-Mérad, parolière et écrivain, avec qui il vivait depuis 1992. Ensemble, ils ont eu un fils, Khalil, né en 2004. Depuis 2014, il vivrait une relation avec Julia Vignali.",
      langue : "fr",
      codeP : 13000
    },
    {
      nom : "Merad2",
      prenom : "Kad2",
      age : 52,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kad-Le_Petit_Nicolas-_Avant_Premi%C3%A8re.jpg/220px-Kad-Le_Petit_Nicolas-_Avant_Premi%C3%A8re.jpg",
      birth : "27/08/1964",
      noteBac : 14,
      sexe : true,
      ville : "Marseille",
      bio : "Né le 27 mars 1964 à Sidi Bel Abbès en Algérie, Kadour Merad est le troisième enfant de Mohamed Merad (père algérien arrivé en France à 16 ans, devenu ouvrier dans une société qui fabriquait des wagons de marchandises près de Saint-Etienne) et de Janine Béguin (mère française berrichonne, coiffeuse puis femme au foyer après la naissance de ses enfants). Kaddour Merad a deux frères, Karim et Reda, et une sœur Yasmina. Il est divorcé d'Emmanuelle Cosso-Mérad, parolière et écrivain, avec qui il vivait depuis 1992. Ensemble, ils ont eu un fils, Khalil, né en 2004. Depuis 2014, il vivrait une relation avec Julia Vignali.",
      langue : "fr",
      codeP : 13000
    },
    {
      nom : "Mendes2",
      prenom : "Eva2",
      age : 42,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Eva_Mend%C3%A8s_66%C3%A8me_Festival_de_Venise_%28Mostra%29.jpg/260px-Eva_Mend%C3%A8s_66%C3%A8me_Festival_de_Venise_%28Mostra%29.jpg",
      birth : "05/08/1974",
      noteBac : 18,
      sexe : false,
      ville : "Paris",
      bio : "Née à Miami de parents cubains, elle est la plus jeune des quatre enfants (elle a deux sœurs et un frère, Tony), mais également la seule de la fratrie à être née aux États-Unis. Elle a vécu à Los Angeles, dans la banlieue de Glendale, après le divorce de ses parents. Élevée dans la religion catholique, elle aspirait à devenir religieuse. Elle parle couramment espagnol.",
      langue : "es",
      codeP : 75000
    }
  ];

  $scope.concatNP = function () {
    for (user of $scope.utilisateurs) {
      user.NomPrenom = user.prenom + " " + user.nom;
    }
  };
  $scope.concatNP();


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


  /*
  + Afficher tous ces utilisateurs et leusr informations dans des Collections sous Materialize (http://materializecss.com/collections.html)*/

  /*
  + Afficher le nombre d'utilisateur ainsi que la moyenne d'age des utilisateurs
  + Afficher à coté du nombre utilisateurs le mot "utilisateurs" avec un "s" ou pas selon le nombre d'utilisateur avec la directive "ng-show"*/


  $scope.moyenneAge = function () {
    return (_.reduce($scope.utilisateurs, function(memo, num){ return memo + num.age; }, 0)/ $scope.utilisateurs.length).toFixed(0);
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
