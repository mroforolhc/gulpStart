class BaseComponent {
    constructor(name) {
        this.displayName = name;
    }

    getDisplayName() {
        return this.displayName;
    }

    init() {
        return this;
    }
}

export default BaseComponent;
