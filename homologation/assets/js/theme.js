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
class Backpack {}

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

    centerHorizontal(positionPlayer) {
        const position = Number(-positionPlayer.x + (window.interface.elGameWidth / 2) - window.map.tileSizeHalf);

        return this.centerLimit(position, this.limit.centerHorizontal);
    }

    centerVertical(positionPlayer) {
        const position = Number(-positionPlayer.y + (window.interface.elGameHeight / 2) - window.map.tileSizeHalf);

        return this.centerLimit(position, this.limit.centerVertical);
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

    move(side) {
        const isWalkFalse = window.player.verifyWalk(side);

        if (isWalkFalse || window.player.isMoving) {
            return;
        }

        window.player.move(side);
        this.moveCamera(side);
    }

    moveCamera(side) {
        const limit = this.limit[side];
        const capitalize = window.helper.capitalize(side);
        const currentPosition = window.helper.getTranslateValue(window.interface.elCamera);
        const isLimit = this[`verifyLimit${capitalize}`]({
            limit,
            currentPosition
        });

        if (isLimit) {
            return;
        }

        this.moveCameraAnimate({
            side,
            currentPosition
        });
    }

    moveCameraAnimate(args) {
        const horizontal = args.currentPosition.x;
        const vertical = args.currentPosition.y;
        let value;
        let obj = {
            'target': window.interface.elCamera
        };

        switch (args.side) {
            case 'down':
                value = Math.round(vertical - this.distance);

                if (Math.abs(window.camera.limit.down) - (Math.abs(vertical)) < this.distance) {
                    value = window.camera.limit.down;
                }

                obj.vertical = value;
                break;
            case 'left':
                value = Math.round(horizontal + this.distance);

                if (Math.abs(horizontal) < this.distance) {
                    value = window.camera.limit.left;
                }

                obj.horizontal = value;
                break;
            case 'up':
                value = Math.round(vertical + this.distance);

                if (Math.abs(value) <= this.distance) {
                    value = this.limit.up;
                }

                obj.vertical = value;
                break;
            case 'right':
                value = Math.round(horizontal - this.distance);

                if ((window.interface.elGameWidth / 2) - this.distance - (Math.abs(horizontal)) < this.distance) {
                    value = window.camera.limit.right * -1;
                }

                obj.horizontal = value;
                break;
        }

        window.animation.move(obj);
    }

    update() {
        this.distance = window.map.tileSize;
        this.limit = {
            'centerVertical': Number(-(window.map.height - window.interface.elGameHeight)),
            'centerHorizontal': Number(-(window.map.width - window.interface.elGameWidth)),
            'up': 0,
            'down': Math.abs(window.map.tileSize * window.map.json.row - window.interface.elGameHeight) * -1,
            'left': 0,
            'right': window.map.tileSize * window.map.json.column - window.interface.elGameWidth,
        };
    }

    verifyLimitDown(obj) {
        const limit = obj.currentPosition.y;

        return obj.limit > limit ? true : false;
    }

    verifyLimitLeft(obj) {
        const limit = obj.currentPosition.x;

        return obj.limit > limit ? false : true;
    }

    verifyLimitRight(obj) {
        const limit = Math.abs(obj.currentPosition.x);

        return obj.limit < limit ? true : false;
    }

    verifyLimitUp(obj) {
        const limit = obj.currentPosition.y;

        return obj.limit < limit ? true : false;
    }
}

window.camera = new Camera();
class Craft {
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
        if (window.player.isInitial) {
            window.player.isInitial = false;
            this.loadPlayerInitial();
        } else {
            window.loadingMain.hide();
        }
    }

    loadPlayerInitial() {
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
class Game {
    initialize() {
        window.data.loadMap(window.map.current);
    }
}

window.game = new Game();
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
            window.modal.open('backpack');
        };

        this.elActionCraft.onclick = () => {
            window.modal.open('craft');
        };

        this.elActionPick.onclick = () => {
            window.player.pick();
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
        this.elActionPick = document.querySelector('[data-id="action-pick"]');
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
            case 'Escape':
                window.modal.close();
                break;
        }
    }
}

window.keyboard = new Keyboard();
class LoadingMain {
    constructor() {
        this.cssHide = 'hide';
        this.cssAnimation = 'animate';
    }

    update() {
        this.elWrapper = document.querySelector('.loading-main');
        this.elLoading = this.elWrapper.querySelector('.loading');
    }

    hide() {
        this.elWrapper.classList.add(this.cssHide);
        this.elLoading.classList.remove(this.cssAnimation);
    }

    show() {
        this.elWrapper.classList.remove(this.cssHide);
        this.elLoading.classList.add(this.cssAnimation);
    }
}

window.loadingMain = new LoadingMain();
class Map {
    constructor() {
        this.current = 0;
        this.json = {};
        this.arr = [];
        this.arrWalkFalse = [0];
        this.arrDoor = [2];
        this.tileSize = 50;
        this.tileSizeHalf = this.tileSize / 2;
        this.tileId = 0;
        this.tileIdPrefix = 'tile_';
    }

