document.addEventListener('DOMContentLoaded', () => {
    window.data.update({
        'extension': 'js',
        'dataBase': 'localStorage'
    });
    window.loadingMain.update();
    window.modal.build();
    window.map.update();
    window.interface.build();
    window.keyboard.build();
    window.game.initialize();
});

window.addEventListener('resize', () => {
    window.interface.resize();
    window.camera.center();
});