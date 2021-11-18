export class Animate {
    constructor() {
        this.arrCssWalk = [
            'walk--top',
            'walk--right',
            'walk--bottom',
            'walk--left',
            'stand--top',
            'stand--right',
            'stand--bottom',
            'stand--left',
        ];
    }

    move(obj) {
        return new Promise((resolve) => {
            const currentValue = helper.getTranslateValue(obj.target);
            const currentVertical = Math.floor(currentValue.y);
            const currentHorizontal = Math.floor(currentValue.x);
            const newVertical = typeof obj.vertical === 'undefined' ? currentVertical : Math.floor(obj.vertical);
            const newHorizontal = typeof obj.horizontal === 'undefined' ? currentHorizontal : Math.floor(obj.horizontal);
            const speed = typeof obj.speed === 'undefined' ? player.speed : obj.speed;
            const easing = typeof obj.easing === 'undefined' ? 'linear' : obj.easing;
            const animation = obj.target.animate([{
                    transform: `translate(${currentHorizontal}px, ${currentVertical}px)`
                },
                {
                    transform: `translate(${newHorizontal}px, ${newVertical}px)`
                }
            ], {
                duration: speed,
                iterations: 1,
                easing: easing,
                fill: 'both'
            });

            animation.onfinish = (event) => {
                resolve(event);
            };
        });
    }

    walk(el, css) {
        this.arrCssWalk.forEach((item) => {
            helper.removeClass(el, item);
        });
        helper.addClass(el, css);
    }
}
export class Backpack {
    constructor() {
        this.objItem = {};
        this.isUpdate = false;
    }

    addItem(target) {
        const item = Number(target.getAttribute('data-item'));
        const amount = Number(target.getAttribute('data-amount'));

        this.isUpdate = true;

        if (typeof this.objItem[item] === 'undefined') {
            this.objItem[item] = amount;
        } else {
            this.objItem[item] += amount;
        }
    }

    build() {
        let html = '';

        for (let i in this.objItem) {
            html += this.buildHtml(i, this.objItem[i]);
        }

        platform.elPageBackpackContent.innerHTML = html;
    }

    buildHtml(index, value) {
        return `
            <div class="item-wrapper">
                <div class="item item--${index} tile center"></div>
                <input class="input" type="number" value="${value}" aria-label="number">
            </div>
        `;
    }

    open() {
        modal.open('backpack');

        if (!this.isUpdate) return;

        this.isUpdate = false;
        this.build();
    }
}
export class Camera {
    center() {
        const positionPlayer = helper.getTranslateValue(platform.elPlayer);

        this.update();

        animate.move({
            'target': platform.elCamera,
            'vertical': this.centerVertical(positionPlayer),
            'horizontal': this.centerHorizontal(positionPlayer),
            'speed': 0
        });
    }

    centerHorizontal(positionPlayer) {
        const position = Number(-positionPlayer.x + (platform.elGameWidth / 2) - terrain.tileSizeHalf);

        return this.centerLimit(position, this.limit.centerHorizontal);
    }

    centerVertical(positionPlayer) {
        const position = Number(-positionPlayer.y + (platform.elGameHeight / 2) - terrain.tileSizeHalf);

        return this.centerLimit(position, this.limit.centerVertical);
    }

    centerLimit(position, limit) {
        if (position < limit) return limit;
        if (position > 0) return 0;

        return position;
    }

    move(side) {
        const isWalkFalse = player.verifyWalk(side);

        if (isWalkFalse || player.isMoving) return;

        player.move(side);
        this.moveCamera(side);
    }

    moveCamera(side) {
        const limit = this.limit[side];
        const capitalize = helper.capitalize(side);
        const currentPosition = helper.getTranslateValue(platform.elCamera);
        const isLimit = this[`verifyLimit${capitalize}`]({
            limit,
            currentPosition
        });

        if (isLimit) return;

        this.moveCameraAnimate({
            side,
            currentPosition
        });
    }

