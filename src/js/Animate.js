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