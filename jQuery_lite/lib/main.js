const DOMNodeCollection = require('./dom_node_collection.js');

console.log("OH MAI GAWD IT'S WEBPACK!!!11");

function $l(selector){
  let cssSelector = document.querySelectorAll(selector);
  let selectArray = Array.from(cssSelector);
  return new DOMNodeCollection(selectArray);
}

window.$l = $l;
