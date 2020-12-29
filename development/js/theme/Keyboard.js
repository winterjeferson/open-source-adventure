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
                window.camera.move('up');
                break;
            case 'Left':
            case 'ArrowLeft':
            case 'a':
                window.camera.move('left');
                break;
            case 'Down':
            case 'ArrowDown':
            case 's':
                window.camera.move('down');
                break;
            case 'Right':
            case 'ArrowRight':
            case 'd':
                window.camera.move('right');
                break;
        }
    }
}

window.keyboard = new Keyboard();