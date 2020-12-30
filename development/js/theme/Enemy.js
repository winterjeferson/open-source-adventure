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
            html += `
                <div id="${this.cssEnemy}_${i}" class="${this.cssEnemy} ${this.cssEnemy}-${i} tile center">
                    ${i}
                </div>
            `;
        }

        return html;
    }

    setPosition() {
        for (let i = 0; i < this.enemyLength; i++) {
            const el = document.querySelector(`#${this.cssEnemy}_${i}`);

            window.map.position({
                'target': el,
                'position': i,
            });
        }
    }

    update() {
        this.elEnemy = document.querySelector(`#${this.cssEnemy}`);
    }
}

window.enemy = new Enemy();