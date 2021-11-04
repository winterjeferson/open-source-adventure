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