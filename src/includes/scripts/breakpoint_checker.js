function BreakpointChecker() {
    const events = new Events();
    let currentScale = '';
    const scales = [
        { name: 'xs', size: 320 },
        { name: 'sm', size: 640 },
        { name: 'md', size: 960 },
        { name: 'lg', size: 1280 },
        { name: 'xl', size: 1600 },
        { name: 'ml', size: 1920 },
    ];
    function BreakpointCheckerException(message) {
        this.message = message;
    }

    this.on = events.on;

    this.getViewportWidth = () => {
        let width;
        if (window.innerWidth) {
            width = window.innerWidth;
        } else if (document.documentElement && document.documentElement.clientWidth) {
            width = document.documentElement.clientWidth;
        } else {
            throw new BreakpointCheckerException('Can not detect viewport width.');
        }
        return width;
    };

    this.getNewScale = () => {
        const viewportWidth = this.getViewportWidth();
        for (let i = 1; i < scales.length; i += 1) {
            if (viewportWidth < scales[i].size) {
                return scales[i - 1];
            }
        }
        return scales[scales.length - 1];
    };

    this.getSize = (name) => {
        let size = 0;
        scales.forEach((scale) => {
            if (scale.name === name) {
                size = scale.size;
            }
        });
        return size;
    };

    this.getCurrentScale = () => currentScale;

    window.addEventListener('resize', () => {
        const newScale = this.getNewScale();
        if (newScale !== currentScale) {
            currentScale = newScale;
            events.emit('changeScale', newScale);
        } else {
            events.emit('changeViewport');
        }
        events.emit('resize', {
            scale: currentScale,
        });
    });
}


export default BreakpointChecker;
