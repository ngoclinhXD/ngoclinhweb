const greetings = [
    "Bonjour ngoclin.h!", "Xin chào ngoclin.h!", "Ciao ngoclin.h!",
    "こんにちは、ngoclin.h!", "Hola ngoclin.h!", "Szia ngoclin.h!",
    "Hej ngoclin.h!", "Hallo ngoclin.h!", "안녕하세요 ngoclin.h!",
    "Привет, ngoclin.h!", "你好 ngoclin.h!", "สวัสดี ngoclin.h!"
];

const container = document.getElementById('orbit-box');
const elements = [];
const total = greetings.length;

greetings.forEach((text, i) => {
    const el = document.createElement('div');
    el.className = 'orbiter';
    el.innerText = text;
    container.appendChild(el);

    const angle = (i / total) * Math.PI * 2;
    elements.push({ el, angle });
});

function getRadii() {
    let radiusX = Math.min(450, window.innerWidth * 0.4);
    let radiusY = Math.min(180, window.innerHeight * 0.25);
    if (window.innerHeight > window.innerWidth) {
        radiusX = window.innerWidth * 0.42;
        radiusY = window.innerWidth * 0.35;
    }
    return { radiusX, radiusY };
}

function positionElements() {
    const { radiusX, radiusY } = getRadii();
    elements.forEach((item) => {
        const x = Math.cos(item.angle) * radiusX;
        const y = Math.sin(item.angle) * radiusY;
        item.el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}

function animate() {
    const { radiusX, radiusY } = getRadii();
    elements.forEach((item) => {
        item.angle += 0.003;
        const x = Math.cos(item.angle) * radiusX;
        const y = Math.sin(item.angle) * radiusY;
        item.el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
    requestAnimationFrame(animate);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    positionElements();
} else {
    animate();
}

let scrollTimer;
window.addEventListener('scroll', () => {
    document.body.classList.add('is-scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
    }, 600);
}, { passive: true });
