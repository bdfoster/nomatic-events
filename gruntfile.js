module.exports = function(grunt) {
    var TS_FILES = [
        "src/ts/**/*.ts"
    ];

    grunt.initConfig({
        ts: {
            lib: {
                src: TS_FILES,
                outDir: "build/es6",
                options: {
                    target: 'es6',
                    comments: true,
                    declaration: true,
                    sourceMap: true,
                    additionalFlags: "--moduleResolution node"
                }
            }
        },

        babel: {
            lib: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: "build/es6",
                    src: "**/*.js",
                    dest: "build/es5"
                }]
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "build/es5",
                        src: "**/*.js",
                        dest: "dist/"
                    },
                    {
                        expand: true,
                        cwd: "build/es6",
                        src: "**/*.d.ts",
                        dest: "dist/"
                    }
                ]
            }
        },

        clean: {
            src: [
                "build/"
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('lib', [
        'ts:lib', 'babel:lib'
    ]);

    grunt.registerTask('dist', [
        'lib', 'copy:dist'
    ]);

    grunt.registerTask('default', [
        'dist'
    ]);
};