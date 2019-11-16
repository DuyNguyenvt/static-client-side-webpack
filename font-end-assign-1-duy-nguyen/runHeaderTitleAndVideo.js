// this part is to show the title text of header background image;
document.getElementById('vid').play;
let theTextTile = document.getElementById("header-cent-text");
this.headerTitleTimer = null;
this.runTitleStep = 0;
let textToShow = "GREAT WEB DESIGN <br>WITHOUT FUNCTIONALITY IS<br>LIKE A SPORTS CAR WITH NO ENGINE<br>WEBSITES SHOULD LOOK GOOD FROM THE INSIDE AND OUT.";
let splitedText = textToShow.split("");
let startText = "";
this.headerTitleTimer = setInterval(() => {
  if (this.runTitleStep === splitedText.length) {
    clearInterval(this.headerTitleTimer);
    return;
  }
  startText = startText + splitedText[this.runTitleStep];
  theTextTile.innerHTML = startText;
  this.runTitleStep++;
}, 30);
