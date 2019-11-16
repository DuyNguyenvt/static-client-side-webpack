let headerEle = document.getElementsByTagName("header")[0];
let headerEleStyle = headerEle.style;
//mobile-hamburger effect
let mobileHamburger = document.getElementsByClassName("mobile-menu-btn")[0];
let headerMainText = document.getElementsByClassName("hd-center-text")[0];

window.addEventListener("scroll", event => {
  let scrolledPos = window.scrollY;
  if (scrolledPos < 700) {
    headerEleStyle.backgroundPositionY = scrolledPos + "px";
  }
});

// hamburger ==> hide text effect
mobileHamburger.addEventListener("click", event => {
  headerMainText.classList.toggle("hd-center-text--hide");
});

// ANIMATION FOR IMAGES  OF  (ALL, INTERIOR, TECHNOLOGY, TRAVEL, PACKAGE)

let prevPos = [];
let currentPos = [];
let moveDistance = [];
let ctrlBtn = document.getElementsByClassName("sec-2-cont-ctrl-btn");
let imagesContainer = document.getElementsByClassName("sec-2-cont-detail")[0];

let IMAGE_VIEWS = {
  CURRENT: "ALL", // INIT CURRENT IMAGE VIEW
  ALL: "ALL",
  INTERIOR: "INTERIOR",
  TECHNOLOGY: "TECHNOLOGY",
  TRAVEL: "TRAVEL",
  PACKAGE: "PACKAGE"
};
let IMAGE_GROUPS = {
  ALL: [
    { ind: 1, src: "./images/animation/g1.jpg" },
    { ind: 2, src: "./images/animation/g2.jpg" },
    { ind: 3, src: "./images/animation/g3.jpg" },
    { ind: 4, src: "./images/animation/g4.jpg" },
    { ind: 5, src: "./images/animation/g5.jpg" },
    { ind: 6, src: "./images/animation/g6.jpg" },
    { ind: 7, src: "./images/animation/g7.jpg" },
    { ind: 8, src: "./images/animation/g8.jpg" },
    { ind: 9, src: "./images/animation/g9.jpg" },
    { ind: 10, src: "./images/animation/g10.jpg" },
    { ind: 11, src: "./images/animation/g11.jpg" },
    { ind: 12, src: "./images/animation/g12.jpg" }
  ],
  INTERIOR: [
    { ind: 4, src: "./images/animation/g4.jpg" },
    { ind: 5, src: "./images/animation/g5.jpg" },
    { ind: 6, src: "./images/animation/g6.jpg" },
    { ind: 7, src: "./images/animation/g7.jpg" }
  ],
  TECHNOLOGY: [
    { ind: 4, src: "./images/animation/g4.jpg" },
    { ind: 5, src: "./images/animation/g5.jpg" },
    { ind: 9, src: "./images/animation/g9.jpg" },
    { ind: 10, src: "./images/animation/g10.jpg" },
    { ind: 11, src: "./images/animation/g11.jpg" },
    { ind: 6, src: "./images/animation/g6.jpg" },
    { ind: 7, src: "./images/animation/g7.jpg" }
  ],
  TRAVEL: [
    { ind: 1, src: "./images/animation/g1.jpg" },
    { ind: 5, src: "./images/animation/g5.jpg" },
    { ind: 3, src: "./images/animation/g3.jpg" },
    { ind: 8, src: "./images/animation/g8.jpg" },
    { ind: 9, src: "./images/animation/g9.jpg" }
  ],
  PACKAGE: [
    { ind: 7, src: "./images/animation/g7.jpg" },
    { ind: 4, src: "./images/animation/g4.jpg" },
    { ind: 3, src: "./images/animation/g3.jpg" },
    { ind: 2, src: "./images/animation/g2.jpg" },
    { ind: 10, src: "./images/animation/g10.jpg" },
    { ind: 12, src: "./images/animation/g12.jpg" }
  ]
};

