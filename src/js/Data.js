export class Data {
    loadMap(map) {
        const parameter = {
            controller: `${this.apiUrl}map-${map}.${this.extension}`,
        };
        let data = helper.ajax(parameter);

        data
            .then((result) => {
                terrain.buildMap(result);
            })
            .then(() => {
                this.loadPlayer();
            })
            .then(() => {
                enemy.build();
                this.save();
            });
    }

    loadPlayer() {
        if (player.isInitial) {
            player.isInitial = false;
            this.loadPlayerInitial();
            return;

        }
        loadingMain.hide();
    }

    loadPlayerInitial() {
        const parameter = {
            controller: `${this.apiUrl}player.${this.extension}`,
        };
        let data = helper.ajax(parameter);

        data.then((result) => {
            player.buildPlayer(result);
        });
    }

    save() {
        const parameter = {
            controller: `${this.apiUrl}save.${this.extension}`,
        };
        let data = helper.ajax(parameter);

        data.then((result) => {
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