class Manager {
    storage = [];

    spy(...components) {
        components.forEach((component) => {
            this.storage.push({
                name: component.getDisplayName(),
                state: component.state,
                obj: component,
            });
        });
    }

    getComponent(name) {
        return this.storage.find((component) => component.name === name).obj;
    }

    getState(name) {
        return this.storage.find((component) => component.name === name).state;
    }

    run() {
        this.storage.forEach((component) => {
            component.obj.init();
        });
    }
}

export default Manager;
