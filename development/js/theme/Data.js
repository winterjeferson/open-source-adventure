class Data {
    constructor(api) {
        this.api = api;
        this.apiUrl = `./api/${this.api}/`;
    }

    loadMap(map) {
        const parameter = {
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
        if (window.player.isInitial) {
            window.player.isInitial = false;
            this.loadPlayerInitial();
        } else {
            window.loadingMain.hide();
        }
    }

    loadPlayerInitial() {
        const parameter = {
            controller: `${this.apiUrl}player.${this.api}`,
        };
        let data = window.helper.ajax(parameter);

        data.then((result) => window.player.buildPlayer(result));
    }
}

window.data = new Data('json');