    moveCameraAnimate(args) {
        const horizontal = args.currentPosition.x;
        const vertical = args.currentPosition.y;
        let value;
        let obj = {
            'target': platform.elCamera
        };

        switch (args.side) {
            case 'down':
                value = Math.round(vertical - this.distance);

                if (Math.abs(camera.limit.down) - (Math.abs(vertical)) < this.distance) value = camera.limit.down;

                obj.vertical = value;
                break;
            case 'left':
                value = Math.round(horizontal + this.distance);

                if (Math.abs(horizontal) < this.distance) value = camera.limit.left;

                obj.horizontal = value;
                break;
            case 'up':
                value = Math.round(vertical + this.distance);

                if (Math.abs(value) <= this.distance) value = this.limit.up;

                obj.vertical = value;
                break;
            case 'right':
                value = Math.round(horizontal - this.distance);

                if ((platform.elGameWidth / 2) - this.distance - (Math.abs(horizontal)) < this.distance) value = camera.limit.right * -1;

                obj.horizontal = value;
                break;
        }

        animate.move(obj);
    }

    update() {
        this.distance = terrain.tileSize;
        this.limit = {
            'centerVertical': Number(-(terrain.height - platform.elGameHeight)),
            'centerHorizontal': Number(-(terrain.width - platform.elGameWidth)),
            'up': 0,
            'down': Math.abs(terrain.tileSize * terrain.json.row - platform.elGameHeight) * -1,
            'left': 0,
            'right': terrain.tileSize * terrain.json.column - platform.elGameWidth,
        };
    }

    verifyLimitDown(obj) {
        const limit = obj.currentPosition.y;

        return obj.limit > limit ? true : false;
    }

    verifyLimitLeft(obj) {
        const limit = obj.currentPosition.x;

        return obj.limit > limit ? false : true;
    }

    verifyLimitRight(obj) {
        const limit = Math.abs(obj.currentPosition.x);

        return obj.limit < limit ? true : false;
    }

    verifyLimitUp(obj) {
        const limit = obj.currentPosition.y;

        return obj.limit < limit ? true : false;
    }
}
export class Craft {

    open() {
        modal.open('craft');
    }
}
export class Data {
    loadMap(map) {
        const parameter = {
            controller: `${this.apiUrl}map-${map}.${this.extension}`,
        };
        let data = helper.ajax(parameter);

        data
            .then((result) => {
                terrain.buildMap(result);
            })
            .then(() => {
                this.loadPlayer();
            })
            .then(() => {
                enemy.build();
                this.save();
            });
    }

    loadPlayer() {
        if (player.isInitial) {
            player.isInitial = false;
            this.loadPlayerInitial();
            return;

        }
        loadingMain.hide();
    }

    loadPlayerInitial() {
        const parameter = {
            controller: `${this.apiUrl}player.${this.extension}`,
        };
        let data = helper.ajax(parameter);

        data.then((result) => {
            player.buildPlayer(result);
        });
    }

    save() {
        const parameter = {
            controller: `${this.apiUrl}save.${this.extension}`,
        };
        let data = helper.ajax(parameter);

        data.then((result) => {
            console.log(result);
        });
    }

    update(obj) {
        this.extension = obj.extension;
        this.dataBase = obj.extension;
        this.folderDefault = `./api-${this.extension}/`;
        this.apiUrl = `${this.folderDefault}/`;
    }
}
export class Enemy {
    constructor() {
        this.cssEnemy = 'enemy';
    }

    build() {
        this.enemyLength = terrain.json.enemy.quantity;

        const html = this.buildHtml();

        platform.elEnemy.innerHTML = html;
        this.setPosition();
    }

    buildHtml() {
        let html = '';

        for (let i = 0; i < this.enemyLength; i++) {
            let random = helper.raffleArray(terrain.json.enemy.kind);

            html += `
                <div id="${this.cssEnemy}_${i}"
                    class="tile center ${this.cssEnemy} ${this.cssEnemy}--${random}"
                    data-amount="1"
                    data-tile=""
                >
                    Enemy ${i}
                </div>
            `;
        }

        return html;
    }

    setPosition() {
        for (let i = 0; i < this.enemyLength; i++) {
            const target = document.querySelector(`#${this.cssEnemy}_${i}`);
            const position = terrain.rafflePosition();

            target.setAttribute('data-tile', position);
            terrain.position({
                target,
                position,
            });
        }
    }
}
export class Game {
    initialize() {
        data.loadMap(terrain.current);
    }
}
export class Helper {
    addClass(el, css) {
        if (!el) return;
        if (el.classList.contains(css)) return;

        el.classList.add(css);
    }

    ajax(obj) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            const kind = typeof obj.kind === 'undefined' ? 'GET' : obj.kind;

