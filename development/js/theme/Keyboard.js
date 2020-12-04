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