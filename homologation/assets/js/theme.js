class Animation {
    move(obj) {
        return new Promise((resolve) => {
            const currentValue = window.helper.getTranslateValue(obj.target);
            const currentVertical = Math.floor(currentValue.y);
            const currentHorizontal = Math.floor(currentValue.x);
            const newVertical = obj.vertical === false ? currentVertical : Math.floor(obj.vertical);
            const newHorizontal = obj.horizontal === false ? currentHorizontal : Math.floor(obj.horizontal);
            const speed = typeof obj.speed !== 'undefined' ? obj.speed : window.player.speed;
            const easing = typeof obj.easing !== 'undefined' ? obj.easing : 'linear';

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
            kind: 'GET',
            controller: `${this.apiUrl}map-${map}.${this.api}`,
        };
        let data = window.helper.ajax(parameter);

        data.then((result) => window.map.buildMap(result));
    }

    loadPlayer() {
        const parameter = {
            kind: 'GET',
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

    remove(target) {
        if (target !== null) {
            target.parentNode.removeChild(target);
        }
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

        // 2d matrices have 6 values
        // Last 2 values are X and Y.
        // 2d matrices does not have Z value.
        if (matrixType === '2d') {
            return {
                x: Number(matrixValues[4]),
                y: Number(matrixValues[5]),
                z: 0
            };
        }

        // 3d matrices have 16 values
        // The 13th, 14th, and 15th values are X, Y, and Z
        if (matrixType === '3d') {
            return {
                x: Number(matrixValues[12]),
                y: Number(matrixValues[13]),
                z: Number(matrixValues[14])
            };
        }
    }
}

window.helper = new Helper();
class Interface {
    build() {
        this.update();
        this.buildAction();
        this.buildDirection();
    }

    buildAction() {
        this.elActionBackpack.onclick = () => {
            backpack.open();
        };

        this.elActionCraft.onclick = () => {
            craft.open();
        };

        this.elActionCatch.onclick = () => {
            player.catch();
        };

        this.elActionHit.onclick = () => {
            player.hit();
        };
    }

    buildDirection() {
        this.elDirectionalUp.onclick = () => {
            player.move('up');
        };

        this.elDirectionalDown.onclick = () => {
            player.move('down');
        };

        this.elDirectionalLeft.onclick = () => {
            player.move('left');
        };

        this.elDirectionalRight.onclick = () => {
            player.move('right');
        };
    }

    update() {
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
                window.player.move('up');
                window.map.move('up');
                break;
            case 'Left':
            case 'ArrowLeft':
            case 'a':
                window.player.move('left');
                window.map.move('left');
                break;
            case 'Down':
            case 'ArrowDown':
            case 's':
                window.player.move('down');
                window.map.move('down');
                break;
            case 'Right':
            case 'ArrowRight':
            case 'd':
                window.player.move('right');
                window.map.move('right');
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
        this.tileSize = 50;
        this.unity = 'px';
    }

    build() {
        this.update();
        window.data.loadMap(this.current);
    }

    buildMap(data) {
        this.json = JSON.parse(data);

        this.convertArray();
        this.buildHtml();
    }

    buildHtml() {
        const template = this.buildHtmlRow();

        this.elMap.style.width = `${this.tileSize * this.json.column}${this.unity}`;
        this.elMap.style.height = `${this.tileSize * this.json.row}${this.unity}`;
        this.elMap.innerHTML = '';
        this.elMap.insertAdjacentHTML('afterbegin', template);
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

            template += `<div class="tile tile--${trim}"></div>`;
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

    update() {
        this.elMap = document.querySelector('#map');
    }

    move(side) {
        console.log(side);
    }
}

window.map = new Map();
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

    update() {
        this.elPlayer = document.querySelector('#player');
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

    load() {
        window.data.loadPlayer();
    }

    catch () {
        console.log('catch');
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
class Theme {

}

window.theme = new Theme();
document.addEventListener('DOMContentLoaded', () => {
    window.interface.build();
    window.keyboard.build();
    window.map.build();
    window.player.build();
});