            xhr.open(kind, obj.controller, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(obj.parameter);
        });
    }

    capitalize(target) {
        return target.charAt(0).toUpperCase() + target.slice(1);
    }

    getOffset(target) {
        if (!target) return;

        const rect = target.getBoundingClientRect();

        return {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left
        };
    }

    getTranslateValue(target) {
        const style = getComputedStyle(target);
        const matrix = style['transform'];

        if (matrix === 'none') {
            return {
                x: 0,
                y: 0,
                z: 0
            };
        }

        const matrixType = matrix.includes('3d') ? '3d' : '2d';
        const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');

        if (matrixType === '2d') {
            return {
                x: Number(matrixValues[4]),
                y: Number(matrixValues[5]),
                z: 0
            };
        }

        if (matrixType === '3d') {
            return {
                x: Number(matrixValues[12]),
                y: Number(matrixValues[13]),
                z: Number(matrixValues[14])
            };
        }
    }

    raffleNumber(obj) {
        return obj.minimum + Math.round((obj.maximum - obj.minimum) * Math.random());
    }

    raffleArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    remove(target) {
        if (target !== null) target.parentNode.removeChild(target);
    }

    removeClass(el, css) {
        if (!el) return;
        if (!el.classList.contains(css)) return;

        el.classList.remove(css);
    }
}
export class Keyboard {
    buildAction(key) {
        switch (key) {
            case 'Up':
            case 'ArrowUp':
            case 'w':
                player.walk('up');
                break;
            case 'Left':
            case 'ArrowLeft':
            case 'a':
                player.walk('left');
                break;
            case 'Down':
            case 'ArrowDown':
            case 's':
                player.walk('down');
                break;
            case 'Right':
            case 'ArrowRight':
            case 'd':
                player.walk('right');
                break;
            case 'Escape':
                modal.close();
                break;
            case 'b':
                backpack.open();
                break;
            case 'c':
                craft.open();
                break;
            case 'p':
                pick.pick();
                break;
            case 'h':
                player.hit();
                break;
        }
    }

    init() {
        document.addEventListener('keydown', (event) => {
            this.buildAction(event.key);
        });
        document.addEventListener('keyup', () => {
            player.walkStop();
        });
    }
}
export class LoadingMain {
    constructor() {
        this.cssHide = 'hide';
        this.cssAnimation = 'animate';
    }

    update() {
        this.elWrapper = document.querySelector('.loading-main');
        this.elLoading = this.elWrapper.querySelector('.loading');
    }

    hide() {
        this.elWrapper.classList.add(this.cssHide);
        this.elLoading.classList.remove(this.cssAnimation);
    }

    show() {
        this.elWrapper.classList.remove(this.cssHide);
        this.elLoading.classList.add(this.cssAnimation);
    }
}
export class Modal {
    constructor() {
        this.cssModal = 'modal';
        this.cssClose = `${this.cssModal}--close`;
        this.cssHide = 'hide';
    }

    build() {
        this.update();
        this.buildAction();
    }

    buildAction() {
        this.elCloseButton.onclick = () => {
            this.close();
        };
    }

    close() {
        this.hidePage();
        this.elModal.classList.add(this.cssClose);
    }

    open(target) {
        const el = document.querySelector(`#page_${target}`);

        this.hidePage();
        this.elModal.classList.remove(this.cssClose);
        el.classList.remove(this.cssHide);
    }

    hidePage() {
        this.elPage.forEach((item) => {
            if (!item.classList.contains(this.cssHide)) item.classList.add(this.cssHide);
        });
    }

    update() {
        this.elModal = document.querySelector(`.${this.cssModal}`);
        this.elContent = document.querySelector(`.${this.cssModal}__content`);
        this.elPage = this.elContent.querySelectorAll('.page');
        this.elCloseButton = document.querySelector('#modal_close');
    }
}
export class Pick {
    constructor() {
        this.isPick = false;
    }

    pick() {
        if (!this.isPick) return;

        const playerPosition = player.tileCurrent;
        const item = platform.elResource.querySelector(`[data-tile="${playerPosition}"]`);
        const itemId = item.getAttribute('data-tile');

        terrain.removeItem(item);
        terrain.removeResource(itemId);
        backpack.addItem(item);
        this.setPick(false);
    }

