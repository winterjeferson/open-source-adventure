class Data {
    constructor() {
        this.folderDefault = './api/';
    }

    buildJavascript() {
        this.extension = 'json';
        this.apiUrl = `${this.folderDefault}js/`;
    }

    loadMap(map) {
        const parameter = {
            controller: `${this.apiUrl}map-${map}.${this.extension}`,
        };
        let data = window.helper.ajax(parameter);

        data
            .then((result) => {
                window.map.buildMap(result);
            })
            .then(() => {
                this.save();
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
            controller: `${this.apiUrl}player.${this.extension}`,
        };
        let data = window.helper.ajax(parameter);

        data.then((result) => {
            window.player.buildPlayer(result);
        });
    }

    save() {
        console.log('save');
    }

    update(api) {
        const capitalize = window.helper.capitalize(api);
        const method = `build${capitalize}`;

        this[method]();
    }
}

window.data = new Data();