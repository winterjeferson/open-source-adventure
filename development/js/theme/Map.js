class Map {
    constructor() {
        this.current = 0;
        this.json = {};
    }

    build() {
        this.load();
    }

    buildMap(data) {
        this.json = JSON.parse(data);
        this.decode();
    }

    decode() {

    }

    load() {
        window.data.loadMap(this.current);
    }
}