    setPick(status) {
        const buttonPick = platform.elActionPick;
        const attribute = 'disabled';

        status ? buttonPick.removeAttribute(attribute) : buttonPick.setAttribute(attribute, '');
        this.isPick = status;
    }
}
export class Platform {
    build() {
        this.update();
        this.resize();
        this.buildAction();
        this.buildDirection();
    }

    buildAction() {
        this.elActionBackpack.onclick = () => {
            backpack.open();
        };

        this.elActionCraft.onclick = () => {
            craft.open();
        };

        this.elActionPick.onclick = () => {
            pick.pick();
        };

        this.elActionHit.onclick = () => {
            player.hit();
        };
    }

    buildDirection() {
        this.elDirectionalUp.onclick = () => {
            camera.move('up');
        };

        this.elDirectionalDown.onclick = () => {
            camera.move('down');
        };

        this.elDirectionalLeft.onclick = () => {
            camera.move('left');
        };

        this.elDirectionalRight.onclick = () => {
            camera.move('right');
        };
    }

    update() {
        this.elCamera = document.querySelector('#camera');
        this.elGame = document.querySelector('#game');
        this.elTerrain = document.querySelector('#terrain');
        this.elPlayer = document.querySelector('#player');
        this.elEnemy = document.querySelector(`#${enemy.cssEnemy}`);
        this.elResource = document.querySelector(`#${resource.cssResource}`);
        this.elPageBackpack = document.querySelector('#page_backpack');
        this.elPageBackpackContent = this.elPageBackpack.querySelector('.content');
        this.elPageCraft = document.querySelector('#page_craft');
        this.elPageCraftContent = this.elPageCraft.querySelector('.content');

        this.elBarLife = document.querySelector('[data-id="bar-life"]');
        this.elBarHunger = document.querySelector('[data-id="bar-hunger"]');
        this.elBarThirst = document.querySelector('[data-id="bar-thirst"]');

        this.elActionBackpack = document.querySelector('[data-id="action-backpack"]');
        this.elActionCraft = document.querySelector('[data-id="action-craft"]');
        this.elActionPick = document.querySelector('[data-id="action-pick"]');
        this.elActionHit = document.querySelector('[data-id="action-hit"]');

        this.elDirectionalUp = document.querySelector('[data-id="directional-up"]');
        this.elDirectionalDown = document.querySelector('[data-id="directional-down"]');
        this.elDirectionalLeft = document.querySelector('[data-id="directional-left"]');
        this.elDirectionalRight = document.querySelector('[data-id="directional-right"]');
    }

    updateBar() {
        this.elBarLife.setAttribute('value', player.lifeCurrent);
        this.elBarLife.setAttribute('max', player.life);
        this.elBarHunger.setAttribute('value', player.hungerCurrent);
        this.elBarHunger.setAttribute('max', player.hunger);
        this.elBarThirst.setAttribute('value', player.thirstCurrent);
        this.elBarThirst.setAttribute('max', player.thirst);
    }

    resize() {
        this.elGameWidth = this.elGame.offsetWidth;
        this.elGameHeight = this.elGame.offsetHeight;
    }
}
export class Player {
    constructor() {
        this.speed = 0;
        this.isMoving = false;
        this.isInitial = true;
    }

    buildPlayer(data) {
        this.buildVariable(data);
        platform.updateBar();
        this.position();
        loadingMain.hide();
    }

    buildVariable(data) {
        const json = JSON.parse(data);

        this.life = json.life;
        this.lifeCurrent = json.lifeCurrent;
        this.hunger = json.hunger;
        this.hungerCurrent = json.hungerCurrent;
        this.thirst = json.thirst;
        this.thirstCurrent = json.thirstCurrent;
        this.tileCurrent = terrain.json.position.player;
        this.speed = json.speed;
    }

    hit() {
        console.log('hit');
    }

    move(side) {
        const coordinates = this.moveCoordinates(side);
        let animation;
        let obj = {
            'target': platform.elPlayer
        };
        const tileNext = typeof coordinates.tileNext !== 'undefined' ? obj.tileNext = coordinates.tileNext : undefined;

        if (typeof coordinates.vertical !== 'undefined') obj.vertical = coordinates.vertical;
        if (typeof coordinates.horizontal !== 'undefined') obj.horizontal = coordinates.horizontal;
        if (this.isMoving) return;
        this.isMoving = true;

        animation = window.animate.move(obj);
        animation.then(() => this.moveSuccess({
            tileNext,
            side
        }));
    }

