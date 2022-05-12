const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let intervalId = null;
refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;

function onStartBtnClick() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
       intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

function onStopBtnClick() {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

