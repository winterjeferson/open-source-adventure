class Map {
    constructor() {
        this.current = 0;
        this.json = {};
        this.arr = [];
        this.arrWalkFalse = [0];
        this.arrDoor = [2];
        this.tileSize = 50;
        this.tileSizeHalf = this.tileSize / 2;
        this.tileId = 0;
        this.tileIdPrefix = 'tile_';
    }

    buildMap(data) {
        this.json = JSON.parse(data);
        this.width = this.tileSize * this.json.column;
        this.height = this.tileSize * this.json.row;

        window.camera.update();
        this.convertArray();
        this.buildHtml();

        if (!window.player.isInitial) {
            window.player.position();
        }
    }

    buildHtml() {
        const template = this.buildHtmlRow();

        window.interface.elMap.style.width = `${this.width}px`;
        window.interface.elMap.style.height = `${this.height}px`;
        window.interface.elMap.innerHTML = '';
        window.interface.elMap.insertAdjacentHTML('afterbegin', template);
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
            let tile = this.arr[i][j];
            let trim = tile.trim();

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
        const playerTile = window.player.tileCurrent;
        const json = window.map.json.position;
        let nextMap;
        let nextTile;

        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                if (json[key].tile === playerTile) {
                    nextMap = json[key].sendToMap;
                    nextTile = json[key].sendToTile;
                }
            }
        }

        this.update();
        window.player.tileCurrent = nextTile;
        window.data.loadMap(nextMap);
    }

    position(obj) {
        const tile = this.tileIdPrefix + obj.position;
        const elTarget = obj.target;
        const elTile = document.querySelector(`#${tile}`);
        const elTilePosition = window.helper.getOffset(elTile);
        const elCameraPosition = window.helper.getOffset(window.interface.elCamera);
        const positionReset = {
            top: elTilePosition.top - elCameraPosition.top,
            left: elTilePosition.left - elCameraPosition.left,
        };

        window.animation.move({
            'target': elTarget,
            'vertical': Math.round(positionReset.top),
            'horizontal': Math.round(positionReset.left),
            'speed': 0,
        });
    }

    verifyDoor(tile) {
        return this.verifyTile({
            tile,
            'arr': 'arrDoor'
        });
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

        if (isInArray) {
            return true;
        } else {
            return false;
        }
    }

    update() {
        this.tileId = 0;
    }
}

window.map = new Map();