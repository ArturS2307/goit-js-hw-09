import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  firstDelayEl: document.querySelector('[name="delay"]'),
  delayStepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
  btn: document.querySelector('.form button'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const firstDelayValue = +refs.firstDelayEl.value;
  const delayStepValue = +refs.delayStepEl.value;
  const amountValue = +refs.amountEl.value;

  for(let i=0; i<amountValue; i+=1) {
    let position = i+1;
    let delay = firstDelayValue + i*delayStepValue;

    createPromise(position, delay).then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
});
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } 
      
      reject({position, delay});
    }, delay)
  })
}