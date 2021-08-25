export class Backpack {
    constructor() {
        this.objItem = {};
        this.isUpdate = false;
    }

    addItem(target) {
        const item = Number(target.getAttribute('data-item'));
        const amount = Number(target.getAttribute('data-amount'));

        this.isUpdate = true;

        if (typeof this.objItem[item] === 'undefined') {
            this.objItem[item] = amount;
        } else {
            this.objItem[item] += amount;
        }
    }

    build() {
        let html = '';

        for (let i in this.objItem) {
            html += this.buildHtml(i, this.objItem[i]);
        }

        platform.elPageBackpackContent.innerHTML = html;
    }

    buildHtml(index, value) {
        return `
            <div class="item-wrapper">
                <div class="item item--${index} tile center"></div>
                <input class="input" type="number" value="${value}" aria-label="number">
            </div>
        `;
    }

    open() {
        modal.open('backpack');

        if (!this.isUpdate) return;

        this.isUpdate = false;
        this.build();
    }
}