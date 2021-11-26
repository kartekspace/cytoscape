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
        attribute:'access project' },
        } ,
        { data: { id: 'j',
        heading:'Network 05',
        user:'bob',
        attribute:'access project' },
        } ,
        { data: { id: '06',
        heading:'Network',
        user:'bob',
        attribute:'access project' },
        } ,{ data: { id: '07',
        heading:'Network',
        user:'bob',
        attribute:'access project' },
        } 
        ,{ data: { id: '08',
        heading:'Network',
        user:'bob',
        attribute:'access project' },
        } 
        ,{ data: { id: '09',
        heading:'Network',
        user:'bob',
        attribute:'access project' },
        } 
        ,
        { data: { id: '10',
        heading:'Network',
        user:'bob',
        attribute:'access project' },
        },
        { data: { id: '11',
        heading:'Network 11',
        user:'bob',
        attribute:'access project' },
        } ,
        { data: { id: '12',
        heading:'Network 12',
        user:'bob',
        attribute:'access project' },
        },

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
        { data: { id: 'q', weight: 2, source: 'f', target: 'j' } },
        { data: { id: 'q06', weight: 2, source: 'f', target: '06' } },
        { data: { id: 'e07', weight: 2, source: 'f', target: '07' } },
        { data: { id: 'r08', weight: 2, source: 'f', target: '08' } },
        { data: { id: 'f09', weight: 2, source: 'f', target: '09' } },
        { data: { id: 'd10', weight: 2, source: 'f', target: '10' } },
        { data: { id: 'd11', weight: 2, source: 'f', target: '11' } },
        { data: { id: 'd12', weight: 2, source: 'f', target: '12' } },
      ]
    },

  layout: {
    name: 'breadthfirst',
    directed: true,
    roots: '#a',
    padding: 10
  },
   // initial viewport state:
   zoom: 1,
   pan: { x: 0, y: 0 },
 
   // interaction options:
   minZoom: 1e-50,
   maxZoom: 1e50,
   zoomingEnabled: true,
   userZoomingEnabled: true,
   panningEnabled: true,
   userPanningEnabled: true,
   boxSelectionEnabled: true,
   selectionType: 'single',
   touchTapThreshold: 8,
   desktopTapThreshold: 4,
   autolock: false,
   autoungrabify: false,
   autounselectify: false,
   multiClickDebounceTime: 250,
 
   // rendering options:
   headless: false,
   styleEnabled: true,
   hideEdgesOnViewport: false,
   textureOnViewport: false,
   motionBlur: false,
   motionBlurOpacity: 0.2,
   wheelSensitivity: 1,
   pixelRatio: 'auto'
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