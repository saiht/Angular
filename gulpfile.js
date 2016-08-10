var gulp        = require('gulp');
var browserSync = require('browser-sync');

// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
   // confiurer mon serveur
    browserSync({
        port: 3000, //port de connexion
        server: { // server
            baseDir: "./", //base
            index: "index.html" //fichier a chargé
        }
    });
});

// tache par default
gulp.task('default', ['browser-sync'], function () {
// watch
    gulp.watch(["index.html", "main.js"]).on('change', browserSync.reload);
});
