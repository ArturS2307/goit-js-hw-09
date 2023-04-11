import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    dateTimePicker: document.getElementById('datetime-picker'),
    btn: document.querySelector('[data-start]'),
    daysLeft: document.querySelector('[data-days]'),
    hoursLeft: document.querySelector('[data-hours]'),
    minutesLeft: document.querySelector('[data-minutes]'),
    secondsLeft: document.querySelector('[data-seconds]'),
};
// const currentDate = new Date(); 

// console.log(currentDate.getTime());

let timerId;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
      // console.log(selectedDates[0].getTime());
    //   console.log(currentDate.getTime());
      if(selectedDates[0] < new Date()) {
        refs.btn.disabled = true;
        return alert('Please choose a date in the future');
      } else {
        refs.btn.disabled = false;
      };

      refs.btn.addEventListener('click', () => {
        timerId = setInterval(() => {
          refs.btn.disabled = true;
          // refs.dateTimePicker.disabled = true;
          
            const startTime = Date.now();
            // console.log(startTime);
            const diff = selectedDates[0] - startTime;
            // console.log(diff);

            if(diff < 1000) {
                clearInterval(timerId);
            }

            const result = convertMs(diff);
            console.log(result);

            updateTimerFace(result);
            
        }, 1000); 
        
    });
    },
  };

flatpickr(refs.dateTimePicker, options);

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
  }

  function updateTimerFace({ days, hours, minutes, seconds }) {
    refs.daysLeft.textContent = `${days}`;
    refs.hoursLeft.textContent = `${hours}`;
    refs.minutesLeft.textContent = `${minutes}`;
    refs.secondsLeft.textContent = `${seconds}`;
  };

  