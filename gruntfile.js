module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-menu');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-downloadfile');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace-attribute');
    grunt.loadNpmTasks('grunt-comment-toggler');
    grunt.loadNpmTasks('grunt-bump');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: false,
                createTag: false,
                push: false,
                globalReplace: false,
                prereleaseName: false,
                metadata: '',
                regExp: false
            }
        },
        nameProjectFiles: (function() {
            return "web"
        }()),
        nameProject: (function() {
            return "WEB"
        }()),
        dateCompiled: (function() {
            var date = new Date(),
                day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear(),
                hour = date.getHours(),
                mins = date.getMinutes(),
                secs = date.getSeconds();

            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (mins < 10) {
                mins = '0' + mins;
            }
            if (secs < 10) {
                secs = '0' + secs;
            }
            return `${year}${month}${day}${hour}${mins}${secs}`;
        }()),
        nameFile: (function() {
            return "compress_v<%= pkg.version %>.js"
        }()),
        nameFileCss: (function() {
            return "compress_v<%= pkg.version %>.css"
        }()),
        uglify: {
            bundle_and_minify: {
                options: {
                    // mangle: true,
                    compress:true,
                    // beautify:true,
                },
                files: {
                    "dist/<%= nameFile %>": [
                        "paguetodo-utils/i18n.js",
                        "paguetodo-utils/utils.js",
                        "paguetodo-utils/loading.js",
                        "paguetodo.callservices.js",
                        "paguetodo-controllers/navbar.js",
                        "paguetodo-controllers/footer.js",
                        "paguetodo-controllers/home-controller.js",
                        "paguetodo-controllers/pos-controller.js",
                        "paguetodo-controllers/recaudacion-controller.js",
                        "paguetodo-controllers/contact-controller.js",
                        "paguetodo-controllers/preafiliacion-controller.js",
                        "paguetodo-controllers/soluciones-controller.js",
                        "paguetodo-controllers/nosotros-controller.js",
                        "paguetodo-controllers/cobranza-controller.js",
                        "paguetodo-controllers/desarrollo-controller.js",
                        "paguetodo-controllers/consulta-controller.js",
                        "paguetodo-controllers/ticket-controller.js",
                        "paguetodo-controllers/terminos-controller.js",
                        "paguetodo-controllers/politicas-controller.js",
                        "paguetodo-controllers/404-controller.js",
                        "paguetodo.component.js",
                        "paguetodo.routes.js",
                        "paguetodo.module.js",
                        "paguetodo.main.js",
                    ],
                }
            }
        },
        cssmin : {
            target : {
                src : [
                    "styles.css",
                ],
                dest : "dist/<%= nameFileCss %>"
            },
        },
        copy: {
            moveFiles: {
                files : [
                    {
                        expand: true,
                        src: ['index1.js','list.config.js','assets/**','views/**', 'styles/**', 'resources/**'],
                        dest: 'dist/',
                    },
                ]
            },
        },
        replace_attribute: {
            remplaza_js: {
              options: {
                upsert: true,
                replace: {
                  '#principal_js': { src: '<%= nameFile %>' },
                  '#principal_css': { href: '<%= nameFileCss %>' }
                }
              },
              files: {
                  'dist/index.html': 'index.html'
              }
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'zip/<%= nameProject %>_<%= dateCompiled %>.zip',
                    mode: 'zip'
                },
                files: [   
                    {src: ['dist/**']},
                ]
            }
        },
        exec: {
            execute_command: {
              cmd: 'workbox generateSW workbox-config-pre.js'
            },
            execute_command2: {
              cmd: 'workbox injectManifest'
            },
        },
        toggleComments: {
            customOptions: {
                options: {
                    padding: 4,
                    removeCommands: true
                },
                files: {"dist/index.html": "dist/index.html"}
            }
        }
    })
    grunt.registerTask("subir", ["bump"]);
    grunt.registerTask("production_", ["bump", "uglify:bundle_and_minify", "cssmin:target", "copy:moveFiles", "replace_attribute:remplaza_js", "toggleComments"]);
    grunt.registerTask("production", ["bump", "uglify:bundle_and_minify", "cssmin:target", "copy:moveFiles", "replace_attribute:remplaza_js", "toggleComments", "compress:main"]);
}    
