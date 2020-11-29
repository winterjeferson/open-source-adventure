class ApiData {
    constructor() {
        this.urlDataBase = './data-base/json/map-1.json';
    }

    build() {
        const parameter = `&map=${this.current}`;
        let data = this.loadMap({ parameter: parameter });

        data.then((response) => this.loadMapSuccess(response));
    }

    loadMapSuccess(response) {
        window.map.mapJson = JSON.parse(response);
    }

    loadMap(obj) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            const parameter = `&method=loadMap&id=${obj.map}`;
            const kind = typeof obj.kind === 'undefined' ? 'GET' : obj.kind;
            const controller = typeof obj.controller === 'undefined' ? this.urlDataBase : obj.controller;

            xhr.open(kind, controller, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(parameter);
        });
    }
}