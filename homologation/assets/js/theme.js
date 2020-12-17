class Animation {
    move(obj) {
        return new Promise((resolve) => {
            const currentValue = window.helper.getTranslateValue(obj.target);
            const currentVertical = Math.floor(currentValue.y);
            const currentHorizontal = Math.floor(currentValue.x);
            const newVertical = typeof obj.vertical === 'undefined' ? currentVertical : Math.floor(obj.vertical);
            const newHorizontal = typeof obj.horizontal === 'undefined' ? currentHorizontal : Math.floor(obj.horizontal);
            const speed = typeof obj.speed === 'undefined' ? window.player.speed : obj.speed;
            const easing = typeof obj.easing === 'undefined' ? 'linear' : obj.easing;

            const animation = obj.target.animate([{
                    transform: `translate(${currentHorizontal}px, ${currentVertical}px)`
                },
                {
                    transform: `translate(${newHorizontal}px, ${newVertical}px)`
                }
            ], {
                duration: speed,
                iterations: 1,
                easing: easing,
                fill: 'both'
            });

            animation.onfinish = function (event) {
                resolve(event);
            };
        });

    }
}

window.animation = new Animation();
class Backpack {
    open() {
        console.log('backpack open');
    }
}

window.backpack = new Backpack();
class Camera {
    center() {
        const positionPlayer = window.helper.getTranslateValue(window.interface.elPlayer);

        this.update();

        window.animation.move({
            'target': window.interface.elCamera,
            'vertical': this.centerVertical(positionPlayer),
            'horizontal': this.centerHorizontal(positionPlayer),
            'speed': 0
        });
    }

    centerVertical(positionPlayer) {
        const position = Number(-positionPlayer.y + (window.interface.elGameHeight / 2) - window.map.tileSizeHalf);

        return this.centerLimit(position, this.limitBottom);
    }

    centerHorizontal(positionPlayer) {
        const position = Number(-positionPlayer.x + (window.interface.elGameWidth / 2) - window.map.tileSizeHalf);

        return this.centerLimit(position, this.limitRight);
    }

    centerLimit(position, limit) {
        if (position < limit) {
            return limit;
        }

        if (position > 0) {
            return 0;
        }

        return position;
    }

    defineDistance() {
        const isLimit = false;

        if (isLimit) {
            this.distance = window.map.tileSize;
        } else {
            this.distance = window.map.tileSizeHalf;
        }
    }

    move(side) {
        const isWalk = window.player.verifyWalk(side);

        if (!isWalk) {
            return;
        }

        this.defineDistance();

        if (window.player.isMoving) {
            return;
        }

        window.player.move(side);
        this.moveMap(side);
    }

    moveMap(side) {
        const limit = window.map.limit[side];
        const capitalize = window.helper.capitalize(side);
        const currentPosition = window.helper.getTranslateValue(window.interface.elMap);
        const isLimit = this[`verifyLimit${capitalize}`]({
            limit,
            currentPosition
        });

        if (!isLimit) {
            return;
        }

        this.moveMapAnimate({
            side,
            currentPosition
        });
    }

    moveMapAnimate(args) {
        const horizontal = args.currentPosition.x;
        const vertical = args.currentPosition.y;
        let obj = {
            'target': window.interface.elMap
        };

        switch (args.side) {
            case 'down':
                obj.vertical = Math.round(vertical - this.distance);
                break;
            case 'left':
                obj.horizontal = Math.round(horizontal + this.distance);
                break;
            case 'up':
                obj.vertical = Math.round(vertical + this.distance);
                break;
            case 'right':
                obj.horizontal = Math.round(horizontal - this.distance);
                break;
        }

        window.animation.move(obj);
    }

    update() {
        this.limitBottom = Number(-(window.map.height - window.interface.elGameHeight));
        this.limitRight = Number(-(window.map.width - window.interface.elGameWidth));
    }

    verifyLimitDown(obj) {
        const limit = obj.limit;
        const limitMap = Math.abs(obj.currentPosition.y);

        if (limit >= limitMap) {
            return true;
        } else {
            return false;
        }
    }

    verifyLimitLeft(obj) {
        const limit = obj.limit;
        const limitMap = obj.currentPosition.x;

        if (limit >= limitMap) {
            return true;
        } else {
            return false;
        }
    }

