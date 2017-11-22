module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
      src: [
        "controllers/**/*.js",
        "lib/**/*.js",
        "models/**/*.js",
        "templates/**/*.js",
        "tests/**/*.js",
        "app.js",
        "settings.js"
      ],
      options: {
        force: true,
        jshintrc: ".jshintrc"
      }
    },
    watch: {
      scripts: {
        files: [
          "controllers/**/*.js",
          "lib/**/*.js",
          "models/**/*.js",
          "templates/**/*.js",
          "tests/**/*.js",
          "app.js",
          "settings.js"
        ],
        tasks: ["jshint"],
        options: {
          spawn: false,
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-contrib-watch");
};