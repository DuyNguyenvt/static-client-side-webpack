// class StaticScrollCount {
//   construtor() {
//     this.scrolledPos = null;
//     this.bottomScollPos = null;
//     this.staticSection = document.getElementsByClassName("static-container")[0];
//     this.allStaticItem = document.getElementsByClassName("static-num");
//     this.staticValues = [145, 165, 563, 1045];
//     this.isStatRunning = false;
//   }

//   handleChangeStatNum(step, statTimer, allItems, staticValues) {
//     step === 0
//       ? window.clearInterval(statTimer)
//       : Array.from(allItems).forEach(
//           (each, index) =>
//             (each.innerHTML = Math.round(
//               (staticValues[index] / 100) * (100 - step)
//             ).toString())
//         );
//   }

//   handleScrollCountStatics() {
//     window.addEventListener("scroll", () => {
//       this.scrolledPos = window.scrollY;
//       this.bottomScollPos = this.scrolledPos + screen.height;
//       if (this.isStatRunning === true) {
//         if (this.bottomScollPos < this.staticSection.offsetTop) {
//           this.isStatRunning = false;
//           Array.from(allStaticItem).forEach(
//             (each, index) => (each.innerHTML = "0")
//           );
//         }
//       }
//       if (this.isStatRunning === false) {
//         // TO THE POINT WHERE WE SHOULD LET STATS RUN
//         if (
//           this.bottomScollPos >
//           this.staticSection.offsetTop + this.staticSection.clientHeight / 2
//         ) {
//           this.isStatRunning = true;
//           this.statTimer = null;
//           this.step = 100;
//           // CREATE TIMER TO LET ALL STATS COUNT
//           this.statTimer = window.setInterval(() => {
//             this.step--;
//             handleChangeStatNum(
//               this.step,
//               this.statTimer,
//               this.allStaticItem,
//               this.staticValues
//             );
//           }, 10);
//         }
//       }
//     });
//   }
// }

// export default StaticScrollCount;

let scrolledPos = null;
let bottomScollPos = null;
let staticSection = document.getElementsByClassName("static-container")[0];
let allStaticItem = document.getElementsByClassName("static-num");
let staticValues = [145, 165, 563, 1045];

let isStatRunning = false;

// EVENT SCROLLING DETECTOR
window.addEventListener("scroll", () => {
  scrolledPos = window.scrollY;
  bottomScollPos = scrolledPos + screen.height;
  if (isStatRunning === true) {
    if (bottomScollPos < staticSection.offsetTop) {
      isStatRunning = false;
      Array.from(allStaticItem).forEach(
        (each, index) => (each.innerHTML = "0")
      );
    }
  }
  if (isStatRunning === false) {
    // TO THE POINT WHERE WE SHOULD LET STATS RUN
    if (
      bottomScollPos >
      staticSection.offsetTop + staticSection.clientHeight / 2
    ) {
      isStatRunning = true;
      this.statTimer = null;
      this.step = 100;
      // CREATE TIMER TO LET ALL STATS COUNT
      this.statTimer = window.setInterval(() => {
        this.step--;
        handleChangeStatNum(
          this.step,
          this.statTimer,
          allStaticItem,
          staticValues
        );
      }, 10);
    }
  }
});
function handleChangeStatNum(step, statTimer, allItems, staticValues) {
  step === 0
    ? window.clearInterval(statTimer)
    : Array.from(allItems).forEach(
        (each, index) =>
          (each.innerHTML = Math.round(
            (staticValues[index] / 100) * (100 - step)
          ).toString())
      );
}
