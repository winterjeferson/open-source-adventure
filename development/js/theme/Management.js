class Management {
    verifyLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            this.build();
        });
    }

    build() {
        window.backpack.build();
        window.craft.build();
        window.enemy.build();
        window.interface.build();
        window.helper.build();
        window.item.build();
        window.map.build();
        window.player.build();
        window.theme.build();
    }
}