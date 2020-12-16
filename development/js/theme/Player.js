class Player {
    constructor() {
        this.speed = 0;
        this.isMoving = false;
    }

    buildPlayer(data) {
        const json = JSON.parse(data);

        this.life = json.life;
        this.lifeCurrent = json.lifeCurrent;
        this.hunger = json.hunger;
        this.hungerCurrent = json.hungerCurrent;
        this.thirst = json.thirst;
        this.thirstCurrent = json.thirstCurrent;
        this.tileCurrent = window.map.json.position.player.initial;
        this.speed = json.speed;

        window.interface.updateBar();
        window.map.position({
            'target': 'player',
            'position': window.map.json.position.player.initial,
        });
    }

    catch () {
        console.log('catch');
    }

    hit() {
        console.log('hit');
    }

    move(side) {
        const coordinates = this.moveCoordinates(side);
        const vertical = coordinates.vertical;
        const horizontal = coordinates.horizontal;
        const tileNext = coordinates.tileNext;
        let animate;

        if (this.isMoving) {
            return;
        } else {
            this.isMoving = true;
        }

        animate = window.animation.move({
            'target': window.interface.elPlayer,
            vertical,
            horizontal
        });

        animate.then(() => this.updatePosition({
            tileNext,
            side
        }));
    }

    moveCoordinates(side) {
        const tile = window.map.tileSize;
        const tileColumn = window.map.json.column;
        const playerPosition = window.helper.getTranslateValue(window.interface.elPlayer);
        let vertical = false;
        let horizontal = false;
        let tileNext;

        switch (side) {
            case 'up':
                tileNext = this.tileCurrent - tileColumn;
                vertical = playerPosition.y - tile;
                break;
            case 'down':
                tileNext = this.tileCurrent + tileColumn;
                vertical = playerPosition.y + tile;
                break;
            case 'left':
                tileNext = this.tileCurrent - 1;
                horizontal = playerPosition.x - tile;
                break;
            case 'right':
                tileNext = this.tileCurrent + 1;
                horizontal = playerPosition.x + tile;
                break;
        }

        return {
            vertical,
            horizontal,
            tileNext
        };
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