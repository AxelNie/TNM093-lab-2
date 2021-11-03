/**
  Computer exercise for TNM093
  Course responsible: Alexander Bock
  Created by: Kahin Akram
  August 2020
 */

var height = $('div.pc-container').height() - 20 - 20;
var width  = $('div.pc-container').width() - 20 - 20;

var dimensions = [
  /*{
    name:"Region",
    scale: d3.scalePoint().range([0,width]), // add .rangePoints([0,height]) later
    type: String
  },*/
  {
    name:"Inkomst",
    scale: d3.scaleLinear().range([height,0]), // add .range([0,height]) later
    type: Number
  },
  {
    name:"Skattesats",
    scale: d3.scaleLinear().range([height,0]), // add .range([0,height]) later
    type: Number
  },
  {
    name:"H. studerande",
    scale: d3.scaleLinear().range([height,0]), // add .range([0,height]) later
    type: Number
  },
  {
    name:"Medelålder",
    scale: d3.scaleLinear().range([height,0]), // add .range([0,height]) later
    type: Number
  },
  {
    name:"Lgh i flerbostadshus",
    scale: d3.scaleLinear().range([height,0]), // add .range([0,height]) later
    type: Number
  },
  {
    name:"Inflyttade",
    scale: d3.scaleLinear().range([height,0]), // add .range([0,height]) later
    type: Number
  },
  {
    name:"Utflyttade",
    scale: d3.scaleLinear().range([height,0]), // add .range([0,height]) later
    type: Number
  },
  {
    name:"Folkmängd",
    scale: d3.scaleLinear().range([height,0]), // add .range([0,height]) later
    type: Number
  }
];
