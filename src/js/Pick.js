export class Pick {
    constructor() {
        this.isPick = false;
    }

    pick() {
        if (!this.isPick) return;

        const playerPosition = player.tileCurrent;
        const item = platform.elResource.querySelector(`[data-tile="${playerPosition}"]`);
        const itemId = item.getAttribute('data-tile');

        terrain.removeItem(item);
        terrain.removeResource(itemId);
        backpack.addItem(item);
        this.setPick(false);
    }

    setPick(status) {
        const buttonPick = platform.elActionPick;
        const attribute = 'disabled';

        status ? buttonPick.removeAttribute(attribute) : buttonPick.setAttribute(attribute, '');
        this.isPick = status;
    }
}