    verifyLimitRight(obj) {
        const limit = obj.limit;
        const limitMap = Math.abs(obj.currentPosition.x);

        if (limit >= limitMap) {
            return true;
        } else {
            return false;
        }
    }

    verifyLimitUp(obj) {
        const limit = obj.limit;
        const limitMap = obj.currentPosition.y;

        if (limit >= limitMap) {
            return true;
        } else {
            return false;
        }
    }
}

window.camera = new Camera();
class Craft {
    open() {
        console.log('craft open');
    }
}

window.craft = new Craft();
class Data {
    constructor(api) {
        this.api = api;
        this.apiUrl = `./api/${this.api}/`;
    }

    loadMap(map) {
        const parameter = {
            controller: `${this.apiUrl}map-${map}.${this.api}`,
        };
        let data = window.helper.ajax(parameter);

        data.then((result) =>
                window.map.buildMap(result)
            )
            .then(() =>
                this.loadPlayer()
            );
    }

    loadPlayer() {
        const parameter = {
            controller: `${this.apiUrl}player.${this.api}`,
        };
        let data = window.helper.ajax(parameter);

        data.then((result) => window.player.buildPlayer(result));
    }
}

window.data = new Data('json');
class Enemy {

}

window.enemy = new Enemy();
class Helper {
    ajax(obj) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            const kind = typeof obj.kind === 'undefined' ? 'GET' : obj.kind;

            xhr.open(kind, obj.controller, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(obj.parameter);
        });
    }

    capitalize(target) {
        return target.charAt(0).toUpperCase() + target.slice(1);
    }

    getOffset(target) {
        const rect = target.getBoundingClientRect();

        return {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left
        };
    }

    getTranslateValue(target) {
        const style = window.getComputedStyle(target);
        const matrix = style['transform'];

        if (matrix === 'none') {
            return {
                x: 0,
                y: 0,
                z: 0
            };
        }

        const matrixType = matrix.includes('3d') ? '3d' : '2d';
        const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');

        if (matrixType === '2d') {
            return {
                x: Number(matrixValues[4]),
                y: Number(matrixValues[5]),
                z: 0
            };
        }

        if (matrixType === '3d') {
            return {
                x: Number(matrixValues[12]),
                y: Number(matrixValues[13]),
                z: Number(matrixValues[14])
            };
        }
    }

    remove(target) {
        if (target !== null) {
            target.parentNode.removeChild(target);
        }
    }
}

window.helper = new Helper();
class Interface {
    build() {
        this.update();
        this.resize();
        this.buildAction();
        this.buildDirection();
    }

    buildAction() {
        this.elActionBackpack.onclick = () => {
            window.backpack.open();
        };

        this.elActionCraft.onclick = () => {
            window.craft.open();
        };

        this.elActionCatch.onclick = () => {
            window.player.catch();
        };

        this.elActionHit.onclick = () => {
            window.player.hit();
        };
    }

    buildDirection() {
        this.elDirectionalUp.onclick = () => {
            window.camera.move('up');
        };

        this.elDirectionalDown.onclick = () => {
            window.camera.move('down');
        };

        this.elDirectionalLeft.onclick = () => {
            window.camera.move('left');
        };

        this.elDirectionalRight.onclick = () => {
            window.camera.move('right');
        };
    }

    update() {
        this.elCamera = document.querySelector('#camera');
        this.elGame = document.querySelector('#game');
        this.elMap = document.querySelector('#map');
        this.elPlayer = document.querySelector('#player');

        this.elBarLife = document.querySelector('[data-id="bar-life"]');
        this.elBarHunger = document.querySelector('[data-id="bar-hunger"]');
        this.elBarThirst = document.querySelector('[data-id="bar-thirst"]');

        this.elActionBackpack = document.querySelector('[data-id="action-backpack"]');
        this.elActionCraft = document.querySelector('[data-id="action-craft"]');
        this.elActionCatch = document.querySelector('[data-id="action-catch"]');
        this.elActionHit = document.querySelector('[data-id="action-hit"]');

        this.elDirectionalUp = document.querySelector('[data-id="directional-up"]');
        this.elDirectionalDown = document.querySelector('[data-id="directional-down"]');
        this.elDirectionalLeft = document.querySelector('[data-id="directional-left"]');
        this.elDirectionalRight = document.querySelector('[data-id="directional-right"]');
    }

