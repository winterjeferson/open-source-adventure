export class Camera {
    center() {
        const positionPlayer = helper.getTranslateValue(platform.elPlayer);

        this.update();

        animate.move({
            'target': platform.elCamera,
            'vertical': this.centerVertical(positionPlayer),
            'horizontal': this.centerHorizontal(positionPlayer),
            'speed': 0
        });
    }

    centerHorizontal(positionPlayer) {
        const position = Number(-positionPlayer.x + (platform.elGameWidth / 2) - terrain.tileSizeHalf);

        return this.centerLimit(position, this.limit.centerHorizontal);
    }

    centerVertical(positionPlayer) {
        const position = Number(-positionPlayer.y + (platform.elGameHeight / 2) - terrain.tileSizeHalf);

        return this.centerLimit(position, this.limit.centerVertical);
    }

    centerLimit(position, limit) {
        if (position < limit) return limit;
        if (position > 0) return 0;

        return position;
    }

    move(side) {
        const isWalkFalse = player.verifyWalk(side);

        if (isWalkFalse || player.isMoving) return;

        player.move(side);
        this.moveCamera(side);
    }

    moveCamera(side) {
        const limit = this.limit[side];
        const capitalize = helper.capitalize(side);
        const currentPosition = helper.getTranslateValue(platform.elCamera);
        const isLimit = this[`verifyLimit${capitalize}`]({
            limit,
            currentPosition
        });

        if (isLimit) return;

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
            'target': platform.elCamera
        };

        switch (args.side) {
            case 'down':
                value = Math.round(vertical - this.distance);

                if (Math.abs(camera.limit.down) - (Math.abs(vertical)) < this.distance) value = camera.limit.down;

                obj.vertical = value;
                break;
            case 'left':
                value = Math.round(horizontal + this.distance);

                if (Math.abs(horizontal) < this.distance) value = camera.limit.left;

                obj.horizontal = value;
                break;
            case 'up':
                value = Math.round(vertical + this.distance);

                if (Math.abs(value) <= this.distance) value = this.limit.up;

                obj.vertical = value;
                break;
            case 'right':
                value = Math.round(horizontal - this.distance);

                if ((platform.elGameWidth / 2) - this.distance - (Math.abs(horizontal)) < this.distance) value = camera.limit.right * -1;

                obj.horizontal = value;
                break;
        }

        animate.move(obj);
    }

    update() {
        this.distance = terrain.tileSize;
        this.limit = {
            'centerVertical': Number(-(terrain.height - platform.elGameHeight)),
            'centerHorizontal': Number(-(terrain.width - platform.elGameWidth)),
            'up': 0,
            'down': Math.abs(terrain.tileSize * terrain.json.row - platform.elGameHeight) * -1,
            'left': 0,
            'right': terrain.tileSize * terrain.json.column - platform.elGameWidth,
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