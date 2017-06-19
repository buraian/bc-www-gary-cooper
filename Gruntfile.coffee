module.exports = (grunt) ->
    'use strict'

    require('load-grunt-tasks') grunt
    require('time-grunt') grunt
    modernizrConfig = require('./node_modules/modernizr/lib/config-all.json')
    modernizrTests = modernizrConfig['feature-detects']

    # Project configuration
    grunt.initConfig

        # Metadata
        pkg: grunt.file.readJSON 'package.json'
        name: 'brian-clark-www'
        banner:
            """
            /*! <%= name %> - v<%= pkg.version %>
             * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %> <<%= pkg.author.url %>> */


            """

        # Paths
        assets: 'src/assets'
        public: 'public'

        concat:
            options:
                banner: '<%= banner %>'
            dist:
                src: [
                    'node_modules/isotope-layout/dist/isotope.pkgd.js'
                    '<%= public %>/javascripts/modernizr-output.js'
                    'node_modules/photoswipe/dist/photoswipe.js'
                    'node_modules/photoswipe/dist/photoswipe-ui-default.js'
                    '<%= assets %>/**/*.js'
                ]
                dest: '<%= public %>/javascripts/main.js'
                nonull: true

        concurrent:
            default:
                tasks: ['build', 'watch']
                options:
                    logConcurrentOutput: true

        copy:
            fonts:
                files: [
                    expand: true
                    cwd: 'node_modules/font-awesome/fonts'
                    src: ['**/*.{woff,woff2,tff,eot,svg,otf}']
                    dest: '<%= public %>/fonts'
                ]
            photoSwipe:
                files: [
                    expand: true
                    cwd: 'node_modules/photoswipe/dist/default-skin'
                    src: ['**/*.{gif,png,svg}']
                    dest: '<%= public %>/stylesheets'
                ]

        cssmin:
            dist:
                options:
                    keepSpecialComments: false
                    rebaseTo: '<%= public %>/stylesheets'
                    shorthandCompacting: false
                    sourceMap: false
                files: [
                    expand: true
                    cwd: '<%= public %>/stylesheets'
                    src: ['*.css', '!*.min.css']
                    dest: '<%= public %>/stylesheets'
                    ext: '.min.css'
                ]

        modernizr:
            dist:
                customTests: []
                dest: '<%= public %>/javascripts/modernizr-output.js'
                devFile: false
                options: [
                    'setClasses'
                ]
                parseFiles: true
                uglify: true
                tests: modernizrTests
                excludeTests: []
                crawl: false
                useBuffers: false
                files:
                    src: ['/node_modules/modernizr/lib/config-all.json']
                customTests: []

        nodemon:
            dev:
                script: './bin/www'

        postcss:
            options:
                map: true
                processors: [
                    require('autoprefixer')(browsers: [
                        '> 1%'
                        'Chrome > 0'
                        'Explorer >= 8'
                        'Firefox >= 4'
                        'iOS >= 6'
                        'Opera >= 12'
                        'Safari > 0'
                    ])
                ]
            dist:
                src: '<%= public %>/stylesheets/**/*.css'

        sass:
            options:
                outFile: '<%= public %>/stylesheets/'
                outputStyle: 'expanded'
                sourceMap: false
            dist:
                files: [
                    expand: true
                    cwd: '<%= assets %>/stylesheets'
                    src: ['**/*.{sass,scss}']
                    dest: '<%= public %>/stylesheets/'
                    ext: '.css'
                    extDot: 'last'
                ]

        uglify:
            options:
                banner: '<%= banner %>'
            dist:
                src: ['<%= public %>/javascripts/main.js']
                dest: '<%= public %>/javascripts/main.min.js'

        watch:
            gruntfile:
                files: ['Gruntfile.{coffee,js}']
                tasks: ['default']

            scripts:
                files: ['<%= assets %>/**/*.js']
                tasks: ['scripts']
                options:
                    livereload: true

            styles:
                files: ['<%= assets %>/**/*.{sass,scss}']
                tasks: ['styles']
                options:
                    livereload: true

    # Default task
    grunt.registerTask 'default', [
        'concurrent:default'
    ]

    # Build task
    grunt.registerTask 'build', [
        'copy'
        'styles'
        'scripts'
        'nodemon'
    ]

    # Scripts
    grunt.registerTask 'scripts', [
        'modernizr'
        'concat'
        'uglify'
    ]

    # Styles
    grunt.registerTask 'styles', [
        'sass'
        'postcss'
        'cssmin'
    ]
