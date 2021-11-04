export class Keyboard {
    buildAction(key) {
        switch (key) {
            case 'Up':
            case 'ArrowUp':
            case 'w':
                player.walk('up');
                break;
            case 'Left':
            case 'ArrowLeft':
            case 'a':
                player.walk('left');
                break;
            case 'Down':
            case 'ArrowDown':
            case 's':
                player.walk('down');
                break;
            case 'Right':
            case 'ArrowRight':
            case 'd':
                player.walk('right');
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

    init() {
        document.addEventListener('keydown', (event) => {
            this.buildAction(event.key);
        });
        document.addEventListener('keyup', () => {
            player.walkStop();
        });
    }
}