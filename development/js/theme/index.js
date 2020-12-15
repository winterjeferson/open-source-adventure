document.addEventListener('DOMContentLoaded', () => {
    window.theme.update();
    window.interface.build();
    window.keyboard.build();
    window.map.update();
    window.data.loadData();
});