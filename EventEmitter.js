class EventEmitter {
  constructor() {
    this.eventMap = new Map();
  }

  on(eventName, listener) {
    if (!this.eventMap.has(eventName)) {
      this.eventMap.set(eventName, []);
    }
    this.eventMap.get(eventName).push(listener);
  }

  emit(eventName, ...args) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.get(eventName).forEach((listener) => {
        listener(...args);
      })
    }
  }

  off(eventName, listener) {
    if (this.eventMap.has(eventName)) {
      const listeners = this.eventMap.get(eventName).filter((ls) => {
        ls !== listener;
      });
      this.eventMap.set(eventName, listeners);
    }
  }
}

const emitter = new EventEmitter();

const logData = (data) => console.log(data);

emitter.on('data', logData);

emitter.emit('data', {message: 'Hello'});

emitter.off('data', logData);