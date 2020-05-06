import * as _ from "lodash";
const IMAGE_GROUPS = {
  ALL: [
    { ind: 1, src: "./assets/images/animation/g1.jpg" },
    { ind: 2, src: "./assets/images/animation/g2.jpg" },
    { ind: 3, src: "./assets/images/animation/g3.jpg" },
    { ind: 4, src: "./assets/images/animation/g4.jpg" },
    { ind: 5, src: "./assets/images/animation/g5.jpg" },
    { ind: 6, src: "./assets/images/animation/g6.jpg" },
    { ind: 7, src: "./assets/images/animation/g7.jpg" },
    { ind: 8, src: "./assets/images/animation/g8.jpg" },
    { ind: 9, src: "./assets/images/animation/g9.jpg" },
    { ind: 10, src: "./assets/images/animation/g10.jpg" },
    { ind: 11, src: "./assets/images/animation/g11.jpg" },
    { ind: 12, src: "./assets/images/animation/g12.jpg" },
  ],
  INTERIOR: [
    { ind: 4, src: "./assets/images/animation/g4.jpg" },
    { ind: 5, src: "./assets/images/animation/g5.jpg" },
    { ind: 6, src: "./assets/images/animation/g6.jpg" },
    { ind: 7, src: "./assets/images/animation/g7.jpg" },
  ],
  TECHNOLOGY: [
    { ind: 4, src: "./assets/images/animation/g4.jpg" },
    { ind: 5, src: "./assets/images/animation/g5.jpg" },
    { ind: 9, src: "./assets/images/animation/g9.jpg" },
    { ind: 10, src: "./assets/images/animation/g10.jpg" },
    { ind: 11, src: "./assets/images/animation/g11.jpg" },
    { ind: 6, src: "./assets/images/animation/g6.jpg" },
    { ind: 7, src: "./assets/images/animation/g7.jpg" },
  ],
  TRAVEL: [
    { ind: 1, src: "./assets/images/animation/g1.jpg" },
    { ind: 5, src: "./assets/images/animation/g5.jpg" },
    { ind: 3, src: "./assets/images/animation/g3.jpg" },
    { ind: 8, src: "./assets/images/animation/g8.jpg" },
    { ind: 9, src: "./assets/images/animation/g9.jpg" },
  ],
  PACKAGE: [
    { ind: 7, src: "./assets/images/animation/g7.jpg" },
    { ind: 4, src: "./assets/images/animation/g4.jpg" },
    { ind: 3, src: "./assets/images/animation/g3.jpg" },
    { ind: 2, src: "./assets/images/animation/g2.jpg" },
    { ind: 10, src: "./assets/images/animation/g10.jpg" },
    { ind: 12, src: "./assets/images/animation/g12.jpg" },
  ],
};

const IMAGE_VIEWS = {
  ALL: "ALL",
  INTERIOR: "INTERIOR",
  TECHNOLOGY: "TECHNOLOGY",
  TRAVEL: "TRAVEL",
  PACKAGE: "PACKAGE",
};

let CURRENT_IMAGE_VIEW = IMAGE_VIEWS.ALL;

class PrallaxTest {
  constructor() {
    this.headerEle = document.getElementsByTagName("header")[0];
    this.headerEleStyle = this.headerEle.style;
    //mobile-hamburger effect
    this.mobileHamburger = document.getElementsByClassName(
      "mobile-menu-btn"
    )[0];
    this.headerMainText = document.getElementsByClassName("hd-center-text")[0];

    // let imageTabBtns = document.getElementsByClassName("sec-2-cont-ctrl-btn");
    this.imageTabBtns = document.querySelectorAll(".sec-2-cont-ctrl-btn");
    this.prevPos = [];
    this.currentPos = [];
    this.moveDistance = [];
    this.ctrlBtn = document.getElementsByClassName("sec-2-cont-ctrl-btn");
    this.imagesContainer = document.getElementsByClassName(
      "sec-2-cont-detail"
    )[0];

    this.CURRENT_IMAGE_VIEW = IMAGE_VIEWS.ALL;
    this.init();
  }

  init() {
    window.addEventListener("scroll", (event) => {
      let scrolledPos = window.scrollY;
      if (scrolledPos < 700) {
        this.headerEleStyle.backgroundPositionY = scrolledPos + "px";
      }
    });

    // add event to image tab btns
    this.imageTabBtns.forEach((thisBtn, idx) => {
      thisBtn.addEventListener("click", (event) => {
        this.handleClickImgControlBar(event.target.innerText, idx);
      });
    });

    IMAGE_GROUPS[CURRENT_IMAGE_VIEW].map((data, index) => {
      let thisImage = document.createElement("IMG");
      thisImage.src = data.src;
      thisImage.className = "sec-2-content-image";
      this.imagesContainer.appendChild(thisImage);
    });

    this.getPos("currentPos", IMAGE_GROUPS[CURRENT_IMAGE_VIEW]);
  }

