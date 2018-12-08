function wit() {
var aP=document.getElementsByTagName('p');
for(var i=0; i<aP.length; i++) {
    if(aP[i].className==='breed') {
        aP[i].className='wbreed';
        }
    }
}
function zwart() {
var aP=document.getElementsByTagName('p');
for(var i=0; i<aP.length; i++) {
    if(aP[i].className==='wbreed') {
        aP[i].className='breed';
        }
    }
}

// Verwijn intro
setInterval(wissel, 280000)
function wissel()
{	 var introdiv = document.getElementById('introdiv');
	 if(introdiv.style.sisplay == 'block')
	 {introdiv.style.display = 'block'}
	 else{introdiv.style.display = 'none';}
}

// Achtergrond
function bgzwart()
{document.getElementById('bg').style.backgroundColor='#000000'; document.getElementById('introdiv').style.backgroundColor='#000000'; document.body.bgColor='#000000';}
function bgdonker()
{document.getElementById('bg').style.backgroundColor='#191919';document.getElementById('introdiv').style.backgroundColor='#191919';  document.body.bgColor='#191919';}
function bggrijst()
{document.getElementById('bg').style.backgroundColor='#323232';document.getElementById('introdiv').style.backgroundColor='#323232';  document.body.bgColor='#323232';}
function bggrijzer()
{document.getElementById('bg').style.backgroundColor='#454545';document.getElementById('introdiv').style.backgroundColor='#454545';  document.body.bgColor='#454545';}
function bggrijs()
{document.getElementById('bg').style.backgroundColor='#757575';document.getElementById('introdiv').style.backgroundColor='#757575';  document.body.bgColor='#757575';}
function bgwit()
{document.getElementById('bg').style.backgroundColor='#ffffff';document.getElementById('introdiv').style.backgroundColor='#ffffff'; document.body.bgColor='#ffffff';}

// Scroller
var scroller  = null;
var scrollbar = null;
var scrollTween = null;
window.onload = function () {
	scroller  = new jsScroller(document.getElementById("News"), 400, 180);
	scrollbar = new jsScrollbar (document.getElementById("Scrollbar-Container"), scroller, true, scrollbarEvent);
	scrollTween = new jsScrollerTween (scrollbar, true);
}
function swapSteps (w) {
	scrollTween.steps = w;
}
function scrollbarEvent (o, type) {
	if (type == "mousedown") {
		if (o.className == "Scrollbar-Track") o.style.backgroundColor = "#E3E3E3";
		else o.style.backgroundColor = "";
	} else {
		if (o.className == "Scrollbar-Track") o.style.backgroundColor = "";
		else o.style.backgroundColor = "";
	}
}
function swapIt(o) {
	o.blur();
	if (o.className == "current") return false;
  
	var list = document.getElementById("Navigation").getElementsByTagName("a");
	for (var i = 0; i < list.length; i++) {
		if (list[i].className == "current") {
			list[i].className = "";
			document.getElementById(list[i].title).y = -scroller._y;
		}
		if (list[i].title == o.title) o.className = "current";
	}
  	list = document.getElementById("Container").childNodes;
	for (var i = 0; i < list.length; i++) {
		if (list[i].tagName == "DIV") list[i].style.display = "none";
	}
  	var top = document.getElementById(o.title);
	top.style.display = "block";
	scrollbar.swapContent(top);
	if (top.y) scrollbar.scrollTo(0, top.y);
  	return false;
}



function emailMe() { window.location = oKJcvyakb698W85gLGk61RKE3() + qc5LhyKk9XS() + P355B4yL274J79() + I244876MLJdU4i066kk1() + g69ASet5i2Ub199WK18W() + vcF7LSg5() + D1n73280WcPY6mqvpGD() + py9w() + d33Cg() + DA8ROayU5u2T2() + nt9TOkr71Nqwo816p40(); }
function g58336JyPaMoMHFL7E25N() {return eval("if (true) 'ma';")}
function Cn6Xl() {return unescape("i");}
function oKJcvyakb698W85gLGk61RKE3() { return g58336JyPaMoMHFL7E25N() + Cn6Xl();}
function P7F8I18kTPL1p2194w2() {return unescape("lto");}
function tV3() {return ":";}
function qc5LhyKk9XS() { return P7F8I18kTPL1p2194w2() + tV3();}
function R3() {return "m";}
function oTz288e2() {return eval("if (true) 'e';")}
function P355B4yL274J79() { return R3() + oTz288e2();}
function s4G6u69VZ0DhF41qr581Lc51t() {return eval("if (true) 'i';")}
function f614D6vMDr() {return eval("if (true) 'je';")}
function I244876MLJdU4i066kk1() { return s4G6u69VZ0DhF41qr581Lc51t() + f614D6vMDr();}
function XNfJK2r78wlV488W8dFp6() {return unescape("r");}
function CCq59232U2el38mn2i8jE59() {return "3";}
function g69ASet5i2Ub199WK18W() { return XNfJK2r78wlV488W8dFp6() + CCq59232U2el38mn2i8jE59();}
function M73FQ1S() {return eval("if (true) '@';")}
function t5X33e6rsP() {return "";}
function vcF7LSg5() { return M73FQ1S() + t5X33e6rsP();}
function h70eJ10446cPj27() {return unescape("gma");}
function FU35krWR() {return eval("if (true) 'i';")}
function D1n73280WcPY6mqvpGD() { return h70eJ10446cPj27() + FU35krWR();}
function py9w() {return "";}
function d33Cg() {return "l.c";}
function DA8ROayU5u2T2() {return "";}
function nt9TOkr71Nqwo816p40() {return eval("if (true) 'om';")}