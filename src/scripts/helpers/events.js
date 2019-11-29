export default function Events() {
    const events = {};
    const emitted = [];
    this.on = function (eventNames, fn, priority = 100) {
        const eventsArray = !Array.isArray(eventNames) ? [eventNames] : eventNames;
        eventsArray.forEach((eventName) => {
            events[eventName] = events[eventName] || [];
            events[eventName].push({
                fn,
                priority,
            });
            if (emitted[eventName]) {
                fn(emitted[eventName].data);
            }
        });
    };
    this.emit = function (eventName, data) {
        if (!emitted[eventName]) {
            emitted[eventName] = { data };
        }
        if (events[eventName]) {
            events[eventName].sort((a, b) => a.priority - b.priority);
            const promises = [];
            events[eventName].forEach((event) => {
                promises.push(Promise.resolve(event.fn(data)));
            });
            return Promise.all(promises);
        }
        return Promise.resolve();
    };
    this.debugEvents = function (key) {
        console.log(key, events, emitted);
    };
}
