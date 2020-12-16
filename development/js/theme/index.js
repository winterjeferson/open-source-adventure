document.addEventListener('DOMContentLoaded', () => {
    window.interface.build();
    window.keyboard.build();
    window.map.update();
    window.data.loadMap(window.map.current);
});

window.addEventListener('resize', () => {
    window.interface.resize();
    window.camera.center();
});