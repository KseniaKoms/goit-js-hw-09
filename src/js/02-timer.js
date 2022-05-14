import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import "flatpickr/dist/flatpickr.min.css";


const refs = {
  input: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  valueDay: document.querySelector('span[data-days]'),
  valueHour: document.querySelector('span[data-hours]'),
  valueMinute: document.querySelector('span[data-minutes]'),
  valueSecond: document.querySelector('span[data-seconds]'),
    
};
let timeCounter = 0;
refs.startButton.disabled = true;
refs.startButton.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
    Notify.warning("Please choose a date in the future");
      } else {   
      refs.startButton.disabled = false;
      timeCounter = selectedDates[0].getTime();
    };
  },
};

flatpickr('#datetime-picker', options);


function onStartBtnClick() {
setInterval(() => {
  const delta = timeCounter - new Date;
  if (delta > 0) {
    updateClockface(convertMs(delta))
  }     
}, 1000)
 
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function updateClockface({ days, hours, minutes, seconds }) {
  refs.valueDay.textContent = `${days}`;
  refs.valueHour.textContent = `${hours}`;
  refs.valueMinute.textContent = `${minutes}`;
  refs.valueSecond.textContent = `${seconds}`;
}
