document.addEventListener('DOMContentLoaded', () => {
    window.data.update('json');
    window.loadingMain.update();
    window.modal.build();
    window.map.update();
    window.interface.build();
    window.enemy.update();
    window.resource.update();
    window.keyboard.build();
    window.game.initialize();
});

window.addEventListener('resize', () => {
    window.interface.resize();
    window.camera.center();
});