    buildMap(data) {
        this.json = JSON.parse(data);
        this.width = this.tileSize * this.json.column;
        this.height = this.tileSize * this.json.row;

        window.camera.update();
        this.convertArray();
        this.buildHtml();

        if (!window.player.isInitial) {
            window.player.position();
        }
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

    change() {
        const playerTile = window.player.tileCurrent;
        const json = window.map.json.position;
        let nextMap;
        let nextTile;

        window.loadingMain.show();

        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                if (json[key].tile === playerTile) {
                    nextMap = json[key].sendToMap;
                    nextTile = json[key].sendToTile;
                }
            }
        }

        this.update();
        window.player.tileCurrent = nextTile;
        window.data.loadMap(nextMap);
    }

    position(obj) {
        const tile = this.tileIdPrefix + obj.position;
        const elTarget = obj.target;
        const elTile = document.querySelector(`#${tile}`);
        const elTilePosition = window.helper.getOffset(elTile);
        const elCameraPosition = window.helper.getOffset(window.interface.elCamera);
        const positionReset = {
            top: elTilePosition.top - elCameraPosition.top,
            left: elTilePosition.left - elCameraPosition.left,
        };

        window.animation.move({
            'target': elTarget,
            'vertical': Math.round(positionReset.top),
            'horizontal': Math.round(positionReset.left),
            'speed': 0,
        });
    }

    verifyDoor(tile) {
        return this.verifyTile({
            tile,
            'arr': 'arrDoor'
        });
    }

    verifyWalk(tile) {
        return this.verifyTile({
            tile,
            'arr': 'arrWalkFalse'
        });
    }

    verifyTile(obj) {
        const target = document.querySelector(`#${this.tileIdPrefix}${obj.tile}`);
        const attribute = Number(target.getAttribute('data-tile'));
        const isInArray = this[obj.arr].includes(attribute);

        if (isInArray) {
            return true;
        } else {
            return false;
        }
    }

    update() {
        this.tileId = 0;
    }
}

window.map = new Map();
class Modal {
    constructor() {
        this.cssModal = 'modal';
        this.cssClose = `${this.cssModal}--close`;
        this.cssHide = 'hide';
    }

    build() {
        this.update();
        this.buildAction();
    }

    buildAction() {
        this.elCloseButton.onclick = () => {
            this.close();
        };
    }

    close() {
        this.hidePage();
        this.elModal.classList.add(this.cssClose);
    }

    open(target) {
        const el = document.querySelector(`#page_${target}`);

        this.hidePage();
        this.elModal.classList.remove(this.cssClose);
        el.classList.remove(this.cssHide);
    }

    hidePage() {
        Array.prototype.forEach.call(this.elPage, (item) => {
            if (!item.classList.contains(this.cssHide)) {
                item.classList.add(this.cssHide);
            }
        });
    }

    update() {
        this.elModal = document.querySelector(`.${this.cssModal}`);
        this.elContent = document.querySelector(`.${this.cssModal}__content`);
        this.elPage = this.elContent.querySelectorAll('.page');
        this.elCloseButton = document.querySelector('#modal_close');
    }
}

window.modal = new Modal();
class Player {
    constructor() {
        this.speed = 0;
        this.isMoving = false;
        this.isInitial = true;
    }

    buildPlayer(data) {
        this.buildVariable(data);
        window.interface.updateBar();
        this.position();
        window.loadingMain.hide();
    }

    buildVariable(data) {
        const json = JSON.parse(data);

        this.life = json.life;
        this.lifeCurrent = json.lifeCurrent;
        this.hunger = json.hunger;
        this.hungerCurrent = json.hungerCurrent;
        this.thirst = json.thirst;
        this.thirstCurrent = json.thirstCurrent;
        this.tileCurrent = window.map.json.position.player;
        this.speed = json.speed;
    }

    hit() {
        console.log('hit');
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
        animate.then(() => this.moveSuccess({
            tileNext,
            side
        }));
    }

    moveSuccess(obj) {
        const isDoor = window.map.verifyDoor(obj.tileNext);

        this.updatePosition({
            'tileNext': obj.tileNext,
            'side': obj
        });

        if (isDoor) {
            window.map.change();
        }
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

    position() {
        window.map.position({
            'target': window.interface.elPlayer,
            'position': this.tileCurrent,
        });
        window.camera.center();
    }

    pick() {
        console.log('pick');
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

    verifyWalk(side) {
        const coordinates = this.moveCoordinates(side);
        let obj = {
            'target': window.interface.elPlayer
        };
        const tileNext = typeof coordinates.tileNext !== 'undefined' ? obj.tileNext = coordinates.tileNext : undefined;
        const isWalk = window.map.verifyWalk(tileNext);

        return isWalk;
    }
}

window.player = new Player();
document.addEventListener('DOMContentLoaded', () => {
    window.loadingMain.update();
    window.modal.build();
    window.map.update();
    window.interface.build();
    window.keyboard.build();
    window.game.initialize();
});

window.addEventListener('resize', () => {
    window.interface.resize();
    window.camera.center();
});