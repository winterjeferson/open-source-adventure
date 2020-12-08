class Animation {
    move(args) {
        return new Promise((resolve, reject) => {
            const currentValue = window.helper.getTranslateValue(args.target);
            const currentVertical = Math.floor(currentValue.y);
            const currentHorizontal = Math.floor(currentValue.x);
            const newVertical = args.vertical === false ? currentVertical : Math.floor(args.vertical);
            const newHorizontal = args.horizontal === false ? currentHorizontal : Math.floor(args.horizontal);
            const speed = typeof args.speed !== 'undefined' ? args.speed : window.player.speed;
            const easing = typeof args.easing !== 'undefined' ? args.easing : 'linear';

            const animation = args.target.animate([{
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
            }
        });

    }
}