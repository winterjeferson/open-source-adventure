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