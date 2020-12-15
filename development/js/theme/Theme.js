class Theme {
    update() {
        this.elGame = document.querySelector('#game');
        this.elMap = document.querySelector('#map');
        this.elPlayer = document.querySelector('#player');
    }
}

window.theme = new Theme();