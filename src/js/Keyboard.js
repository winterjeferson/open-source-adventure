export class Keyboard {
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
                camera.move('up');
                break;
            case 'Left':
            case 'ArrowLeft':
            case 'a':
                camera.move('left');
                break;
            case 'Down':
            case 'ArrowDown':
            case 's':
                camera.move('down');
                break;
            case 'Right':
            case 'ArrowRight':
            case 'd':
                camera.move('right');
                break;
            case 'Escape':
                modal.close();
                break;
            case 'b':
                backpack.open();
                break;
            case 'c':
                craft.open();
                break;
            case 'p':
                pick.pick();
                break;
            case 'h':
                player.hit();
                break;
        }
    }
}