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