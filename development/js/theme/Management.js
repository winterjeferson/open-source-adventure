class Management {
    verifyLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            this.build();
        });
    }

    build() {
        window.interface.build();
        window.map.build();
    }
}