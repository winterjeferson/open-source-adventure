class Camera {
    center() {
        this.update();

        window.animation.move({
            'target': window.interface.elCamera,
            'vertical': this.centerVertical(),
            'horizontal': this.centerHorizontal(),
            'speed': 0
        });
    }

    centerVertical() {
        const positionPlayer = window.helper.getTranslateValue(window.interface.elPlayer);
        const position = Number(-positionPlayer.y + (window.interface.elGameHeight / 2) - window.map.tileSizeHalf);

        return this.centerLimit(position, this.limitBottom);
    }

    centerHorizontal() {
        const positionPlayer = window.helper.getTranslateValue(window.interface.elPlayer);
        const position = Number(-positionPlayer.x + (window.interface.elGameWidth / 2) - window.map.tileSizeHalf);

        return this.centerLimit(position, this.limitRight);
    }

    centerLimit(position, limit) {
        if (position < limit) {
            return limit;
        }

        if (position > 0) {
            return 0;
        }

        return position;
    }

    move(side) {
        const capitalize = window.helper.capitalize(side);
        const isLimit = false;

        window.player.move(side);

        if (isLimit) {
            this.distance = window.map.tileSize;
            return;
        } else {
            this.distance = window.map.tileSizeHalf;
        }

        this[`move${capitalize}`]({
            'target': window.interface.elMap
        });
    }

    moveDown(obj) {
        let vertical = -this.distance;
        let horizontal = false;

        window.animation.move({
            'target': obj.target,
            vertical,
            horizontal
        });
    }

    moveLeft(obj) {
        let vertical = false;
        let horizontal = this.distance;

        window.animation.move({
            'target': obj.target,
            vertical,
            horizontal
        });
    }

    moveUp(obj) {
        let vertical = this.distance;
        let horizontal = false;

        window.animation.move({
            'target': obj.target,
            vertical,
            horizontal
        });
    }

    moveRight(obj) {
        let vertical = false;
        let horizontal = -this.distance;

        window.animation.move({
            'target': obj.target,
            vertical,
            horizontal
        });
    }

    update() {
        this.limitBottom = Number(-(window.map.height - window.interface.elGameHeight));
        this.limitRight = Number(-(window.map.width - window.interface.elGameWidth));
    }
}

window.camera = new Camera();