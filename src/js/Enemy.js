class Enemy {
    constructor() {
        this.cssEnemy = 'enemy';
    }

    build() {
        this.enemyLength = window.map.json.enemy.quantity;

        const html = this.buildHtml();

        window.interface.elEnemy.innerHTML = html;
        this.setPosition();
    }

    buildHtml() {
        let html = '';

        for (let i = 0; i < this.enemyLength; i++) {
            let random = window.helper.raffleArray(window.map.json.enemy.kind);

            html += `
                <div id="${this.cssEnemy}_${i}"
                    class="tile center ${this.cssEnemy} ${this.cssEnemy}--${random}"
                    data-amount="1"
                    data-tile=""
                >
                    Enemy ${i}
                </div>
            `;
        }

        return html;
    }

    setPosition() {
        for (let i = 0; i < this.enemyLength; i++) {
            const target = document.querySelector(`#${this.cssEnemy}_${i}`);
            const position = window.map.rafflePosition();

            target.setAttribute('data-tile', position);
            window.map.position({
                target,
                position,
            });
        }
    }
}

export {
    Enemy
};