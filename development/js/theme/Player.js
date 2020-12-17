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
            'target': window.interface.elPlayer,
            'position': window.map.json.position.player.initial,
        });
        window.camera.center();
    }

    catch () {
        console.log('catch');
    }

    hit() {
        console.log('hit');
    }

    verifyWalk(side) {
        const coordinates = this.moveCoordinates(side);
        let obj = {
            'target': window.interface.elPlayer
        };
        const tileNext = typeof coordinates.tileNext !== 'undefined' ? obj.tileNext = coordinates.tileNext : undefined;
        const isWalk = window.map.verifyWalk(tileNext);

        return isWalk;
    }

    move(side) {
        const coordinates = this.moveCoordinates(side);
        let animate;
        let obj = {
            'target': window.interface.elPlayer
        };
        const tileNext = typeof coordinates.tileNext !== 'undefined' ? obj.tileNext = coordinates.tileNext : undefined;

        if (typeof coordinates.vertical !== 'undefined') {
            obj.vertical = coordinates.vertical;
        }

        if (typeof coordinates.horizontal !== 'undefined') {
            obj.horizontal = coordinates.horizontal;
        }

        if (this.isMoving) {
            return;
        } else {
            this.isMoving = true;
        }

        animate = window.animation.move(obj);
        animate.then(() => this.updatePosition({
            tileNext,
            side
        }));
    }

    moveCoordinates(side) {
        const tileColumn = window.map.json.column;
        const playerPosition = window.helper.getTranslateValue(window.interface.elPlayer);
        let obj = {};

        switch (side) {
            case 'up':
                obj.tileNext = this.tileCurrent - tileColumn;
                obj.vertical = playerPosition.y - window.camera.distance;
                break;
            case 'down':
                obj.tileNext = this.tileCurrent + tileColumn;
                obj.vertical = playerPosition.y + window.camera.distance;
                break;
            case 'left':
                obj.tileNext = this.tileCurrent - 1;
                obj.horizontal = playerPosition.x - window.camera.distance;
                break;
            case 'right':
                obj.tileNext = this.tileCurrent + 1;
                obj.horizontal = playerPosition.x + window.camera.distance;
                break;
        }

        return obj;
    }

    updatePosition(data) {
        this.isMoving = false;
        this.tileCurrent = data.tileNext;

        switch (data.side) {
            case 'up':
                this.currentVertical -= window.map.tileSize;
                break;
            case 'down':
                this.currentVertical += window.map.tileSize;
                break;
            case 'left':
                this.currentHorizontal -= window.map.tileSize;
                break;
            case 'right':
                this.currentHorizontal += window.map.tileSize;
                break;
        }
    }
}

window.player = new Player();