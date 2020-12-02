class Management {
    verifyLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            this.build();
        });
    }

    build() {
        window.interface.build();
        window.keyboard.build();
        window.map.build();
        window.player.build();
    }
}