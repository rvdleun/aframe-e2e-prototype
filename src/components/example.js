AFRAME.registerComponent('example-component', {
    schema: {
        controllers: { type: 'selectorAll', default: '[hand-controls]' }
    },

    controllers: [],

    init: function() {
        this.from = new THREE.Vector3();
        this.el.object3D.getWorldPosition(this.from);
    },

    tick: function() {
        const visible = this.data.controllers.some((controller) => this.canInteract(controller));
        this.el.setAttribute('color', visible ? 'yellow' : 'red');
    },

    canInteract: function(controller) {
        const to = new THREE.Vector3();
        controller.object3D.getWorldPosition(to);

        return this.from.distanceTo(to) < 1;
    },
});
