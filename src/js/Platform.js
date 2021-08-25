export class Platform {
    build() {
        this.update();
        this.resize();
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

        this.elActionPick.onclick = () => {
            pick.pick();
        };

        this.elActionHit.onclick = () => {
            player.hit();
        };
    }

    buildDirection() {
        this.elDirectionalUp.onclick = () => {
            camera.move('up');
        };

        this.elDirectionalDown.onclick = () => {
            camera.move('down');
        };

        this.elDirectionalLeft.onclick = () => {
            camera.move('left');
        };

        this.elDirectionalRight.onclick = () => {
            camera.move('right');
        };
    }

    update() {
        this.elCamera = document.querySelector('#camera');
        this.elGame = document.querySelector('#game');
        this.elTerrain = document.querySelector('#terrain');
        this.elPlayer = document.querySelector('#player');
        this.elEnemy = document.querySelector(`#${enemy.cssEnemy}`);
        this.elResource = document.querySelector(`#${resource.cssResource}`);
        this.elPageBackpack = document.querySelector('#page_backpack');
        this.elPageBackpackContent = this.elPageBackpack.querySelector('.content');
        this.elPageCraft = document.querySelector('#page_craft');
        this.elPageCraftContent = this.elPageCraft.querySelector('.content');

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