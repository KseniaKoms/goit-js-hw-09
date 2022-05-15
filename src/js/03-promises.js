import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form')
formRef.addEventListener('submit', onFormSubmit);


function onFormSubmit(e) {
  e.preventDefault();
  let delay = formRef.delay.value;
  let amount = formRef.amount.value;
  let step = formRef.step.value;
  let position = 1;

  setTimeout(() => {
      createPromise(position, delay)            
      .then(({ position, delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    for (let position = 2; position <= amount; position += 1) {
       delay = parseInt(delay) + parseInt(step)
         createPromise(position, delay)            
      .then(({ position, delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }
 }, delay) 
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
    if (shouldResolve) {
    resolve({position, delay});
  } else {
    reject({position, delay});
  }
  }, delay)
})
}
