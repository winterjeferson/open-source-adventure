class Map {
    constructor() {
        this.current = 0;
        this.json = {};
        this.arr = [];
        this.arrWalkFalse = [0];
        this.tileSize = 50;
        this.limit = {};
        this.tileId = 0;
        this.prefixTile = 'tile_';
    }

    buildMap(data) {
        this.json = JSON.parse(data);

        this.updateLimit();
        this.convertArray();
        this.buildHtml();
    }

    buildHtml() {
        const template = this.buildHtmlRow();

        window.theme.elMap.style.width = `${this.tileSize * this.json.column}px`;
        window.theme.elMap.style.height = `${this.tileSize * this.json.row}px`;
        window.theme.elMap.innerHTML = '';
        window.theme.elMap.insertAdjacentHTML('afterbegin', template);
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

            template += `<div class="tile tile--${trim}" id="${this.prefixTile}${this.tileId}"></div>`;
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
        const tile = this.prefixTile + obj.position;
        const elTarget = document.querySelector(`#${obj.target}`);
        const elTile = document.querySelector(`#${tile}`);
        const elTilePosition = window.helper.getOffset(elTile);
        const elGamePosition = window.helper.getOffset(window.theme.elGame);
        const positionReset = {
            top: elTilePosition.top - elGamePosition.top,
            left: elTilePosition.left - elGamePosition.left,
        };

        window.animation.move({
            'target': elTarget,
            'vertical': positionReset.top,
            'horizontal': positionReset.left,
            'speed': 0,
        });
    }

    update() {
        this.tileId = 0;
    }

    updateLimit() {
        this.limit = {
            'up': 0,
            'down': this.tileSize * this.json.column,
            'left': 0,
            'right': this.tileSize * this.json.row,
        };
    }
}

window.map = new Map();