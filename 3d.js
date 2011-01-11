/*
* Author: Tiffany Conroy
* RE: http://twitter.com/#!/smashingmag/status/14792918153830400
*
* Lots of help from here:
* http://24ways.org/2010/intro-to-css-3d-transforms
* http://9elements.com/html5demos/matrix3d/
* http://www.eleqtriq.com/2010/05/css-3d-matrix-transformations/
* ps: thx fronx :)
*/
(function(){

  var doc = document;
  var d, c, elem, thea, rule;
  var r = 40; // rotation, in degrees
    
  d = 0; // depth
  c = function(e,h) { // calc max DOM depth
    var elems = e.childNodes;
    d = (h > d) ? h : d;
    h++;
    for (var i=0, ii = elems.length; i < ii; i++ ) {
      c(elems[i],h);
    }
  };
  c(document.body,d);
  d = 500/d; // reuse d. now means displacement in pixels
  
  // create and insert a style element
  elem = doc.createElement('style');
  elem.title = 'theophani3D';
  elem.innerHTML = (function(){
    var s; // the styles
    s  = 'body { -webkit-transform: rotateY(40deg) skewY(-10deg) translate3d(0,0,1px); -webkit-transform-style: preserve-3d; } ';
    s += 'body > * { opacity: 0.9; } ';
    s += 'body * { -webkit-transform: translate3d(0,0,'+d+'px); -webkit-transform-style: preserve-3d; } ';
    s += 'body div:hover { opacity: 1; background-color: rgba(255, 255, 0, 0.1) !important; } ';
    s += 'body div:hover * { background-color: none; } ';
    s += '#theophani3D { position: fixed; padding: 20px; left: 50%; top: 400px; width: 600px; margin-left: -321px; } ';
    s += '#theophani3D { opacity: 1; background: #fff !important; border: 1px solid #222; } ';
    s += '#theophani3D { -webkit-transform: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,401,1); z-index: 1000000; } ';
    s += '#theophani3D * {  -webkit-transform: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1); } ';
    s += '#theophani3D span { display: block; line-height: 1.5em; margin: 0; padding: 0; } ';
    s += '#theophani3D span { color: #333 !important; font-size: 18px; text-shadow: none; } ';
    s += '#theophani3D span { font-family: \'Lucida Sans\', \'Lucida Grande\', \'Lucida Sans Unicode\', sans-serif; } ';
    s += '#theophani3D input { width: 100%; } ';    
    return s;
  }());
  doc.body.appendChild(elem);
  
  // create and insert the div containing instructions
  thea = document.createElement('div');
  thea.id = 'theophani3D';
  thea.innerHTML = (function(){
    var s; // the prompt/instructions
    s  = '<span>Use left and right arrows to rotate</span>';
    s += '<span>Use + and - to increase and decrease the distance between layers</span>';
    return s;
  }());
  doc.body.appendChild(thea);

  // create and stores a CSSStyleRule with selector 'body *'
  rule = (function(){
    var r, i = doc.styleSheets.length-1;
    while (doc.styleSheets[i].title != 'theophani3D' && i > -1) { i--; }
    r = doc.styleSheets[i].cssRules.length;
    doc.styleSheets[i].insertRule('body * {}',r);
    return doc.styleSheets[i].cssRules[r].style;
  }());
  
  doc.addEventListener("keydown", function (e){
    // sets the webkitTransform attribute of the style attribute on body
    if(e.keyCode === 37 || e.keyCode === 39) {
      if(e.keyCode === 37  && r > -90) { r = r-1; }
      if(e.keyCode === 39  && r < 90)  { r = r+1; }
      doc.body.style.webkitTransform = "rotateY("+r+"deg) skewY("+ -1 * (r/40)*10 +"deg)";
    }
    // edits the CSSStyleRule. Better than finding & setting each node 
    if(e.keyCode === 187 || e.keyCode === 189) {
      if(e.keyCode === 189 && d > 0)   { d = d-1; }
      if(e.keyCode === 187 && d < 500) { d = d+1; }
      rule.cssText = "-webkit-transform: translate3d(0,0,"+d+"px);";
    }
  });
    
}());