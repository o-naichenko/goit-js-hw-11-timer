// Плагін очікує наступну HTML-розмітку і показує чотири цифри: дні, години,
// хвилини і секунди в форматі XX: XX: XX: XX.Кількість днів може складатися з більш ніж двох цифр.

// Плагін - це клас CountdownTimer, екземпляр якого створює новий таймер з настройками.
let time = null;

const timerRef = document.querySelector("#timer-1");
const daysRef = timerRef.querySelector("[data-value = 'days']");
const hoursRef = timerRef.querySelector("[data-value = 'hours']");
const minsRef = timerRef.querySelector("[data-value = 'mins']");
const secsRef = timerRef.querySelector("[data-value = 'secs']");

class CountdownTimer {
  constructor(selector, targetDate, onTick) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
  }
  start() {
    setInterval(() => {
      const currentDate = new Date();
      time = this.targetDate - currentDate;
      const timeComponents = getTimeComponents(time);
      this.onTick(timeComponents);
    }, 1000);
  }
}
function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}
function updateTimerRefsContent({ days, hours, mins, secs }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minsRef.textContent = mins;
  secsRef.textContent = secs;
}
function pad(value) {
  return String(value).padStart(2, "0");
}

const timer = new CountdownTimer(
  "#timer-1",
  new Date("Jan 01, 2021"),
  updateTimerRefsContent
);

window.addEventListener("DOMContentLoaded", timer.start.bind(timer));
