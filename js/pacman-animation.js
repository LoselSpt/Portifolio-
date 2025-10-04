const canvas = document.getElementById('pacman-canvas');
const ctx = canvas.getContext('2d');

let pacman = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    mouthOpen: 0.2,
    speed: 2,
    direction: 'right',
    nextDirection: 'right'
};

let dots = [];
const dotRadius = 3;
const dotSpacing = 40;
let score = 0;

function init() {
    dots = [];
    score = 0;
    for (let x = dotSpacing; x < canvas.width; x += dotSpacing) {
        for (let y = dotSpacing; y < canvas.height; y += dotSpacing) {
            dots.push({ x: x, y: y, eaten: false });
        }
    }
    pacman.x = canvas.width / 2;
    pacman.y = canvas.height / 2;
}

function drawPacman() {
    ctx.save();
    ctx.translate(pacman.x, pacman.y);

    let angle = 0;
    if (pacman.direction === 'right') angle = 0;
    else if (pacman.direction === 'left') angle = Math.PI;
    else if (pacman.direction === 'down') angle = Math.PI / 2;
    else if (pacman.direction === 'up') angle = -Math.PI / 2;
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.arc(0, 0, pacman.radius, pacman.mouthOpen * Math.PI, (2 - pacman.mouthOpen) * Math.PI);
    ctx.lineTo(0, 0);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

function drawDots() {
    ctx.fillStyle = 'white';
    dots.forEach(dot => {
        if (!dot.eaten) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    });
}

function update() {
    // Animate mouth
    pacman.mouthOpen = Math.abs(Math.sin(Date.now() * 0.01)) * 0.2;

    // Change direction
    pacman.direction = pacman.nextDirection;

    // Move Pac-Man
    if (pacman.direction === 'right') pacman.x += pacman.speed;
    if (pacman.direction === 'left') pacman.x -= pacman.speed;
    if (pacman.direction === 'up') pacman.y -= pacman.speed;
    if (pacman.direction === 'down') pacman.y += pacman.speed;

    // Wrap around screen
    if (pacman.x > canvas.width + pacman.radius) pacman.x = -pacman.radius;
    if (pacman.x < -pacman.radius) pacman.x = canvas.width + pacman.radius;
    if (pacman.y > canvas.height + pacman.radius) pacman.y = -pacman.radius;
    if (pacman.y < -pacman.radius) pacman.y = canvas.height + pacman.radius;


    // Eat dots
    dots.forEach(dot => {
        if (!dot.eaten) {
            const dx = pacman.x - dot.x;
            const dy = pacman.y - dot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < pacman.radius + dotRadius) {
                dot.eaten = true;
                score++;
            }
        }
    });

    // Check for win
    if (score === dots.length) {
        // Reset for now
        init();
    }
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 25);
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    drawPacman();
    drawScore();
    update();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') pacman.nextDirection = 'right';
    if (e.key === 'ArrowLeft') pacman.nextDirection = 'left';
    if (e.key === 'ArrowUp') pacman.nextDirection = 'up';
    if (e.key === 'ArrowDown') pacman.nextDirection = 'down';
});

init();
gameLoop();