    moveSuccess(obj) {
        const isDoor = terrain.verifyDoor(obj.tileNext);
        const isResource = terrain.verifyResource(obj.tileNext);

        this.updatePosition({
            'tileNext': obj.tileNext,
            'side': obj
        });

        if (isDoor) terrain.change();

        pick.setPick(isResource);
    }

    moveCoordinates(side) {
        const tileColumn = terrain.json.column;
        const playerPosition = helper.getTranslateValue(platform.elPlayer);
        let obj = {};

        switch (side) {
            case 'up':
                obj.tileNext = this.tileCurrent - tileColumn;
                obj.vertical = playerPosition.y - camera.distance;
                break;
            case 'down':
                obj.tileNext = this.tileCurrent + tileColumn;
                obj.vertical = playerPosition.y + camera.distance;
                break;
            case 'left':
                obj.tileNext = this.tileCurrent - 1;
                obj.horizontal = playerPosition.x - camera.distance;
                break;
            case 'right':
                obj.tileNext = this.tileCurrent + 1;
                obj.horizontal = playerPosition.x + camera.distance;
                break;
        }

        return obj;
    }

    position() {
        terrain.position({
            'target': platform.elPlayer,
            'position': this.tileCurrent,
        });
        camera.center();
    }

    updatePosition(data) {
        this.isMoving = false;
        this.tileCurrent = data.tileNext;

        switch (data.side) {
            case 'up':
                this.currentVertical -= terrain.tileSize;
                break;
            case 'down':
                this.currentVertical += terrain.tileSize;
                break;
            case 'left':
                this.currentHorizontal -= terrain.tileSize;
                break;
            case 'right':
                this.currentHorizontal += terrain.tileSize;
                break;
        }
    }

    verifyWalk(side) {
        const coordinates = this.moveCoordinates(side);
        let obj = {
            'target': platform.elPlayer
        };
        const tileNext = typeof coordinates.tileNext !== 'undefined' ? obj.tileNext = coordinates.tileNext : undefined;
        const isWalk = terrain.verifyWalk(tileNext);

        return isWalk;
    }

    walk(side) {
        const capitalize = helper.capitalize(side);

        this[`walk${capitalize}`]();
        this.lastWalkSide = side;
        camera.move(side);
    }

    walkDown() {
        animate.walk(platform.elPlayer, animate.arrCssWalk[2]);
    }

    walkUp() {
        animate.walk(platform.elPlayer, animate.arrCssWalk[0]);
    }

    walkRight() {
        animate.walk(platform.elPlayer, animate.arrCssWalk[1]);
    }

    walkLeft() {
        animate.walk(platform.elPlayer, animate.arrCssWalk[3]);
    }

    walkStop() {
        let index;

        if (this.lastWalkSide === 'up') index = 4;
        if (this.lastWalkSide === 'right') index = 5;
        if (this.lastWalkSide === 'down') index = 6;
        if (this.lastWalkSide === 'left') index = 7;

        animate.walk(platform.elPlayer, animate.arrCssWalk[index]);
    }
}
export class Resource {
    constructor() {
        this.cssResource = 'resource';
        this.cssItem = 'item';
    }

    build() {
        this.resourceLength = terrain.json.resource.quantity;

        const html = this.buildHtml();

        platform.elResource.innerHTML = html;
        this.setPosition();
    }

    buildHtml() {
        let html = '';

        for (let i = 0; i < this.resourceLength; i++) {
            let random = helper.raffleArray(terrain.json.resource.kind);

            html += `
                <div id="${this.cssItem}_${i}"
                    class="${this.cssItem} ${this.cssItem}--${random} tile center" data-item="${random}"
                    data-amount="1"
                    data-tile=""
                >
                    Item ${i}
                </div>
            `;
        }

        return html;
    }

    setPosition() {
        for (let i = 0; i < this.resourceLength; i++) {
            const target = document.querySelector(`#${this.cssItem}_${i}`);
            const position = terrain.rafflePosition();

            target.setAttribute('data-tile', position);
            terrain.arrResource.push(position);
            terrain.position({
                target,
                position,
            });
        }
    }
}
export class Terrain {
    constructor() {
        this.current = 1;
        this.json = {};
        this.arr = [];
        this.arrWalkFalse = [0];
        this.arrDoor = [2];
        this.tileSize = 48;
        this.tileSizeHalf = this.tileSize / 2;
        this.tileId = 0;
        this.tileIdPrefix = 'tile_';
        this.tileTotal = 0;
    }