    updateBar() {
        this.elBarLife.setAttribute('value', player.lifeCurrent);
        this.elBarLife.setAttribute('max', player.life);
        this.elBarHunger.setAttribute('value', player.hungerCurrent);
        this.elBarHunger.setAttribute('max', player.hunger);
        this.elBarThirst.setAttribute('value', player.thirstCurrent);
        this.elBarThirst.setAttribute('max', player.thirst);
    }

    resize() {
        this.elGameWidth = this.elGame.offsetWidth;
        this.elGameHeight = this.elGame.offsetHeight;
    }
}

window.interface = new Interface();
class Item {

}

window.item = new Item();
class Keyboard {
    build() {
        document.addEventListener('keydown', (event) => {
            this.buildAction(event.key);
        });
    }

    buildAction(key) {
        switch (key) {
            case 'Up':
            case 'ArrowUp':
            case 'w':
                window.camera.move('up');
                break;
            case 'Left':
            case 'ArrowLeft':
            case 'a':
                window.camera.move('left');
                break;
            case 'Down':
            case 'ArrowDown':
            case 's':
                window.camera.move('down');
                break;
            case 'Right':
            case 'ArrowRight':
            case 'd':
                window.camera.move('right');
                break;
        }
    }
}

window.keyboard = new Keyboard();
class Map {
    constructor() {
        this.current = 0;
        this.json = {};
        this.arr = [];
        this.arrWalkFalse = [0];
        this.tileSize = 50;
        this.tileSizeHalf = this.tileSize / 2;
        this.limit = {};
        this.tileId = 0;
        this.tileIdPrefix = 'tile_';
    }

    buildMap(data) {
        this.json = JSON.parse(data);
        this.width = this.tileSize * this.json.column;
        this.height = this.tileSize * this.json.row;

        this.updateLimit();
        this.convertArray();
        this.buildHtml();
    }

    buildHtml() {
        const template = this.buildHtmlRow();

        window.interface.elMap.style.width = `${this.width}px`;
        window.interface.elMap.style.height = `${this.height}px`;
        window.interface.elMap.innerHTML = '';
        window.interface.elMap.insertAdjacentHTML('afterbegin', template);
    }

    buildHtmlRow() {
        let template = '';

        for (let i = 0; i < this.json.row; i++) {
            template += this.buildHtmlColumn(i);
        }

        return template;
    }

    buildHtmlColumn(i) {
        let template = '';

        for (let j = 0; j < this.json.column; j++) {
            let tile = this.arr[i][j];
            let trim = tile.trim();

            template += `<div class="tile tile--${trim}" data-tile="${trim}" id="${this.tileIdPrefix}${this.tileId}"></div>`;
            this.tileId++;
        }

        return template;
    }

    convertArray() {
        const json = this.json.map;
        const length = Object.keys(json).length;

        for (let i = 0; i < length; i++) {
            let split = json[i].split(',');
            this.arr[i] = split;
        }
    }

    position(obj) {
        const tile = this.tileIdPrefix + obj.position;
        const elTarget = obj.target;
        const elTile = document.querySelector(`#${tile}`);
        const elTilePosition = window.helper.getOffset(elTile);
        const elGamePosition = window.helper.getOffset(window.interface.elGame);
        const positionReset = {
            top: elTilePosition.top - elGamePosition.top,
            left: elTilePosition.left - elGamePosition.left,
        };

        window.animation.move({
            'target': elTarget,
            'vertical': Math.round(positionReset.top),
            'horizontal': Math.round(positionReset.left),
            'speed': 0,
        });
    }

    verifyWalk(tile) {
        const target = document.querySelector(`#${this.tileIdPrefix}${tile}`);
        const attribute = Number(target.getAttribute('data-tile'));
        const isInArray = this.arrWalkFalse.includes(attribute);

        if (isInArray) {
            return false;
        }

        return true;
    }

    update() {
        this.tileId = 0;
    }

    updateLimit() {
        this.limit = {
            'up': 0,
            'down': this.tileSize * this.json.row - window.interface.elGameHeight,
            'left': 0,
            'right': this.tileSize * this.json.column - window.interface.elGameWidth,
        };
    }
}

window.map = new Map();
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
document.addEventListener('DOMContentLoaded', () => {
    window.interface.build();
    window.keyboard.build();
    window.map.update();
    window.data.loadMap(window.map.current);
});

window.addEventListener('resize', () => {
    window.interface.resize();
    window.camera.center();
});