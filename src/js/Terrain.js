export class Terrain {
    constructor() {
        this.current = 1;
        this.json = {};
        this.arr = [];
        this.arrWalkFalse = [0];
        this.arrDoor = [2];
        this.tileSize = 48;
        this.tileSizeHalf = this.tileSize / 2;
        this.tileId = 0;
        this.tileIdPrefix = 'tile_';
        this.tileTotal = 0;
    }

    buildMap(data) {
        this.json = JSON.parse(data);
        this.width = this.tileSize * this.json.column;
        this.height = this.tileSize * this.json.row;

        camera.update();
        this.update();
        this.convertArray();
        this.buildHtml();
        enemy.build();
        resource.build();

        if (!player.isInitial) player.position();
    }

    buildHtml() {
        const template = this.buildHtmlRow();

        platform.elTerrain.style.width = `${this.width}px`;
        platform.elTerrain.style.height = `${this.height}px`;
        platform.elTerrain.innerHTML = '';
        platform.elTerrain.insertAdjacentHTML('afterbegin', template);
    }

    buildHtmlRow() {
        let template = '';

        for (let i = 0; i < this.json.row; i++) {
            template += this.buildHtmlColumn(i);
        }

        return template;
    }

    buildHtmlColumn(i) {
        let template = '';

        for (let j = 0; j < this.json.column; j++) {
            const tile = this.arr[i][j];
            const trim = Number(tile.trim());
            const isWalkFalse = this.arrWalkFalse.includes(trim);
            const isDoor = this.arrDoor.includes(trim);

            if (isWalkFalse || isDoor) this.arrForbidden.push(this.tileId);

            template += `<div class="tile tile--${trim}" data-tile="${trim}" id="${this.tileIdPrefix}${this.tileId}"></div>`;
            this.tileId++;
        }

        return template;
    }

    convertArray() {
        const json = this.json.map;
        const length = Object.keys(json).length;

        for (let i = 0; i < length; i++) {
            let split = json[i].split(',');
            this.arr[i] = split;
        }
    }

    change() {
        const playerTile = player.tileCurrent;
        const json = terrain.json.position;
        let nextMap;
        let nextTile;

        loadingMain.show();

        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                if (json[key].tile === playerTile) {
                    nextMap = json[key].sendToMap;
                    nextTile = json[key].sendToTile;
                }
            }
        }

        this.update();
        player.tileCurrent = nextTile;
        data.loadMap(nextMap);
    }

    position(obj) {
        const elTarget = obj.target;

        if (!elTarget) return;

        const tile = this.tileIdPrefix + obj.position;
        const elTile = document.querySelector(`#${tile}`);
        const elTilePosition = helper.getOffset(elTile);
        const elCameraPosition = helper.getOffset(platform.elCamera);
        const positionReset = {
            top: elTilePosition.top - elCameraPosition.top,
            left: elTilePosition.left - elCameraPosition.left,
        };

        animate.move({
            'target': elTarget,
            'vertical': Math.round(positionReset.top),
            'horizontal': Math.round(positionReset.left),
            'speed': 0,
        });
    }

    rafflePosition() {
        let result = this.rafflePositionRandom();

        while (this.arrForbidden.includes(result)) {
            result = this.rafflePositionRandom();
        }

        this.arrForbidden.push(result);
        return result;
    }

    rafflePositionRandom() {
        return helper.raffleNumber({
            'minimum': 0,
            'maximum': terrain.tileTotal
        });
    }

    removeItem(target) {
        helper.remove(target);
    }

    removeResource(target) {
        const array = this.arrResource;
        const index = array.indexOf(Number(target));

        if (index > -1) array.splice(index, 1);
    }

    verifyDoor(tile) {
        return this.verifyTile({
            tile,
            'arr': 'arrDoor'
        });
    }

    verifyResource(tile) {
        const isInArray = this.arrResource.includes(tile);

        return isInArray;
    }

    verifyWalk(tile) {
        return this.verifyTile({
            tile,
            'arr': 'arrWalkFalse'
        });
    }

    verifyTile(obj) {
        const target = document.querySelector(`#${this.tileIdPrefix}${obj.tile}`);
        const attribute = Number(target.getAttribute('data-tile'));
        const isInArray = this[obj.arr].includes(attribute);

        if (isInArray) return true;
        return false;
    }

    update() {
        this.tileId = 0;
        this.tileTotal = terrain.json.row * terrain.json.column;
        this.arrForbidden = [];
        this.arrResource = [];
    }
}