module.exports = function(grunt) {

    var aSources = [
        'source/<%= pkg.name %>.js'
    ];

    // config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            all: ['tests/index.html']
        },
        uglify: {
            build: {
                src: aSources,
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jsdoc: {
            dist: {
                src: aSources,
                options: {
                    destination: 'doc'
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Default task(s).
    grunt.registerTask('default', ['qunit', 'uglify', 'jsdoc']);
};