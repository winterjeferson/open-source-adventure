class Data {
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
                this.loadPlayer();
            })
            .then(() => {
                window.enemy.build();
                this.save();
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
        const parameter = {
            controller: `${this.apiUrl}save.${this.extension}`,
        };
        let data = window.helper.ajax(parameter);

        data
            .then((result) => {
                console.log(result);
            });
    }

    update(obj) {
        this.extension = obj.extension;
        this.dataBase = obj.extension;
        this.folderDefault = `./api-${this.extension}/`;
        this.apiUrl = `${this.folderDefault}/`;
    }
}

export {
    Data
};