export class Player {
    constructor() {
        this.speed = 0;
        this.isMoving = false;
        this.isInitial = true;
    }

    buildPlayer(data) {
        this.buildVariable(data);
        platform.updateBar();
        this.position();
        loadingMain.hide();
    }

    buildVariable(data) {
        const json = JSON.parse(data);

        this.life = json.life;
        this.lifeCurrent = json.lifeCurrent;
        this.hunger = json.hunger;
        this.hungerCurrent = json.hungerCurrent;
        this.thirst = json.thirst;
        this.thirstCurrent = json.thirstCurrent;
        this.tileCurrent = terrain.json.position.player;
        this.speed = json.speed;
    }

    hit() {
        console.log('hit');
    }

    move(side) {
        const coordinates = this.moveCoordinates(side);
        let animation;
        let obj = {
            'target': platform.elPlayer
        };
        const tileNext = typeof coordinates.tileNext !== 'undefined' ? obj.tileNext = coordinates.tileNext : undefined;

        if (typeof coordinates.vertical !== 'undefined') obj.vertical = coordinates.vertical;
        if (typeof coordinates.horizontal !== 'undefined') obj.horizontal = coordinates.horizontal;
        if (this.isMoving) return;
        this.isMoving = true;

        animation = window.animate.move(obj);
        animation.then(() => this.moveSuccess({
            tileNext,
            side
        }));
    }

    moveSuccess(obj) {
        const isDoor = terrain.verifyDoor(obj.tileNext);
        const isResource = terrain.verifyResource(obj.tileNext);

        this.updatePosition({
            'tileNext': obj.tileNext,
            'side': obj
        });

        if (isDoor) terrain.change();

        pick.setPick(isResource);
    }

    moveCoordinates(side) {
        const tileColumn = terrain.json.column;
        const playerPosition = helper.getTranslateValue(platform.elPlayer);
        let obj = {};

        switch (side) {
            case 'up':
                obj.tileNext = this.tileCurrent - tileColumn;
                obj.vertical = playerPosition.y - camera.distance;
                break;
            case 'down':
                obj.tileNext = this.tileCurrent + tileColumn;
                obj.vertical = playerPosition.y + camera.distance;
                break;
            case 'left':
                obj.tileNext = this.tileCurrent - 1;
                obj.horizontal = playerPosition.x - camera.distance;
                break;
            case 'right':
                obj.tileNext = this.tileCurrent + 1;
                obj.horizontal = playerPosition.x + camera.distance;
                break;
        }

        return obj;
    }

    position() {
        terrain.position({
            'target': platform.elPlayer,
            'position': this.tileCurrent,
        });
        camera.center();
    }

    updatePosition(data) {
        this.isMoving = false;
        this.tileCurrent = data.tileNext;

        switch (data.side) {
            case 'up':
                this.currentVertical -= terrain.tileSize;
                break;
            case 'down':
                this.currentVertical += terrain.tileSize;
                break;
            case 'left':
                this.currentHorizontal -= terrain.tileSize;
                break;
            case 'right':
                this.currentHorizontal += terrain.tileSize;
                break;
        }
    }

    verifyWalk(side) {
        const coordinates = this.moveCoordinates(side);
        let obj = {
            'target': platform.elPlayer
        };
        const tileNext = typeof coordinates.tileNext !== 'undefined' ? obj.tileNext = coordinates.tileNext : undefined;
        const isWalk = terrain.verifyWalk(tileNext);

        return isWalk;
    }

    walk(side) {
        const capitalize = helper.capitalize(side);

        this[`walk${capitalize}`]();
        this.lastWalkSide = side;
        camera.move(side);
    }

    walkDown() {
        animate.walk(platform.elPlayer, animate.arrCssWalk[2]);
    }

    walkUp() {
        animate.walk(platform.elPlayer, animate.arrCssWalk[0]);
    }

    walkRight() {
        animate.walk(platform.elPlayer, animate.arrCssWalk[1]);
    }

    walkLeft() {
        animate.walk(platform.elPlayer, animate.arrCssWalk[3]);
    }

    walkStop() {
        let index;

        if (this.lastWalkSide === 'up') index = 4;
        if (this.lastWalkSide === 'right') index = 5;
        if (this.lastWalkSide === 'down') index = 6;
        if (this.lastWalkSide === 'left') index = 7;

        animate.walk(platform.elPlayer, animate.arrCssWalk[index]);
    }
}