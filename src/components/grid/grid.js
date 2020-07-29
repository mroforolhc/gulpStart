import { computed, observable } from 'mobx';
import BaseComponent from '../baseComponent/baseComponent';

class GridState {
    breakpoints = [];
    @observable windowWidth;

    get sortedBreakpoints() {
        return this.breakpoints.sort((a, b) => b.size - a.size);
    }

    @computed get currentScale() {
        return this.sortedBreakpoints.find((breakpoint) => breakpoint.size <= this.windowWidth);
    }
}

class Grid extends BaseComponent {
    constructor(name, settings) {
        super(name);
        this.state = new GridState();

        // parse breakpoints from json
        Object.entries(settings).forEach((breakpoint) => {
            this.state.breakpoints.push({ name: breakpoint[0], size: breakpoint[1].size });
        });
    }

    getSize(name) {
        return this.breakpoints.find((breakpoint) => breakpoint.name === name).size;
    }

    init() {
        window.addEventListener('resize', () => {
            this.state.windowWidth = window.innerWidth;
        });
    }
}

export default Grid;
