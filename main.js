/**
 * Déclaration de l'application MyPhonesApp
 */
var MyApp = angular.module('MyApp', []);

/**
 * Controller MainCtrl qui fera appel au premier module d'Angular, qui est la scope
 * La scope est un objet entre le html et le javascript pour contrôler la DOM
 * Un contrôleur requiert à 99% la scope
 */

MyApp.controller('MainCtrl', ['$scope', function($scope) {
  //Création d'ue variable title dans la scope
  $scope.title = "Exo 3 Gestion de contacts";
  /**
  * Les evenements et directives sous AngularJS
  */

  /*
  *  Application "Carnet d'Adresses"

  + Créer un tableau de 8 utilisateurs avec nom, prénom, age, photo,  date de naissances(dd/mm/YYYY),noteBac (de 1 à 20), sexe(boolean), ville (Paris ou Lyon ou Marseille), biographie, langue(fr,en,it ou es) */
  var utilisateurs = $scope.utilisateurs = [
    {
      nom : "Dujardin",
      prenom : "Jean",
      age : 45,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Jean_Dujardin_Cannes_2011.jpg/220px-Jean_Dujardin_Cannes_2011.jpg",
      birth : "19/06/1972",
      noteBac : 10,
      sexe : true,
      ville : "Paris",
      bio : "Après une enfance dans les Yvelines à Plaisir et un baccalauréat A3 (philosophie et arts plastiques), Jean Dujardin débute dans la vie active en tant que serrurier dans l'entreprise de son père, Jacques Dujardin.",
      langue : "fr"
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
      langue : "en"
    },
    {
      nom : "Clarke",
      prenom : "Emilia",
      age : 30,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Emilia_Clarke_2013_%28Straighten_Colors_2%29.jpg/220px-Emilia_Clarke_2013_%28Straighten_Colors_2%29.jpg",
      birth : "26/10/1986",
      noteBac : 10,
      sexe : false,
      ville : "Lyon",
      bio : "Emilia Clarke a grandi dans le Berkshire. Son père est ingénieur du son dans un théâtre4, sa mère femme d'affaires, et son plus jeune frère étudie la politique. Elle a commencé à jouer à l'âge de 3 ans après avoir vu la comédie musicale Show Boat sur laquelle son père travaillait à l'époque. Elle a étudié à la St Edward's School (2000-2005) et Rye St Antony School (Oxford). Emilia Clarke est diplômée en 2009 du Drama Centre London (en), école de théâtre qu'elle a intégrée à 18 ans.",
      langue : "en"
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
      langue : "es"
    },
    {
      nom : "Dujardin2",
      prenom : "Jean2",
      age : 45,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Jean_Dujardin_Cannes_2011.jpg/220px-Jean_Dujardin_Cannes_2011.jpg",
      birth : "19/06/1978",
      noteBac : 10,
      sexe : true,
      ville : "Marseille",
      bio : "Après une enfance dans les Yvelines à Plaisir et un baccalauréat A3 (philosophie et arts plastiques), Jean Dujardin débute dans la vie active en tant que serrurier dans l'entreprise de son père, Jacques Dujardin.",
      langue : "fr"
    },
    {
      nom : "Merad",
      prenom : "Kad",
      age : 52,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kad-Le_Petit_Nicolas-_Avant_Premi%C3%A8re.jpg/220px-Kad-Le_Petit_Nicolas-_Avant_Premi%C3%A8re.jpg",
      birth : "27/03/1964",
      noteBac : 14,
      sexe : true,
      ville : "Marseille",
      bio : "Né le 27 mars 1964 à Sidi Bel Abbès en Algérie, Kadour Merad est le troisième enfant de Mohamed Merad (père algérien arrivé en France à 16 ans, devenu ouvrier dans une société qui fabriquait des wagons de marchandises près de Saint-Etienne) et de Janine Béguin (mère française berrichonne, coiffeuse puis femme au foyer après la naissance de ses enfants). Kaddour Merad a deux frères, Karim et Reda, et une sœur Yasmina. Il est divorcé d'Emmanuelle Cosso-Mérad, parolière et écrivain, avec qui il vivait depuis 1992. Ensemble, ils ont eu un fils, Khalil, né en 2004. Depuis 2014, il vivrait une relation avec Julia Vignali.",
      langue : "fr"
    },
    {
      nom : "Merad2",
      prenom : "Kad2",
      age : 52,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kad-Le_Petit_Nicolas-_Avant_Premi%C3%A8re.jpg/220px-Kad-Le_Petit_Nicolas-_Avant_Premi%C3%A8re.jpg",
      birth : "27/03/1964",
      noteBac : 14,
      sexe : true,
      ville : "Marseille",
      bio : "Né le 27 mars 1964 à Sidi Bel Abbès en Algérie, Kadour Merad est le troisième enfant de Mohamed Merad (père algérien arrivé en France à 16 ans, devenu ouvrier dans une société qui fabriquait des wagons de marchandises près de Saint-Etienne) et de Janine Béguin (mère française berrichonne, coiffeuse puis femme au foyer après la naissance de ses enfants). Kaddour Merad a deux frères, Karim et Reda, et une sœur Yasmina. Il est divorcé d'Emmanuelle Cosso-Mérad, parolière et écrivain, avec qui il vivait depuis 1992. Ensemble, ils ont eu un fils, Khalil, né en 2004. Depuis 2014, il vivrait une relation avec Julia Vignali.",
      langue : "fr"
    },
    {
      nom : "Mendes2",
      prenom : "Eva2",
      age : 42,
      photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Eva_Mend%C3%A8s_66%C3%A8me_Festival_de_Venise_%28Mostra%29.jpg/260px-Eva_Mend%C3%A8s_66%C3%A8me_Festival_de_Venise_%28Mostra%29.jpg",
      birth : "05/03/1974",
      noteBac : 18,
      sexe : false,
      ville : "Paris",
      bio : "Née à Miami de parents cubains, elle est la plus jeune des quatre enfants (elle a deux sœurs et un frère, Tony), mais également la seule de la fratrie à être née aux États-Unis. Elle a vécu à Los Angeles, dans la banlieue de Glendale, après le divorce de ses parents. Élevée dans la religion catholique, elle aspirait à devenir religieuse. Elle parle couramment espagnol.",
      langue : "es"
    }
  ];
  /*
  + Afficher tous ces utilisateurs et leusr informations dans des Collections sous Materialize (http://materializecss.com/collections.html)*/

  /*
  + Afficher le nombre d'utilisateur ainsi que la moyenne d'age des utilisateurs
  + Afficher à coté du nombre utilisateurs le mot "utilisateurs" avec un "s" ou pas selon le nombre d'utilisateur avec la directive "ng-show"*/

  $scope.moyenneAge = (_.reduce(utilisateurs, function(memo, num){ return memo + num.age; }, 0)/utilisateurs.length).toFixed(0);

  /*
  + Afficher le mots "Il y a que des mineurs" si il y a uniquement que  "ng-show" ou "ng-if" (._every)*/

  //sortBy pour trier le tableau utilisateurs, puis sortedIndex pour trouver renvoyer l'indice du dernier user ayant un age inférieur à 46 ans
  var vieux = $scope.vieux = _.sortedIndex(_.sortBy(utilisateurs, function(num){ return num.age; }), {age : 46}, 'age');

  /*
  + Créer un bouton "remove" à chaque utilisateur permettant au click de supprimer l'utilisateur*/



  /*
  + Afficher, si il n'y a plus "Plus aucun utilisateurs" et cacher la moyenne d'age
  + Créer des boutons radios Lyon, Paris, Marseille pour filtrer les utilisateurs au click de ces bouttons radios
  + Créer des checkbox de tranches d'age permettant de filtrer par age les utilisateurs incluant les tranches de prix suivantes: -10, 10-18, 18-30 , 30-45 , + de 45
  Bonus: Les checkbox de tranches d'age prendra en compte le 1ere filtre sur les boutons radios
  + Créer un Datepicker pour filtrer par date de naissances les utilisateurs à partir de cette date : avec Materializecss http://materializecss.com/forms.html#date-picker
  + Créer un input range pour filtrer selon la note au bac de 1 à 20 avec Materialize http://materializecss.com/forms.html#range
  + Créer un formulaire d'ajout d'utilisateurs avec l'ensemble de ces données (on fera la validation plus tard, vous piuvez prendre de l'avance et voir comment on valide un formulaire sous ANgular ici https://openclassrooms.com/courses/validation-de-formulaire-simplifiee-avec-angularjs)
  + Bonus: Externaliser les users dans un fichier json et chargé ce fichier en AJAX à l'aide de l'opérateur $http
  +
  */



}]);
