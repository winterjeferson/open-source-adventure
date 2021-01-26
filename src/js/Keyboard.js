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
            case 'Escape':
                window.modal.close();
                break;
            case 'b':
                window.backpack.open();
                break;
            case 'c':
                window.craft.open();
                break;
            case 'p':
                window.pick.pick();
                break;
            case 'h':
                window.player.hit();
                break;
        }
    }
}

export {
    Keyboard
};