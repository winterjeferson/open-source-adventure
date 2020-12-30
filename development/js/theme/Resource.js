class Resource {
    constructor() {
        this.cssResource = 'resource';
        this.cssItem = 'item';
    }

    build() {
        this.resourceLength = window.map.json.resource.quantity;

        const html = this.buildHtml();

        this.elItem.innerHTML = html;
        this.setPosition();
    }

    buildHtml() {
        let html = '';

        for (let i = 0; i < this.resourceLength; i++) {
            let random = window.helper.raffleArray(window.map.json.resource.kind);

            html += `
                <div id="${this.cssItem}_${i}" class="${this.cssItem} ${this.cssItem}--${random} tile center">
                    Item ${i}
                </div>
            `;
        }

        return html;
    }

    setPosition() {
        for (let i = 0; i < this.resourceLength; i++) {
            const target = document.querySelector(`#${this.cssItem}_${i}`);
            const position = window.map.rafflePosition();

            window.map.position({
                target,
                position,
            });
        }
    }

    update() {
        this.elItem = document.querySelector(`#${this.cssResource}`);
    }
}

window.resource = new Resource();