  getPos(typeOfPos, imagesArray) {
    let allCurrentImages = this.imagesContainer.getElementsByClassName(
      "sec-2-content-image"
    );
    if (typeOfPos === "currentPos") {
      Array.from(allCurrentImages).forEach((each, index) => {
        this.currentPos.push({
          id: imagesArray[index].ind,
          y: each.offsetTop,
          x: each.offsetLeft,
        });
      });
      return;
    }
    if (typeOfPos === "prevPos") {
      Array.from(allCurrentImages).forEach((each, index) => {
        this.prevPos.push({
          id: imagesArray[index].ind,
          y: each.offsetTop,
          x: each.offsetLeft,
        });
      });
      return;
    }
  }

  //! handleClickImgControlBar
  handleClickImgControlBar(tabName, index) {
    Array.from(this.ctrlBtn).forEach((eachBtn) => {
      eachBtn.style.color = "black";
      eachBtn.style.background = "white";
    });
    this.ctrlBtn[index].style.color = "white";
    this.ctrlBtn[index].style.background = "#04b6ff";
    this.CURRENT_IMAGE_VIEW = IMAGE_VIEWS[tabName];
    //NOW IMPLEMENT MOVING EFFECT TO ALL IMAGES
    this.handleGhostMove();
  }
  //!  handleGhostMove
  handleGhostMove() {
    let newImagesArray = IMAGE_GROUPS[this.CURRENT_IMAGE_VIEW];
    //* remove prev images array
    this.imagesContainer.innerHTML = "";
    newImagesArray.map((data, index) => {
      let thisImage = document.createElement("IMG");
      thisImage.src = data.src;
      thisImage.className = "sec-2-content-image";
      this.imagesContainer.appendChild(thisImage);
    });

    // * save old positions
    this.prevPos = [...this.currentPos];
    // * remove all current pos
    this.currentPos = [];
    this.getPos("currentPos", newImagesArray);

    const _prevPos = [...this.prevPos];
    const _moveDistance = [...this.moveDistance];
    this.currentPos.map(function (eachCurrentPos, idx) {
      const thisImageAppeared = _.find(
        _prevPos,
        (onePrevPos) => onePrevPos.id === eachCurrentPos.id
      );
      if (!thisImageAppeared) {
        _moveDistance[idx] = undefined;
        return;
      }
      _moveDistance[idx] = {
        y_dist: eachCurrentPos.y - thisImageAppeared.y,
        x_dist: eachCurrentPos.x - thisImageAppeared.x,
      };
    });
    this.moveDistance = [..._moveDistance];

    // * set it to old positions
    let $allCurrentImageEles = this.imagesContainer.getElementsByClassName(
      "sec-2-content-image"
    );

    // Array.from($allCurrentImageEles).forEach((eachEle, idx) => {
    //   if (this.moveDistance[idx]) {
    //     eachEle.style.transform = `translateY(${this.moveDistance[idx].x_dist}px) translateX(${this.moveDistance[idx].y_dist}px)`;
    //   }
    //   // translateX(${-this.moveDistance[idx].x_dist}px)
    // });
  }

  //! calculateMoveDistance
  calculateMoveDistance(prevPos, currentPos) {
    currentPos.map((thisImage, x) => {
      this.moveDistance[x] = null;
      prevPos.map((thisPrevImage, y) => {
        if (thisPrevImage[0] === thisImage[0]) {
          moveDistance[x] = [
            thisImage[1] - thisPrevImage[1],
            thisImage[2] - thisPrevImage[2],
          ];
        }
      });
    });
  }
}

(function run() {
  const theParallax = new PrallaxTest();
})();

// // CALCULATE THE DISTANCES
// this.calculateMoveDistance(prevPos, currentPos);
// // READY TO MOVE IMAGES
// let allCurrentImages = this.imagesContainer.getElementsByClassName(
//   "sec-2-content-image"
// );
// this.step = 1000;
// let controlBar = document.getElementsByClassName("sec-2-cont-ctrl-bar")[0];
// this.controlBar.style.pointerEvents = "none";
// this.tempTimer = setInterval(() => {
//   Array.from(allCurrentImages).forEach((each, index) => {
//     this.step--;
//     if (moveDistance[index] != null) {
//       each.style.top =
//         -(moveDistance[index][0] * (this.step / 1000)) + "px";
//       each.style.left =
//         -(moveDistance[index][1] * (this.step / 1000)) + "px";
//     } else {
//       each.style.transform = `rotate(${(this.step / 1000) * 90}deg) scale(${
//         (1000 - this.step) / 1000
//       })`;
//     }
//     // console.log(this.step);
//     if (this.step === 0) {
//       clearInterval(this.tempTimer);
//       this.controlBar.style.pointerEvents = "stroke";
//     }
//   });
// }, 1);
