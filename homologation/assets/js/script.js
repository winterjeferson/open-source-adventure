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
            kind: 'POST',
            controller: `${this.apiUrl}map-${map}.${this.api}`,
        };
        let data = window.helper.ajax(parameter);

        data.then((result) => window.map.buildMap(result));
    }

    loadPlayer() {
        const parameter = {
            kind: 'POST',
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
    }

    build() {
        this.load();
    }

    buildMap(data) {
        this.json = JSON.parse(data);
        this.decode();
    }

    decode() {

    }

    load() {
        window.data.loadMap(this.current);
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

    catch() {
        console.log('catch');
    }

    hit() {
        console.log('hit');
    }

    moveUp() {
        console.log('moveUp');
    }

    moveDown() {
        console.log('moveDown');
    }

    moveLeft() {
        console.log('moveLeft');
    }

    moveRight() {
        console.log('moveRight');
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