browserify -g [envify --NODE_ENV "development"] -t [ babelify --presets [ es2015 react ] ] $1 -o ${1/./_build.}
