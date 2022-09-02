const modal = document.querySelector('.modal-x');

function showModal() {
    modal.style.display="none";
    gsap.to(modal, {x: 100, duration: 0, opacity: 0});
    modal.style.display="flex";
    gsap.to(modal, {x: 0, duration: 0.4, opacity: 1});
}

ScrollTrigger.create({
    trigger: ".modal-trigger",
    start: "center center",
    onEnter: self => showModal(),
    once: true
});

function hideModal() {
    gsap.to(modal, {opacity: 0, duration: 0.4});

    window.setTimeout(function () {
        modal.style.display = 'none';
    }, 500);
}
