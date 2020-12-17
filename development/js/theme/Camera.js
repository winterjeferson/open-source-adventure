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

    defineDistance() {
        const isLimit = false;

        if (isLimit) {
            this.distance = window.map.tileSize;
        } else {
            this.distance = window.map.tileSizeHalf;
        }
    }

    move(side) {
        let obj = {
            'target': window.interface.elMap
        };

        this.defineDistance();

        switch (side) {
            case 'down':
                obj.vertical = -this.distance;
                break;
            case 'left':
                obj.horizontal = this.distance;
                break;
            case 'up':
                obj.vertical = this.distance;
                break;
            case 'right':
                obj.horizontal = -this.distance;
                break;
        }

        window.player.move(side);
        window.animation.move(obj);
    }

    update() {
        this.limitBottom = Number(-(window.map.height - window.interface.elGameHeight));
        this.limitRight = Number(-(window.map.width - window.interface.elGameWidth));
    }
}

window.camera = new Camera();