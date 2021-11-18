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
        setTimeout(() => {
            this.elWrapper.classList.add(this.cssHide);
            this.elLoading.classList.remove(this.cssAnimation);
        }, configuration.delayTransition);
    }

    show() {
        this.elWrapper.classList.remove(this.cssHide);
        this.elLoading.classList.add(this.cssAnimation);
    }
}