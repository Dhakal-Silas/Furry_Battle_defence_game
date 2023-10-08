class RotatingImage {
    constructor(parentElement, imagePath) {
        this.parentElement = parentElement;
        this.imageElement = document.createElement('img');
        this.imageElement.src = imagePath;
        this.imageElement.classList.add('rotating-image');
        this.parentElement.appendChild(this.imageElement);
        this.imageTop = window.innerHeight * 0.5;
        this.imageLeft = window.innerWidth * 0.5;
        this.imageElement.style.top = `${this.imageTop}px`;
        this.imageElement.style.left = `${this.imageLeft}px`;
    }

    updateRotation(mouseX, mouseY) {
        const { top, left, width, height } = this.imageElement.getBoundingClientRect();
        const imageCenterX = left + width / 2;
        const imageCenterY = top + height / 2;
        const angleRad = Math.atan2(mouseY - imageCenterY, mouseX - imageCenterX);
        const angleDeg = (angleRad * 180) / Math.PI;
        this.imageElement.style.transform = `rotate(${angleDeg}deg)`;
    }

    updateMovement(direction) {
        const offset = 50;
        if (direction === 'up') {
            this.imageTop -= offset;
        } else if (direction === 'left') {
            this.imageLeft -= offset;
        } else if (direction === 'down') {
            this.imageTop += offset;
        } else if (direction === 'right') {
            this.imageLeft += offset;
        }
        this.imageElement.style.top = `${this.imageTop}px`;
        this.imageElement.style.left = `${this.imageLeft}px`;
    }
}

const container = document.getElementById('hero-container');
const imagePath = '/static/hero-img.png';
const rotatingImage = new RotatingImage(container, imagePath);

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (['w', 'a', 's', 'd'].includes(key)) {
        rotatingImage.updateMovement(key === 'w' ? 'up' : key === 'a' ? 'left' : key === 's' ? 'down' : 'right');
    }
});



document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    rotatingImage.updateRotation(clientX, clientY);
});

document.addEventListener('mousedown', (event) => {
    event.preventDefault();
});
