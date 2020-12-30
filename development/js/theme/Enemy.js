class Enemy {
    constructor() {
        this.cssEnemy = 'enemy';
    }

    build() {
        this.enemyLength = window.map.json.enemy.quantity;

        const html = this.buildHtml();

        this.elEnemy.innerHTML = html;
        this.setPosition();
    }

    buildHtml() {
        let html = '';

        for (let i = 0; i < this.enemyLength; i++) {
            let random = window.helper.raffleArray(window.map.json.enemy.kind);

            html += `
                <div id="${this.cssEnemy}_${i}" class="${this.cssEnemy} ${this.cssEnemy}--${random} tile center">
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

            window.map.position({
                target,
                position,
            });
        }
    }

    update() {
        this.elEnemy = document.querySelector(`#${this.cssEnemy}`);
    }
}

window.enemy = new Enemy();