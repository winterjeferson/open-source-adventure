class Map {
    constructor() {
        this.current = 0;
        this.json = {};
        this.arr = [];
        this.tileSize = 50;
        this.unity = 'px';
    }

    build() {
        this.update();
        window.data.loadMap(this.current);
    }

    buildMap(data) {
        this.json = JSON.parse(data);

        this.convertArray();
        this.buildHtml();
    }

    buildHtml() {
        const template = this.buildHtmlRow();

        this.elMap.style.width = `${this.tileSize * this.json.column}${this.unity}`;
        this.elMap.style.height = `${this.tileSize * this.json.row}${this.unity}`;
        this.elMap.innerHTML = '';
        this.elMap.insertAdjacentHTML('afterbegin', template);
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

            template += `<div class="tile tile--${trim}"></div>`;
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

    update() {
        this.elMap = document.querySelector('#map');
    }

    move(side) {
        console.log(side);
    }
}

window.map = new Map();