export class Resource {
    constructor() {
        this.cssResource = 'resource';
        this.cssItem = 'item';
    }

    build() {
        this.resourceLength = terrain.json.resource.quantity;

        const html = this.buildHtml();

        platform.elResource.innerHTML = html;
        this.setPosition();
    }

    buildHtml() {
        let html = '';

        for (let i = 0; i < this.resourceLength; i++) {
            let random = helper.raffleArray(terrain.json.resource.kind);

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
            const position = terrain.rafflePosition();

            target.setAttribute('data-tile', position);
            terrain.arrResource.push(position);
            terrain.position({
                target,
                position,
            });
        }
    }
}