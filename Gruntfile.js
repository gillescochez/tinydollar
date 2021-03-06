module.exports = function(grunt) {

    var aSources = [
        'source/<%= pkg.name %>.js'
    ];

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
        },
        copy: {
            main: {
                src: ['source/jsdoc.css'],
                dest: 'doc/styles/jsdoc-default.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['qunit', 'uglify', 'jsdoc', 'copy']);
};