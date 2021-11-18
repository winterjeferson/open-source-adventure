window.animate = new Animate();
window.backpack = new Backpack();
window.camera = new Camera();
window.craft = new Craft();
window.configuration = new Configuration();
window.data = new Data();
window.enemy = new Enemy();
window.game = new Game();
window.helper = new Helper();
window.keyboard = new Keyboard();
window.loadingMain = new LoadingMain();
window.modal = new Modal();
window.pick = new Pick();
window.platform = new Platform();
window.player = new Player();
window.resource = new Resource();
window.terrain = new Terrain();


document.addEventListener('DOMContentLoaded', () => {
    data.update({
        'extension': 'js',
        'dataBase': 'localStorage'
    });
    loadingMain.update();
    modal.build();
    terrain.update();
    platform.build();
    keyboard.init();
    game.initialize();
});

addEventListener('resize', () => {
    platform.resize();
    camera.center();
});