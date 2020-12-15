class Animation {
    move(obj) {
        return new Promise((resolve) => {
            const currentValue = window.helper.getTranslateValue(obj.target);
            const currentVertical = Math.floor(currentValue.y);
            const currentHorizontal = Math.floor(currentValue.x);
            const newVertical = obj.vertical === false ? currentVertical : Math.floor(obj.vertical);
            const newHorizontal = obj.horizontal === false ? currentHorizontal : Math.floor(obj.horizontal);
            const speed = typeof obj.speed !== 'undefined' ? obj.speed : window.player.speed;
            const easing = typeof obj.easing !== 'undefined' ? obj.easing : 'linear';

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

            animation.onfinish = function (event) {
                resolve(event);
            };
        });

    }
}

window.animation = new Animation();