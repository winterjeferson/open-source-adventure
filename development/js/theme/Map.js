class Map {
    constructor() {
        this.current = 0;
        this.mapJson;
    }

    build() {
        this.load();
    }

    buildMap(data) {
        // console.log(data.response);
    }

    load() {
        const parameter = { 'map': this.current };
        let data = api.loadMap(parameter);

        data.then((response) => this.buildMap({ response }));
    }
}