const refs = {
    bodyEl: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};

let timerId = null;

refs.startBtn.addEventListener('click', () => {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
    console.log(getRandomHexColor());
}, 1000);
});  

refs.stopBtn.addEventListener('click', () => {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(timerId);
    console.log('Interval has stopped!')
})
 

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }


