const placeholder = document.createElement("div");

const getWtchDom = () => document.getElementById("wtch-display") || placeholder;
const getTimeDOM = () => document.getElementById("time-display") || placeholder;

const current = {
  date: new Date(),
  upDate() {
    this.date = new Date();
    updateTimer();
  },

  startAt: -1,
  pausedAt: -1,
  startTimer(self) {
    if (this.startAt !== -1) {
      this.stopTimer(self);
      return;
    }

    getWtchDom().style.filter = "grayscale(0)";
    getWtchDom().innerText = "00:00:00";
    self.innerText = "Stop";

    this.startAt = new Date().getTime();
    this.removeList();
  },
  stopTimer(self) {
    self.innerText = "Start";
    getWtchDom().style.filter = "grayscale(1)";
    this.startAt = -1;
  },
  pauseTimer(self) {
    if (this.startAt === -1) return;
    if (this.pausedAt !== -1) {
      this.resumeTimer(self);
      return;
    }

    self.innerText = "Resume";
    this.pausedAt = new Date().getTime();
  },
  resumeTimer(self) { 
    if (this.startAt === -1) return;

    self.innerText = "Pause";
    this.startAt += new Date().getTime() - this.pausedAt;
    this.pausedAt = -1;
  },

  list: [],
  addList() {
    if (this.startAt === -1) return;
    if (this.pausedAt !== -1) return;

    const newTimestamp = new Date().getTime();
    this.list.push(newTimestamp);
    updateList();
  },
  removeList(time) {
    this.list = this.list.filter((a) => a !== time && !isNaN(time));
    updateList();
  },
};

function updateList() {
  const target = document.getElementById("break-list");
  target.innerHTML = "";

  for (let i = 0; i < current.list.length; i++) {
    const time = current.list[i];

    const newDom = document.createElement("div");
    newDom.className = "list-item";

    const removeBtt = document.createElement("button");
    removeBtt.onclick = () => current.removeList(time);
    removeBtt.innerText = "-";

    newDom.append(i + 1 + ", " + getWatch(time - current.startAt), removeBtt);
    target.appendChild(newDom);
  }
}

function updateTimer() {
  const { startAt, date } = current;

  const currentTime = current.date.getTime();
  getTimeDOM().innerText = getTime(date);

  if (current.startAt === -1 || current.pausedAt !== -1) return;
  getWtchDom().innerText = getWatch(new Date(currentTime - startAt - 288e5));
}

function init() {
  const up = () => {
    current.upDate();
    //// setTimeout(up, 50);
    requestAnimationFrame(up);
  };

  //// setTimeout(up, 50);
  requestAnimationFrame(up);

  current.upDate();
}

function addZ(a, c = 1) {
  let res = a,
    d = 0;

  while (d++ < c) {
    if (a < 10 ** d) {
      return (res = "0".repeat(c - d) + a);
    }
  }
  return res;
}

function getTime(date) {
  const Minutes = addZ(date.getMinutes(), 2);
  const Seconds = addZ(date.getSeconds(), 2);
  const Hours = addZ(date.getHours(), 2);

  return `${Hours}:${Minutes}:${Seconds}`;
}

function getWatch(date) {
  if (Number.isInteger(date)) {
    date = new Date(date);
  }

  const Minutes = addZ(date.getMinutes(), 2);
  const Seconds = addZ(date.getSeconds(), 2);
  const Milisec = addZ(date.getMilliseconds(), 3);

  return `${Minutes}:${Seconds}:${Milisec}`
}
