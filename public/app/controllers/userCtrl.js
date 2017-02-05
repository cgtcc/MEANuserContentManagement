angular.module('userControllers', ['userServices'])


.controller('regCtrl', function($http, $location, $timeout, User) {
   // console.log('testing RegCtrl');


   var app = this;  //utilisation de app, plutot que this ????


   //affiche le formulaire sur chargement de la page
   app.showForm=true;


   this.regUser = function(regData) {
     //  console.log('Form Submitted'); //pour tester 
     
     //affiche l'animation qui indique que la page charge
     app.loading = true;
     

     // si le formulaire est soumis à nouveau suivant une erreur, 
     //alors l'erreur ne réapparaitra pas avec le message de succès.
     app.errorMsg=false; 
     app.successMsg=false; 
     
     //requête à l'api par la méthode POST

/* était anciennement :
    http.post('/api/users', this.regData)
       .then(function(data) 
        {*/
      User.create(app.regData).then(function(data) 
        {
            //tests facultatifs
           console.log(data.data.success);
           console.log(data.data.message);

           if(data.data.success) {

               //cache le formulaire et cache l'animation de chargement de la page.
               app.loading=false;
               app.showForm = false;

               //create success message
               app.successMsg = data.data.message;
               //redirect to home page

              /* ajoute une redirection après 2000 ms suivant l'enregistrement -  ca fait laid un peu :)
               $timeout(function()
               {
               $location.path('/home');
               }, 2000);  //timeout de 2000 Ms
               */

           } else {
               app.loading=false;
               app.showForm = true;

               //create an error message
               app.errorMsg = data.data.message;

           }
       });
   };
});
