class Data {
    loadMap(map) {
        const parameter = {
            controller: `${this.apiUrl}map-${map}.${this.api}`,
        };
        let data = window.helper.ajax(parameter);

        data
            .then((result) => {
                window.map.buildMap(result);
            })
            .then(() => {
                this.loadPlayer();
            })
            .then(() => {
                window.enemy.build();
            });
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

        data.then((result) => {
            window.player.buildPlayer(result);
        });
    }

    update(api) {
        this.api = api;
        this.apiUrl = `./api/${this.api}/`;
    }
}

window.data = new Data();