class Player {
    constructor() {
        this.currentHorizontal = 0;
        this.currentVertical = 0;
        this.tileCurrent = 0;
        this.tileNext = 0;
        this.speed = 300;
        this.isMoving = false;
    }

    build() {
        this.update();
        this.load();
    }

    buildPlayer(data) {
        const json = JSON.parse(data);

        this.life = json.life;
        this.lifeCurrent = json.lifeCurrent;
        this.hunger = json.hunger;
        this.hungerCurrent = json.hungerCurrent;
        this.thirst = json.thirst;
        this.thirstCurrent = json.thirstCurrent;

        window.interface.updateBar();
    }

    catch () {
        console.log('catch');
    }

    load() {
        window.data.loadPlayer();
    }

    hit() {
        console.log('hit');
    }

    move(side) {
        const self = this;
        const tile = window.map.tileSize;
        const tileColumn = window.map.json.column;
        let vertical = false;
        let horizontal = false;
        let tileNext;
        let animate;

        if (this.isMoving) {
            return;
        }

        switch (side) {
            case 'up':
                tileNext = this.tileCurrent - tileColumn;
                vertical = this.currentVertical - tile;
                break;
            case 'down':
                tileNext = this.tileCurrent + tileColumn;
                vertical = this.currentVertical + tile;
                break;
            case 'left':
                tileNext = this.tileCurrent - 1;
                horizontal = this.currentHorizontal - tile;
                break;
            case 'right':
                tileNext = this.tileCurrent + 1;
                horizontal = this.currentHorizontal + tile;
                break;
        }

        this.isMoving = true;

        animate = window.animation.move({
            'target': self.elPlayer,
            vertical,
            horizontal
        });

        animate.then(() => this.updatePosition({
            tileNext,
            side
        }));
    }

    update() {
        this.elPlayer = document.querySelector('#player');
    }

    updatePosition(data) {
        const tile = window.map.tileSize;

        this.isMoving = false;
        this.tileCurrent = data.tileNext;

        switch (data.side) {
            case 'up':
                this.currentVertical -= tile;
                break;
            case 'down':
                this.currentVertical += tile;
                break;
            case 'left':
                this.currentHorizontal -= tile;
                break;
            case 'right':
                this.currentHorizontal += tile;
                break;
        }
    }
}

window.player = new Player();