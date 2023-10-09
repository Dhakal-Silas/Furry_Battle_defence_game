class BrickLayer {
    constructor(container, numRows, numCols) {
        this.container = container;
        this.numRows = numRows;
        this.numCols = numCols;
    }

    createBricks() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const brick = document.createElement('div');
                brick.classList.add('brick');
                brick.style.top = `${i * 30}px`;
                brick.style.left = `${j * 60}px`;
                this.container.appendChild(brick);
            }
        }
    }
}

const createBrickLayers = () => {
    const body = document.body;

    // Create layers for each edge (top, bottom, left, right)
    const topLayer = new BrickLayer(body, 2, Math.floor(window.innerWidth / 60));
    const bottomLayer = new BrickLayer(body, 2, Math.floor(window.innerWidth / 60));
    const leftLayer = new BrickLayer(body, Math.floor(window.innerHeight / 30), 1);
    const rightLayer = new BrickLayer(body, Math.floor(window.innerHeight / 30), 1);

    // Position and style the layers
    topLayer.container.classList.add('brick-container', 'top-layer');
    bottomLayer.container.classList.add('brick-container', 'bottom-layer');
    leftLayer.container.classList.add('brick-container', 'left-layer');
    rightLayer.container.classList.add('brick-container', 'right-layer');

    topLayer.createBricks();
    bottomLayer.createBricks();
    leftLayer.createBricks();
    rightLayer.createBricks();
};

window.addEventListener('resize', () => {
    // Clear previous bricks and recreate them on window resize
    const brickContainers = document.querySelectorAll('.brick-container');
    brickContainers.forEach(container => {
        container.innerHTML = '';
    });
    createBrickLayers();
});

// Create brick layers on initial load
createBrickLayers();