/*jshint camelcase:false */

module.exports = function ( grunt ) {

  // Project configuration
  grunt.initConfig( {
    pkg: grunt.file.readJSON("package.json"),

    // The `clean` task ensures all files are removed from the
    // misc. directories so that no files linger from previous builds.
    clean: {
      options: {force: true},
      dist: [ "dist/" ],
    },

    // The `concat` task copies the source file into the `build/`
    // directory with the compiled banner for release use.
    concat: {
      dist: {
        src: [
          "js/settings.js",
          "js/**/**/*.js"
        ],
        dest: "dist/app.js"
      }
    },

    // The `jshint` task lint all the JavaScript code against
    // best practices.
    // Warnings are here to help us improve code and follow best
    // standards.
    jshint: {
      src: [
        "*.js",
        "js/**/**/*.js"
      ],
      options: {
        force: true,
        jshintrc: ".jshintrc"
      }
    },

    // The `ember_templates` task compiles handlebars templates
    // for ember.js into a js file
    emberTemplates: {
      compile:{
        options: {
          templateName: function(sourceFile){
            return sourceFile.replace(/path\/to\//, "");
          }
        },
        files: {
          "dist/templates.js" : [
            "templates/**/**/*.hbs",
          ],
        }
      }
    },

    ember_handlebars: {
      compile: {
        // options: {
        //   namespace: "MyApp.TEMPLATES"
        // },
        options: {
          processName: function(filename) {
            return filename.replace("templates/", "")
              .replace(".hbs", "");
          }
        },
        files: {
          "dist/templates.js": "templates/**/**/*.hbs"
        }
      }
    },

    watch: {
      scripts: {
        files: ["js/**/**/*.js", "templates/**/**/*.hbs", "*.js"],
        tasks: ["ember_handlebars", "concat", "jshint"],
        options: {
          spawn: false,
        },
      },
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-ember-handlebars");
  grunt.loadNpmTasks("grunt-contrib-watch");
};
