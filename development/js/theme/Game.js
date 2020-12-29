class Game {
    initialize() {
        window.data.loadMap(window.map.current);
    }
}

window.game = new Game();