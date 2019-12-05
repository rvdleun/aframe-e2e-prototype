module.exports.moveHand = (page, position, hand) => {
    if (!hand) {
        hand = 'right';
    }

    return page.evaluate(async (hand, position) => {
        return new Promise((resolve, reject) => {
            const handEl = document.querySelector(`[hand-controls=${hand}`);
            if (!handEl) {
                reject('Unable to find hand');
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
