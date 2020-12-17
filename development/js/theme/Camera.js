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

    centerVertical(positionPlayer) {
        const position = Number(-positionPlayer.y + (window.interface.elGameHeight / 2) - window.map.tileSizeHalf);

        return this.centerLimit(position, this.limitBottom);
    }

    centerHorizontal(positionPlayer) {
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
        const isWalk = window.player.verifyWalk(side);

        if (!isWalk) {
            return;
        }

        this.defineDistance();

        if (window.player.isMoving) {
            return;
        }

        window.player.move(side);
        this.moveMap(side);
    }

    moveMap(side) {
        const limit = window.map.limit[side];
        const capitalize = window.helper.capitalize(side);
        const currentPosition = window.helper.getTranslateValue(window.interface.elMap);
        const isLimit = this[`verifyLimit${capitalize}`]({
            limit,
            currentPosition
        });

        if (!isLimit) {
            return;
        }

        this.moveMapAnimate({
            side,
            currentPosition
        });
    }

    moveMapAnimate(args) {
        const horizontal = args.currentPosition.x;
        const vertical = args.currentPosition.y;
        let obj = {
            'target': window.interface.elMap
        };

        switch (args.side) {
            case 'down':
                obj.vertical = Math.round(vertical - this.distance);
                break;
            case 'left':
                obj.horizontal = Math.round(horizontal + this.distance);
                break;
            case 'up':
                obj.vertical = Math.round(vertical + this.distance);
                break;
            case 'right':
                obj.horizontal = Math.round(horizontal - this.distance);
                break;
        }

        window.animation.move(obj);
    }

    update() {
        this.limitBottom = Number(-(window.map.height - window.interface.elGameHeight));
        this.limitRight = Number(-(window.map.width - window.interface.elGameWidth));
    }

    verifyLimitDown(obj) {
        const limit = obj.limit;
        const limitMap = Math.abs(obj.currentPosition.y);

        if (limit >= limitMap) {
            return true;
        } else {
            return false;
        }
    }

    verifyLimitLeft(obj) {
        const limit = obj.limit;
        const limitMap = obj.currentPosition.x;

        if (limit >= limitMap) {
            return true;
        } else {
            return false;
        }
    }

    verifyLimitRight(obj) {
        const limit = obj.limit;
        const limitMap = Math.abs(obj.currentPosition.x);

        if (limit >= limitMap) {
            return true;
        } else {
            return false;
        }
    }

    verifyLimitUp(obj) {
        const limit = obj.limit;
        const limitMap = obj.currentPosition.y;

        if (limit >= limitMap) {
            return true;
        } else {
            return false;
        }
    }
}

window.camera = new Camera();