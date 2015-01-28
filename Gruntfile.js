module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['static/dist/js/','static/dist/css/','.tmp'],

        // copy: {
        //     main: {
        //         expand: true,
        //         src: ['static/index.html'],
        //         dest: 'static/dist/'
        //     }
        // },

        useminPrepare: {
            html: 'static/index.html',
            options: {
              root: 'static',
              dest: 'static/dist'
            }
        },

        usemin: {
            html: ['static/dist/index.html']
        },

        // ngmin: {
        //     dist: {
        //         files: [{
        //             expand: true,
        //             cwd: '.tmp/concat/js',
        //             src: '*.js',
        //             dest: '.tmp/concat/js'
        //         }]
        //     }
        // },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
         'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin'
    ]);
};