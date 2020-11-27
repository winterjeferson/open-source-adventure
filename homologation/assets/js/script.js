<<<<<<< HEAD
class Backpack {
    build() {
        console.log('backpack build');
    }

    open() {
        console.log('backpack open');
    }
}
class Craft {
    build() {
        console.log('craft build');
    }

    open() {
        console.log('craft open');
    }
}
class Enemy {
    build() {
        console.log('enemy build');
    }
}
class Helper {
    build() {
        console.log('helper build');
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
    build() {
        console.log('item build');
    }
}
class Management {
    verifyLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            this.build();
        });
    }

    build() {
        window.backpack.build();
        window.craft.build();
        window.enemy.build();
        window.interface.build();
        window.helper.build();
        window.item.build();
        window.map.build();
        window.player.build();
        window.theme.build();
    }
}
class Map {
    build() {
        console.log('map build');
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

    build() {
        console.log('player build');
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
=======
class Management {
    verifyLoad() {
        window.addEventListener('load', this.build(), { once: true });
    }

    build() {
        console.log('loaded');
        window.theme.build();
    }
}
>>>>>>> f30f89632f009989ca6533a4990d22102f6383d5
class Theme {
    build() {
        console.log('theme build');
    }
}
<<<<<<< HEAD
window.backpack = new Backpack();
window.craft = new Craft();
window.enemy = new Enemy();
window.interface = new Interface();
window.item = new Item();
window.helper = new Helper();
window.management = new Management();
window.map = new Map();
window.player = new Player();
=======
window.management = new Management();
>>>>>>> f30f89632f009989ca6533a4990d22102f6383d5
window.theme = new Theme();

management.verifyLoad();