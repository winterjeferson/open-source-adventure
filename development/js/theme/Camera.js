class Camera {
    move(side) {
        const capitalize = side.charAt(0).toUpperCase() + side.slice(1);

        window.player.move(side);

        this[`move${capitalize}`]({
            'target': window.interface.elMap
        });
    }

    moveDown(obj) {
        let vertical = -window.map.tileSize;
        let horizontal = false;

        window.animation.move({
            'target': obj.target,
            vertical,
            horizontal
        });
    }

    moveLeft(obj) {
        let vertical = false;
        let horizontal = window.map.tileSize;

        window.animation.move({
            'target': obj.target,
            vertical,
            horizontal
        });
    }

    moveUp(obj) {
        let vertical = window.map.tileSize;
        let horizontal = false;

        window.animation.move({
            'target': obj.target,
            vertical,
            horizontal
        });
    }

    moveRight(obj) {
        let vertical = false;
        let horizontal = -window.map.tileSize;

        window.animation.move({
            'target': obj.target,
            vertical,
            horizontal
        });
    }
}

window.camera = new Camera();