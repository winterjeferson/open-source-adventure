class Camera {
    center() {
        const positionPlayer = window.helper.getTranslateValue(window.interface.elPlayer);

        this.update();

        window.animation.move({
            'target': window.interface.elCamera,
            'vertical': this.centerVertical(positionPlayer),
            'horizontal': this.centerHorizontal(positionPlayer),
            'speed': 0
        });
    }

    centerHorizontal(positionPlayer) {
        const position = Number(-positionPlayer.x + (window.interface.elGameWidth / 2) - window.map.tileSizeHalf);

        return this.centerLimit(position, this.limit.centerHorizontal);
    }

    centerVertical(positionPlayer) {
        const position = Number(-positionPlayer.y + (window.interface.elGameHeight / 2) - window.map.tileSizeHalf);

        return this.centerLimit(position, this.limit.centerVertical);
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
        const isWalkFalse = window.player.verifyWalk(side);

        if (isWalkFalse || window.player.isMoving) {
            return;
        }

        window.player.move(side);
        this.moveCamera(side);
    }

    moveCamera(side) {
        const limit = this.limit[side];
        const capitalize = window.helper.capitalize(side);
        const currentPosition = window.helper.getTranslateValue(window.interface.elCamera);
        const isLimit = this[`verifyLimit${capitalize}`]({
            limit,
            currentPosition
        });

        if (isLimit) {
            return;
        }

        this.moveCameraAnimate({
            side,
            currentPosition
        });
    }

    moveCameraAnimate(args) {
        const horizontal = args.currentPosition.x;
        const vertical = args.currentPosition.y;
        let value;
        let obj = {
            'target': window.interface.elCamera
        };

        switch (args.side) {
            case 'down':
                value = Math.round(vertical - this.distance);

                if (Math.abs(window.camera.limit.down) - (Math.abs(vertical)) < this.distance) {
                    value = window.camera.limit.down;
                }

                obj.vertical = value;
                break;
            case 'left':
                value = Math.round(horizontal + this.distance);

                if (Math.abs(horizontal) < this.distance) {
                    value = window.camera.limit.left;
                }

                obj.horizontal = value;
                break;
            case 'up':
                value = Math.round(vertical + this.distance);

                if (Math.abs(value) <= this.distance) {
                    value = this.limit.up;
                }

                obj.vertical = value;
                break;
            case 'right':
                value = Math.round(horizontal - this.distance);

                if ((window.interface.elGameWidth / 2) - this.distance - (Math.abs(horizontal)) < this.distance) {
                    value = window.camera.limit.right * -1;
                }

                obj.horizontal = value;
                break;
        }

        window.animation.move(obj);
    }

    update() {
        this.distance = window.map.tileSize;
        this.limit = {
            'centerVertical': Number(-(window.map.height - window.interface.elGameHeight)),
            'centerHorizontal': Number(-(window.map.width - window.interface.elGameWidth)),
            'up': 0,
            'down': Math.abs(window.map.tileSize * window.map.json.row - window.interface.elGameHeight) * -1,
            'left': 0,
            'right': window.map.tileSize * window.map.json.column - window.interface.elGameWidth,
        };
    }

    verifyLimitDown(obj) {
        const limit = obj.currentPosition.y;

        return obj.limit > limit ? true : false;
    }

    verifyLimitLeft(obj) {
        const limit = obj.currentPosition.x;

        return obj.limit > limit ? false : true;
    }

    verifyLimitRight(obj) {
        const limit = Math.abs(obj.currentPosition.x);

        return obj.limit < limit ? true : false;
    }

    verifyLimitUp(obj) {
        const limit = obj.currentPosition.y;

        return obj.limit < limit ? true : false;
    }
}

window.camera = new Camera();