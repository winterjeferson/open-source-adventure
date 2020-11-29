class Api {
    constructor() {
        this.api = 'js';
        this.apiUrl = `api/${this.api}/api.${this.api}`;
    }

    loadMap(obj) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            const kind = typeof obj.kind === 'undefined' ? 'GET' : obj.kind;
            const controller = this.apiUrl;

            xhr.open(kind, controller, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    this.loadMapSuccess(xhr.responseText);
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }

    loadMapSuccess(data) {
        const script = document.createElement('script');

        document.getElementsByTagName('head')[0].appendChild(script);
        script.text = data;
    }
}
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
        this.updateBar();
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
class Management {
    verifyLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            this.build();
        });
    }

    build() {
        window.interface.build();
        window.map.build();
    }
}
class Map {
    constructor() {
        this.current = 0;
        this.mapJson;
    }

    build() {
        this.load();
    }

    buildMap(data) {
        // console.log(data.response);
    }

    load() {
        const parameter = { 'map': this.current };
        let data = api.loadMap(parameter);

        data.then((response) => this.buildMap({ response }));
    }
}
class Player {
    constructor() {
        this.life = 100;
        this.lifeCurrent = 70;
        this.hunger = 100;
        this.hungerCurrent = 80;
        this.thirst = 100;
        this.thirstCurrent = 70;
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
window.api = new Api();
window.backpack = new Backpack();
window.craft = new Craft();
window.enemy = new Enemy();
window.interface = new Interface();
window.item = new Item();
window.management = new Management();
window.map = new Map();
window.player = new Player();
window.theme = new Theme();

management.verifyLoad();