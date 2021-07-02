class MyEvent {
  constructor() {
    this.handles = {};
  }

  addEvent(eventName, fn) {
    if (typeof this.handles[eventName] === "undefined") {
      this.handles[eventName] = [];
    }
    this.handles[eventName].push(fn);
  }
  trigger(eventName) {
    if (!(eventName in this.handles)) {
      return;
    }
    this.handles[eventName].forEach((fn) => {
      fn();
    });
  }
}

export default MyEvent;
