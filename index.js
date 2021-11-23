// Import stylesheets
import './style.css';

import cytoscape from 'cytoscape';

var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: false,
  autounselectify: false,

  style: cytoscape.stylesheet()
    .selector('node')
      .style({
        'content': function( ele ){ 
          return ele.data('heading') + '\n' + ele.data('user') + '\n' +
          ele.data('attribute'); },
        'shape': 'rectangle',
        'width': '300',
        'height': '200',
        'text-wrap': 'wrap',
        'text-halign': 'center',
        'text-valign': 'center',
        'font-size':'30',        
      })
    .selector('edge')
      .style({
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'width': 12,
        'line-color': '#ddd',
        'target-arrow-color': 'black'
      })
    .selector('.highlighted')
      .style({
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      }),

  elements: {
      nodes: [
        { data: {
           id: 'a',
        heading:'Access Cluster',
        user:'bob',
        attribute:'access project'
       } },
        { data: { id: 'b',
        heading:'Account 01',
        user:'bob',
        attribute:'access project'
       } },
        { data: { id: 'c',
        heading:'Group of networks 01',
        user:'bob',
        attribute:'access project' } },
        { data: { id: 'd',
        heading:'Network 01',
        user:'bob',
        attribute:'access project' } },
        { data: { id: 'e',
        heading:'Network 02',
        user:'bob',
        attribute:'access project' } },
        { data: { id: 'f',
        heading:'Group of networks 02',
        user:'bob',
        attribute:'access project' } },
        { data: { id: 'g',
        heading:'Network 03',
        user:'bob',
        attribute:'access project' } },
        { data: { id: 'h',
        heading:'Network 04',
        user:'bob',
        attribute:'access project' } },
        { data: { id: 'i',
        heading:'Account 02',
        user:'bob',
        attribute:'access project' } }
      ],

      edges: [
        { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
        { data: { id: 'ai', weight: 3, source: 'a', target: 'i' } },
        { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
        { data: { id: 'ce', weight: 6, source: 'c', target: 'e' } },
        { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
        { data: { id: 'bf', weight: 2, source: 'b', target: 'f' } },
        { data: { id: 'fg', weight: 2, source: 'f', target: 'g' } },
        { data: { id: 'fh', weight: 2, source: 'f', target: 'h' } },

      ]
    },

  layout: {
    name: 'breadthfirst',
    directed: true,
    roots: '#a',
    padding: 10
  }
});

var bfs = cy.elements().bfs('#a', function(){}, true);

var i = 0;
var highlightNextEle = function(){
  if( i < bfs.path.length ){
    bfs.path[i].addClass('highlighted');

    i++;
    setTimeout(highlightNextEle, 1000);
  }
};
window.addEventListener('resize', function(event){
  cy.center();
});
// kick off first highlight
//highlightNextEle();