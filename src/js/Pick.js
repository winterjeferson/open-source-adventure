class Pick {
    constructor() {
        this.isPick = false;
    }

    pick() {
        if (!this.isPick) {
            return;
        }

        const playerPosition = window.player.tileCurrent;
        const item = window.interface.elResource.querySelector(`[data-tile="${playerPosition}"]`);

        window.map.removeItem(item);
        window.backpack.addItem(item);
    }

    setPick(status) {
        const buttonPick = window.interface.elActionPick;
        const attribute = 'disabled';

        status ? buttonPick.removeAttribute(attribute) : buttonPick.setAttribute(attribute, '');
        this.isPick = status;
    }
}

export {
    Pick
};