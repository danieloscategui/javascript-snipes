var personas = require('./personas.js')
var $ = require('jquery')

require('!style-loader!css-loader!../css/style.css')

$.each(personas, function(key, value){
    $('body').append('<h1>'+ personas[key].name +'</h1>')
})

console.log(personas)