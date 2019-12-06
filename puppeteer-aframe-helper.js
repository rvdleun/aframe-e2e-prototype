module.exports.HandControlEvents = {
    GRIP_DOWN: 'gripdown',
    GRIP_UP: 'gripup',
    POINT_UP: 'point_up',
    POINT_DOWN: 'point_down',
    THUMB_UP: 'thumbup',
    THUMB_DOWN: 'thumbdown',
    POINTING_START: 'pointingstart',
    POINTING_END: 'pointingend',
    PISTOL_START: 'pistolstart',
    PISTOL_END: 'pistolend',
};

module.exports.emitHandEvent = (page, event, hand) => {
    if (!hand) {
        hand = 'right';
    }

    return page.evaluate(async (hand, event) => {
        return new Promise((resolve, reject) => {
            const handEl = document.querySelector(`[hand-controls=${hand}`);
            if (!handEl) {
                reject(`Unable to find hand-controls. Hand: ${hand}`);
                return;
            }

            console.log('Firing event', event);
            handEl.dispatchEvent(new CustomEvent(event));
            setTimeout(() => resolve(), 3000);
        });
    }, hand, event);
};


module.exports.moveHand = (page, position, hand) => {
    if (!hand) {
        hand = 'right';
    }

    return page.evaluate(async (hand, position) => {
        return new Promise((resolve, reject) => {
            const handEl = document.querySelector(`[hand-controls=${hand}`);
            if (!handEl) {
                reject(`Unable to find hand-controls. Hand: ${hand}`);
                return;
            }

            handEl.setAttribute('position', position);
            setTimeout(() => resolve(), 2);
        });
    }, hand, position);
};

module.exports.showHandControls = (page) => {
    return page.evaluate(() => {
        return new Promise((resolve) => {
            Array.from(document.querySelectorAll('[hand-controls]')).forEach((el) => {
                console.log('Showing hand control');
                el.setAttribute('visible', 'true');
            });
            setTimeout(() => resolve(), 2);
        });
    });
};

module.exports.waitForRenderStart = (page) => {
    return page.evaluate(() => {
        return new Promise((resolve) => {
            const scene = document.querySelector('a-scene');
            if (scene.renderStarted) {
                resolve();
                return;
            }

            scene.addEventListener('renderstart', () => {
                resolve();
            });
        })
    });
};
