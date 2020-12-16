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