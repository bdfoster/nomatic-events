module.exports = function(grunt) {
    grunt.initConfig({
        clean: ['dist/'],
        browserify: {
            'dist/js/nomatic-events.js': [
                'EventEmitter.js',
                'EventListener.js'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['clean', 'browserify']);
};