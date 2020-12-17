class Map {
    constructor() {
        this.current = 0;
        this.json = {};
        this.arr = [];
        this.arrWalkFalse = [0];
        this.tileSize = 50;
        this.tileSizeHalf = this.tileSize / 2;
        this.limit = {};
        this.tileId = 0;
        this.tileIdPrefix = 'tile_';
    }

    buildMap(data) {
        this.json = JSON.parse(data);
        this.width = this.tileSize * this.json.column;
        this.height = this.tileSize * this.json.row;

        this.updateLimit();
        this.convertArray();
        this.buildHtml();
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

    position(obj) {
        const tile = this.tileIdPrefix + obj.position;
        const elTarget = obj.target;
        const elTile = document.querySelector(`#${tile}`);
        const elTilePosition = window.helper.getOffset(elTile);
        const elGamePosition = window.helper.getOffset(window.interface.elGame);
        const positionReset = {
            top: elTilePosition.top - elGamePosition.top,
            left: elTilePosition.left - elGamePosition.left,
        };

        window.animation.move({
            'target': elTarget,
            'vertical': Math.round(positionReset.top),
            'horizontal': Math.round(positionReset.left),
            'speed': 0,
        });
    }

    verifyWalk(tile) {
        const target = document.querySelector(`#${this.tileIdPrefix}${tile}`);
        const attribute = Number(target.getAttribute('data-tile'));
        const isInArray = this.arrWalkFalse.includes(attribute);

        if (isInArray) {
            return false;
        }

        return true;
    }

    update() {
        this.tileId = 0;
    }

    updateLimit() {
        this.limit = {
            'up': 0,
            'down': this.tileSize * this.json.row - window.interface.elGameHeight,
            'left': 0,
            'right': this.tileSize * this.json.column - window.interface.elGameWidth,
        };
    }
}

window.map = new Map();