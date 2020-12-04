class Backpack {
    open() {
        console.log('backpack open');
    }
}
class Craft {
    open() {
        console.log('craft open');
    }
}
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
class Enemy {

}
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
}
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
            player.moveUp();
        };

        this.elDirectionalDown.onclick = () => {
            player.moveDown();
        };

        this.elDirectionalLeft.onclick = () => {
            player.moveLeft();
        };

        this.elDirectionalRight.onclick = () => {
            player.moveRight();
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
class Item {
    
}
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
class Management {
    verifyLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            this.build();
        });
    }

    build() {
        window.interface.build();
        window.keyboard.build();
        window.map.build();
        window.player.build();
    }
}
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
class Player {
    constructor() {
        // https://github.com/bgrins/javascript-astar
    }

    build() {
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
        console.log(side);
    }
}
class Theme {

}
window.helper = new Helper();
window.data = new Data('json');
window.backpack = new Backpack();
window.craft = new Craft();
window.enemy = new Enemy();
window.interface = new Interface();
window.item = new Item();
window.keyboard = new Keyboard();
window.management = new Management();
window.map = new Map();
window.player = new Player();
window.theme = new Theme();

management.verifyLoad();