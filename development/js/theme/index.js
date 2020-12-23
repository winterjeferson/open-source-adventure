document.addEventListener('DOMContentLoaded', () => {
    window.loadingMain.update();
    window.map.update();
    window.interface.build();
    window.keyboard.build();
    window.game.initialize();
});

window.addEventListener('resize', () => {
    window.interface.resize();
    window.camera.center();
});