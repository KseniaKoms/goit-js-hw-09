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

   const intervalId =  setInterval(() => {
     position += 1;
      if (position <= amount) {
       delay = parseInt(delay) + parseInt(step);
       createPromise(position, delay)            
         .then(({ position, delay }) => {
           Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
         })
         .catch(({ position, delay }) => {
           Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
         });
      } else {
       clearInterval(intervalId)
      } 
   }, step)
 }, delay) 
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({position, delay});
  } else {
    reject({position, delay});
  }
  })
}

