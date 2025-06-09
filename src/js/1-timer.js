import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const timeInput = document.querySelector('#datetime-picker');
startButton.disabled = true;

let userSelectedDate;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    const dateNow = new Date();

    if (selectedDate <= dateNow) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topCenter',
        progressBar: false,
        icon: false,
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

startButton.addEventListener('click', () => {
const timerId = setInterval(() => {
  const ms = userSelectedDate - new Date();
  
    if (ms<=0) {
        startButton.disabled = true;
        clearInterval(timerId);
        iziToast.success({
          title: 'Success',
          message: 'Timer finished!',
          icon: false,
        });

        return;
    }
    const { days, hours, minutes, seconds } = convertMs(ms);

    document.querySelector('[data-days]').textContent = String(days).padStart(2, '0');
    document.querySelector('[data-hours]').textContent = String(hours).padStart(2, '0');
    document.querySelector('[data-minutes]').textContent = String(minutes).padStart(2, '0');
    document.querySelector('[data-seconds]').textContent = String(seconds).padStart(2, '0');
   }, 1000);

   startButton.disabled = true;
    timeInput.disabled = true;

});