    buildMap(data) {
        this.json = JSON.parse(data);
        this.width = this.tileSize * this.json.column;
        this.height = this.tileSize * this.json.row;

        camera.update();
        this.update();
        this.convertArray();
        this.buildHtml();
        enemy.build();
        resource.build();

        if (!player.isInitial) player.position();
    }

    buildHtml() {
        const template = this.buildHtmlRow();

        platform.elTerrain.style.width = `${this.width}px`;
        platform.elTerrain.style.height = `${this.height}px`;
        platform.elTerrain.innerHTML = '';
        platform.elTerrain.insertAdjacentHTML('afterbegin', template);
    }

    buildHtmlRow() {
        let template = '';

        for (let i = 0; i < this.json.row; i++) {
            template += this.buildHtmlColumn(i);
        }

        return template;
    }

    buildHtmlColumn(i) {
        let template = '';

        for (let j = 0; j < this.json.column; j++) {
            const tile = this.arr[i][j];
            const trim = Number(tile.trim());
            const isWalkFalse = this.arrWalkFalse.includes(trim);
            const isDoor = this.arrDoor.includes(trim);

            if (isWalkFalse || isDoor) this.arrForbidden.push(this.tileId);

            template += `<div class="tile tile--${trim}" data-tile="${trim}" id="${this.tileIdPrefix}${this.tileId}"></div>`;
            this.tileId++;
        }

        return template;
    }

    convertArray() {
        const json = this.json.map;
        const length = Object.keys(json).length;

        for (let i = 0; i < length; i++) {
            let split = json[i].split(',');
            this.arr[i] = split;
        }
    }

    change() {
        const playerTile = player.tileCurrent;
        const json = terrain.json.position;
        let nextMap;
        let nextTile;

        loadingMain.show();

        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                if (json[key].tile === playerTile) {
                    nextMap = json[key].sendToMap;
                    nextTile = json[key].sendToTile;
                }
            }
        }

        this.update();
        player.tileCurrent = nextTile;
        data.loadMap(nextMap);
    }

    position(obj) {
        const elTarget = obj.target;

        if (!elTarget) return;

        const tile = this.tileIdPrefix + obj.position;
        const elTile = document.querySelector(`#${tile}`);
        const elTilePosition = helper.getOffset(elTile);
        const elCameraPosition = helper.getOffset(platform.elCamera);
        const positionReset = {
            top: elTilePosition.top - elCameraPosition.top,
            left: elTilePosition.left - elCameraPosition.left,
        };

        animate.move({
            'target': elTarget,
            'vertical': Math.round(positionReset.top),
            'horizontal': Math.round(positionReset.left),
            'speed': 0,
        });
    }

    rafflePosition() {
        let result = this.rafflePositionRandom();

        while (this.arrForbidden.includes(result)) {
            result = this.rafflePositionRandom();
        }

        this.arrForbidden.push(result);
        return result;
    }

    rafflePositionRandom() {
        return helper.raffleNumber({
            'minimum': 0,
            'maximum': terrain.tileTotal
        });
    }

    removeItem(target) {
        helper.remove(target);
    }

    removeResource(target) {
        const array = this.arrResource;
        const index = array.indexOf(Number(target));

        if (index > -1) array.splice(index, 1);
    }

    verifyDoor(tile) {
        return this.verifyTile({
            tile,
            'arr': 'arrDoor'
        });
    }

    verifyResource(tile) {
        const isInArray = this.arrResource.includes(tile);

        return isInArray;
    }

    verifyWalk(tile) {
        return this.verifyTile({
            tile,
            'arr': 'arrWalkFalse'
        });
    }

    verifyTile(obj) {
        const target = document.querySelector(`#${this.tileIdPrefix}${obj.tile}`);
        const attribute = Number(target.getAttribute('data-tile'));
        const isInArray = this[obj.arr].includes(attribute);

        if (isInArray) return true;
        return false;
    }

    update() {
        this.tileId = 0;
        this.tileTotal = terrain.json.row * terrain.json.column;
        this.arrForbidden = [];
        this.arrResource = [];
    }
}
window.animate = new Animate();
window.backpack = new Backpack();
window.camera = new Camera();
window.craft = new Craft();
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