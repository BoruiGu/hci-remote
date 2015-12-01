module.exports = function (grunt) {
    grunt.initConfig({
        autoprefixer: {
            dist: {
                files: {
                    'src/css/prefixed-style.css': 'src/css/style.css'
                }
            }
        },
        watch: {
            styles: {
                files: ['src/css/style.css'],
                tasks: ['autoprefixer'],
				options: {
                    spawn: false
                }
            }
        }		
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
};