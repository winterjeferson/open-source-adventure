class Api {
    constructor() {
        this.api = 'js';
        this.apiUrl = `api/${this.api}/api.${this.api}`;
    }

    loadMap(obj) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            const kind = typeof obj.kind === 'undefined' ? 'GET' : obj.kind;
            const controller = this.apiUrl;

            xhr.open(kind, controller, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    this.loadMapSuccess(xhr.responseText);
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }

    loadMapSuccess(data) {
        const script = document.createElement('script');

        document.getElementsByTagName('head')[0].appendChild(script);
        script.text = data;
    }
}