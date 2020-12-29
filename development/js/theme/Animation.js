class Animation {
    move(obj) {
        return new Promise((resolve) => {
            const currentValue = window.helper.getTranslateValue(obj.target);
            const currentVertical = Math.floor(currentValue.y);
            const currentHorizontal = Math.floor(currentValue.x);
            const newVertical = typeof obj.vertical === 'undefined' ? currentVertical : Math.floor(obj.vertical);
            const newHorizontal = typeof obj.horizontal === 'undefined' ? currentHorizontal : Math.floor(obj.horizontal);
            const speed = typeof obj.speed === 'undefined' ? window.player.speed : obj.speed;
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

            animation.onfinish = function (event) {
                resolve(event);
            };
        });

    }
}

window.animation = new Animation();