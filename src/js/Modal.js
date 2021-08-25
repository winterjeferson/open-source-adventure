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