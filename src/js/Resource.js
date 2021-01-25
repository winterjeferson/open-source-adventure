class Resource {
    constructor() {
        this.cssResource = 'resource';
        this.cssItem = 'item';
    }

    build() {
        this.resourceLength = window.map.json.resource.quantity;

        const html = this.buildHtml();

        window.interface.elResource.innerHTML = html;
        this.setPosition();
    }

    buildHtml() {
        let html = '';

        for (let i = 0; i < this.resourceLength; i++) {
            let random = window.helper.raffleArray(window.map.json.resource.kind);

            html += `
                <div id="${this.cssItem}_${i}"
                    class="${this.cssItem} ${this.cssItem}--${random} tile center" data-item="${random}"
                    data-amount="1"
                    data-tile=""
                >
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

            target.setAttribute('data-tile', position);
            window.map.arrResource.push(position);
            window.map.position({
                target,
                position,
            });
        }
    }
}

export {
    Resource
};