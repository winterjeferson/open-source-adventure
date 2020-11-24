class Management {
    verifyLoad() {
        window.addEventListener('load', this.build(), { once: true });
    }

    build() {
        console.log('loaded');
        window.theme.build();
    }
}