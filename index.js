let obj;
let question;

fetch("./assets/data.json")
  .then((res) => res.json())
  .then((data) => {
    obj = data;
    changeQuestion();
  });

const playQuestion = $("#playQuestion");
let qPaused = true;
let qAudio;

const playAnswer = $("#playAnswer");
let aPaused = true;
let aAudio;

const shuffle = $(".shuffle");

let myTimeout;
let fShuffle = true;

$(playQuestion).on("click", function () {
  if (qPaused) {
    if (!aPaused) {
      $(playAnswer).attr("src", "assets/icons8-play-100.png");
      aPaused = true;
      aAudio.pause();
    }
    $(playQuestion).attr("src", "assets/icons8-pause-100.png");
    qPaused = false;
    qAudio = new Audio(obj[question]["nuria"]);
    qAudio.play();
    $(qAudio).on("loadedmetadata", function () {
      myTimeout = setTimeout(() => {
        if (!qPaused) {
          $(playQuestion).attr("src", "assets/icons8-play-100.png");
          qPaused = true;
        }
      }, qAudio.duration * 1000);
    });
  } else {
    $(playQuestion).attr("src", "assets/icons8-play-100.png");
    qPaused = true;
    qAudio.pause();
  }
});
$(playAnswer).on("click", function () {
  if (aPaused) {
    if (!qPaused) {
      $(playQuestion).attr("src", "assets/icons8-play-100.png");
      qPaused = true;
      qAudio.pause();
    }
    $(playAnswer).attr("src", "assets/icons8-pause-100.png");
    aPaused = false;
    aAudio = new Audio(obj[question]["felix"]);
    aAudio.play();
    $(aAudio).on("loadedmetadata", function () {
      myTimeout = setTimeout(() => {
        if (!aPaused) {
          $(playAnswer).attr("src", "assets/icons8-play-100.png");
          aPaused = true;
        }
      }, aAudio.duration * 1000);
    });
  } else {
    $(playAnswer).attr("src", "assets/icons8-play-100.png");
    aPaused = true;
    aAudio.pause();
  }
});
$(shuffle).on("click", () => {
  if (!fShuffle) {
    if (!aPaused) {
      aAudio.pause();
      $(playAnswer).attr("src", "assets/icons8-play-100.png");
      aPaused = true;
    } else if (!qPaused) {
      qAudio.pause();
      $(playQuestion).attr("src", "assets/icons8-play-100.png");
      qPaused = true;
    }
    clearTimeout(myTimeout);
    $(playQuestion).addClass("spin");
    $(playAnswer).addClass("spin");
    setTimeout(() => {
      $(playQuestion).removeClass("spin");
      $(playAnswer).removeClass("spin");
    }, 150);
  } else {
    $(".hide").each(function () {
      $(this).removeClass("hide");
    });
  }
  changeQuestion();

  fShuffle = false;
});
const playAudio = (src) => {
  sound = new Audio();
  sound.play();
};
const changeQuestion = () => {
  question = `${Math.floor(Math.random() * Object.keys(obj).length)}`;
};
