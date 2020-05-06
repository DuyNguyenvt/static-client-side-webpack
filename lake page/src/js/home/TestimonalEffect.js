const allComments = document.getElementsByClassName("comment-content-wrap");
let allCommentsOrder = [1, 2, 3];
let allCurrentPositions = [0, 0, 0];
let allMoveDistanes = [];
const moveCmtBtn = document.getElementsByClassName("move-cmt-btn");
const selcCmtBtn = document.getElementsByClassName("select-specific-cmt-btn");

Array.from(allComments).forEach((each, index) => {
  allCurrentPositions.push(each.offsetLeft);
});

document.querySelector("#move-forward").addEventListener("click", function () {
  moveComment("left", this);
});

document.querySelector("#move-backward").addEventListener("click", function () {
  moveComment("right", this);
});

document
  .querySelectorAll(".select-specific-cmt-btn")
  .forEach(($eachCarouselBtn, idx) => {
    $eachCarouselBtn.addEventListener("click", function () {
      moveComment("cmt-" + (idx + 1), this);
    });
  });

// onclick = "moveComment('left',this)";

// MAIN FUNCTION ---> MOVEE THE COMMNET LEFT/RIGHT OR TO SPECIFIC REQUIRED POSITION
function moveComment(direction, thisBtn) {
  //ChangeOder --> GET THE NEW ORDER OF ALL COMMENTS
  changeOrder(direction, thisBtn);
  //IMPLEMENT NEW ORDER ON DOM
  Array.from(allComments).forEach((each, index) => {
    each.style.order = allCommentsOrder[index];
  });
  // updatePos() --> GET NEW POSITIONS OF ALL COMMENTS
  updatePos();
  // calculatDistance() --> CALCULATE THE DISTANCE OF PREV POSITIONS AND NEW POSITION
  calculatDistance(allComments, allCurrentPositions);
  // handleMoveComment() ---> PROCESSOING MOVING COMMENTS
  handleMoveComment(allMoveDistanes, direction);
}
function changeOrder(direction, thisBtn) {
  if (direction === "left") {
    let firstOrder = allCommentsOrder[0];
    for (let i = 0; i < allCommentsOrder.length; i++) {
      allCommentsOrder[i] = allCommentsOrder[i + 1];
    }
    //this statement change the global variable --- fix later
    allCommentsOrder[allCommentsOrder.length - 1] = firstOrder;
    let selctedCmtBtn =
      allCommentsOrder[Math.ceil(allCommentsOrder.length / 2) - 1] - 1;
    Array.from(selcCmtBtn).forEach((each, index) =>
      index != selctedCmtBtn
        ? (each.style.background = "rgb(212, 224, 212)")
        : (each.style.background = "green")
    );
    return;
  }
  if (direction === "right") {
    let lastOrder = allCommentsOrder[allCommentsOrder.length - 1];
    for (let i = allCommentsOrder.length - 1; i >= 0; i--) {
      allCommentsOrder[i] = allCommentsOrder[i - 1];
    }
    //this statement change the global variable --- fix later
    allCommentsOrder[0] = lastOrder;
    let selctedCmtBtn =
      allCommentsOrder[Math.ceil(allCommentsOrder.length / 2) - 1] - 1;
    Array.from(selcCmtBtn).forEach((each, index) =>
      index != selctedCmtBtn
        ? (each.style.background = "rgb(212, 224, 212)")
        : (each.style.background = "green")
    );
    return;
  }
  if (direction === "cmt-1") {
    handleSelectCmt([3, 1, 2], thisBtn);
    return;
  }
  if (direction === "cmt-2") {
    handleSelectCmt([1, 2, 3], thisBtn);
    return;
  }
  if (direction === "cmt-3") {
    handleSelectCmt([2, 3, 1], thisBtn);
    return;
  }
  //handleSelectCmt() -->  select comments
  function handleSelectCmt(newOrder, thisBtn) {
    allCommentsOrder = newOrder;
    Array.from(allComments).forEach((each) => (each.style.opacity = "0"));
    Array.from(selcCmtBtn).forEach(
      (each) => (each.style.background = "rgb(212, 224, 212)")
    );
    thisBtn.style.background = "green";
  }
}

function updatePos() {
  allCurrentPositions = allCurrentPositions.slice(3, 6);
  Array.from(allComments).forEach((each, index) =>
    allCurrentPositions.push(each.offsetLeft)
  );
}
function calculatDistance(allComments, currentPos) {
  allMoveDistanes = [];
  allCommentsOrder.map((x, index) => {
    allMoveDistanes.push(currentPos[3 + index] - currentPos[index]);
  });
}
function handleMoveComment(moveDistance, direction) {
  Array.from(moveCmtBtn).forEach(
    (each, index) => (each.style.pointerEvents = "none")
  );
  Array.from(allComments).forEach((each, index) => {
    each.style.left = -moveDistance[index] + "px";
    // console.log(each.style.order);
    each.style.order == "1"
      ? direction === "left"
        ? (each.style.opacity = "0")
        : null
      : null;
    each.style.order == "3"
      ? direction === "right"
        ? (each.style.opacity = "0")
        : null
      : null;
  });
  let step = 30;
  this.tempTimer = window.setInterval(() => {
    step--;
    Array.from(allComments).forEach(
      (each, index) =>
        (each.style.left = (-moveDistance[index] * step) / 30 + "px")
    );
    if (step === 0) {
      clearInterval(this.tempTimer);
      Array.from(allComments).forEach(
        (each, index) => (each.style.opacity = "1")
      );
      Array.from(moveCmtBtn).forEach(
        (each, index) => (each.style.pointerEvents = "auto")
      );
    }
  }, 8);
}
