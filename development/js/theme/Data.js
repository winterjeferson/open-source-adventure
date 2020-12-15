class Data {
    constructor(api) {
        this.api = api;
        this.apiUrl = `./api/${this.api}/`;
    }

    loadMap(map) {
        const parameter = {
            kind: 'GET',
            controller: `${this.apiUrl}map-${map}.${this.api}`,
        };
        let data = window.helper.ajax(parameter);

        data.then((result) =>
                window.map.buildMap(result)
            )
            .then(() =>
                this.loadPlayer()
            );
    }

    loadPlayer() {
        const parameter = {
            kind: 'GET',
            controller: `${this.apiUrl}player.${this.api}`,
        };
        let data = window.helper.ajax(parameter);

        data.then((result) => window.player.buildPlayer(result));
    }
}

window.data = new Data('json');