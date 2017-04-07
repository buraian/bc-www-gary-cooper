// document.addEventListener( 'DOMContentLoaded', function() {

//   document.body.classList.remove('loading');

//   /**
//    * [els description]
//    * @type {Array}
//    */
//   els = [];
//   nodes = [
//     document.getElementsByTagName('h1'),
//     document.getElementsByTagName('p'),
//     document.getElementsByTagName('li'),
//     document.getElementsByTagName('span'),
//     document.getElementsByTagName('pre'),
//     document.getElementsByTagName('blockquote'),
//     document.getElementsByTagName('i'),
//     document.getElementsByTagName('b')
//   ];

//   for (var i = 0, max = nodes.length; i < max; i++) {

//     for (var x = 0; x < nodes[i].length; x++) {
//       els.push(nodes[i][x]);
//     }
//   }

//   els = shuffle( els );

//   console.log('els', els);

//   var counter = 0;
//   var i = setInterval( function() {
//     phaserIn( els[counter] );
//     phaserOut( els[counter] );

//     counter++;
//     if (counter === els.length) {
//         // clearInterval(i);
//         els = shuffle( els );
//         counter = 0;
//     }
//   }, 1000);

//   function phaserIn( element ) {
//     element.classList.add('phased');
//   }

//   function phaserOut( element ) {
//     window.setTimeout(function() {
//       element.classList.remove('phased');
//     }, 1000);
//   }

//   function shuffle(o) {
//     for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
//     return o;
//   }

// });
