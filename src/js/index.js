window.animation = new Animation();
window.backpack = new Backpack();
window.camera = new Camera();
window.craft = new Craft();
window.data = new Data();
window.enemy = new Enemy();
window.game = new Game();
window.helper = new Helper();
window.interface = new Interface();
window.keyboard = new Keyboard();
window.loadingMain = new LoadingMain();
window.map = new Map();
window.modal = new Modal();
window.pick = new Pick();
window.player = new Player();
window.resource = new Resource();



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