// INIT IMAGES VIEW FIRST TIME DOC LOAD AND GET THEIR POSITIONS
(function initImageView() {
  let groupImages = IMAGE_GROUPS[IMAGE_VIEWS.CURRENT];
  // call a promise
  let myPromise = new Promise(resolve => {
    groupImages.map((data, index) => {
      let thisImage = document.createElement("IMG");
      thisImage.src = data.src;
      thisImage.className = "sec-2-content-image";
      imagesContainer.appendChild(thisImage);
    });
    resolve("finish");
  }).then(confirmed => {
    setTimeout(() => {
      // SAVE IMAGES POSITION
      let allCurrentImages = imagesContainer.getElementsByClassName(
        "sec-2-content-image"
      );
      Array.from(allCurrentImages).forEach((each, index) => {
        currentPos.push([
          groupImages[index].ind,
          each.offsetTop,
          each.offsetLeft
        ]);
      });
      console.log(currentPos);
    }, 1000);
  });
})();


// HANDLE CLICK TO CHANGE CATEGORY OF IMAGES
function handleClickImgControlBar(inputText, index) {
  // CHNAGE CURRENT IMAGE VIEW TO NEW VIEW
  IMAGE_VIEWS.CURRENT = inputText;
  Array.from(ctrlBtn).forEach(eachBtn => {
    eachBtn.style.color = "black";
    eachBtn.style.background = "white";
  });
  ctrlBtn[index].style.color = "white";
  ctrlBtn[index].style.background = "#04b6ff";
  //NOW IMPLEMENT MOVING EFFECT TO ALL IMAGES
  handleGhostMove(inputText);
}

function handleGhostMove(inputText) {
  imagesContainer.innerHTML = "";
  let groupImages = IMAGE_GROUPS[IMAGE_VIEWS.CURRENT];
  groupImages.map((data, index) => {
    let thisImage = document.createElement("IMG");
    thisImage.src = data.src;
    thisImage.className = "sec-2-content-image";
    imagesContainer.appendChild(thisImage);
  });
  //GET POSITION OF NEWS IMAGES
  updateNewImagesPos(groupImages);

  // CALCULATE THE DISTANCES
  calculateMoveDistance(prevPos, currentPos);
  // READY TO MOVE IMAGES
  let allCurrentImages = imagesContainer.getElementsByClassName("sec-2-content-image");
  this.step = 1000;
  let controlBar = document.getElementsByClassName("sec-2-cont-ctrl-bar")[0];
  controlBar.style.pointerEvents = "none";
  this.tempTimer = setInterval(() => {
    Array.from(allCurrentImages).forEach((each, index) => {
      this.step--;
      if (moveDistance[index] != null) {
        each.style.top =
          -(moveDistance[index][0] * (this.step / 1000)) + "px";
        each.style.left =
          -(moveDistance[index][1] * (this.step / 1000)) + "px";
      } else {
        each.style.transform =
          `rotate(${(this.step / 1000) * 90}deg) scale(${(1000 - this.step) / 1000})`;
      }
      // console.log(this.step);
      if (this.step === 0) {
        clearInterval(this.tempTimer);
        controlBar.style.pointerEvents = "stroke";
      }
    });
  }, 1);
}
function updateNewImagesPos(groupImages) {

  prevPos = currentPos;
  currentPos = [];
  let allCurrentImages = imagesContainer.getElementsByClassName(
    "sec-2-content-image"
  );
  Array.from(allCurrentImages).forEach((each, index) => {
    currentPos.push([
      groupImages[index].ind,
      each.offsetTop,
      each.offsetLeft
    ]);
  });

}
function calculateMoveDistance(prevPos, currentPos) {
  currentPos.map((thisImage, x) => {
    moveDistance[x] = null;
    prevPos.map((thisPrevImage, y) => {
      if (thisPrevImage[0] === thisImage[0]) {
        moveDistance[x] = [
          thisImage[1] - thisPrevImage[1],
          thisImage[2] - thisPrevImage[2]
        ];
      }
    });
  });
  // console.log(moveDistance);
}