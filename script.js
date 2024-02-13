const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const timerContainer = document.getElementById('timer-container');
const timerInput = document.getElementById('timer-input');
const figure = document.querySelector('figure');
const main = document.querySelector('main');
const btnGo = document.getElementById('go-btn');
const btnContainer = document.getElementById('btn-container');

let timerSetings = timerInput.value;
let randoSettings = "";
timerInput.addEventListener('input', (input) => {
    timerSetings = input.target.value;
});

let counter = "";
let endGameTrigger = "";

// Bubbles explosion particle
const createParticle = (leftP, topP) => {
    const particle = document.createElement("div");
    particle.classList.add('particle');
    document.body.appendChild(particle);

    particle.style.left = leftP + "px";
    particle.style.top = topP + "px";

    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    particle.style.setProperty('--x', `${randomX}px`);
    particle.style.setProperty('--y', `${randomY}px`);
    particle.style.animation = 'particleAnimation 0.5s ease-out';

    particle.addEventListener('animationend', () => {
        particle.remove();
    });
};

// Bubble explosion at the end
const party = () => {
    const confettis = document.createElement("div");
    confettis.classList.add('confettis');
    document.body.appendChild(confettis);

    confettis.style.left = "50%";
    confettis.style.top = "50%";

    const randomX = Math.random() * 200;
    const randomPlusMinus = Math.random() > 0.5 ? randomX : -randomX
    const randomY = Math.random() * 600 - 100;
    const randomColor = Math.floor(Math.random() * 250);

    confettis.style.setProperty('--confettiColor', `${randomColor}`);
    confettis.style.setProperty('--x', `${randomPlusMinus}px`);
    confettis.style.setProperty('--y', `${randomY}px`);
    confettis.style.animation = 'particleAnimation 3s ease-out';

    confettis.addEventListener('animationend', () => {
        confettis.remove();
    });

};

// Create bubble, will be call later into a loop of 200ms
const bubblesMaker = function () {
    const bubble = document.createElement("span");
    document.body.appendChild(bubble);
    bubble.classList.add('bubbles');

    bubbleAnim(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 6000);

    bubble.addEventListener('click', (click) => {

        const pop = () => {
            const audio = new Audio();
            audio.src = "./bubble-docs/pop.m4a";
            audio.play();
        };

        pop();
        bubble.remove();
        counter++;

        let layerX = click.clientX;
        let layerY = click.clientY;

        //Quantity of particles 
        for (let i = 0; i < 20; i++) {
            createParticle(layerX, layerY);
        }

        h1.textContent = counter;
    });
}
// Random direction, color, height, width
const bubbleAnim = function (bubble) {

    const randomHeightWidth = (Math.floor(Math.random() * 200) + 100);
    const randomHeighFromleft = (Math.floor(Math.random() * 100));
    const randomHeighToleft = (Math.floor(Math.random() * 100));
    const randomHueRotate = Math.floor((Math.random() * 350) + 100)
    const plusMinus = Math.random() > 0.5 ? randomHeighToleft : -randomHeighToleft;

    bubble.style.width = randomHeightWidth + "px";
    bubble.style.height = randomHeightWidth + "px";

    bubble.style.setProperty('--leftFromAnim', randomHeighFromleft + "%")
    bubble.style.setProperty('--leftToAnim', plusMinus + "%")
    bubble.style.setProperty('--hueRotateAnim', randomHueRotate + "deg")

}

// TODO!
// const goldendBubblesMaker = function () {
//     const bubble = document.createElement("span");
//     document.body.appendChild(bubble);
//     bubble.classList.add('bubbles');

//     bubbleAnim(bubble);

//     setTimeout(() => {
//         bubble.remove();
//     }, 6000);

//     bubble.addEventListener('click', (click) => {

//         const pop = () => {
//             const audio = new Audio();
//             audio.src = "./bubble-docs/pop.m4a";
//             audio.play();
//         };

//         bubble.remove();
//         pop();
//         counter += 10;

//         let layerX = click.clientX;
//         let layerY = click.clientY;

//         for (let i = 0; i < 10; i++) {
//             createParticle(layerX, layerY);
//         }

//         h1.textContent = counter;
//     });
// }

// const goldendBubbleAnim = function (bubble) {

//     const randomHeightWidth = (Math.floor(Math.random() * 200) + 100);
//     const randomHeighFromleft = (Math.floor(Math.random() * 100));
//     const randomHeighToleft = (Math.floor(Math.random() * 100));
//     const plusMinus = Math.random() > 0.5 ? randomHeighToleft : -randomHeighToleft;

//     bubble.style.width = randomHeightWidth + "px";
//     bubble.style.height = randomHeightWidth + "px";

//     bubble.style.setProperty('--leftFromAnim', randomHeighFromleft + "%")
//     bubble.style.setProperty('--leftToAnim', plusMinus + "%")

// }

// Triggered at the end of the timer
const endGame = function () {

    const bubblesClass = document.querySelectorAll('.bubbles');
    bubblesClass.forEach((bubble) => {
        bubble.remove();
    });

    timerContainer.style.display = "flex";
    btnContainer.style.display = "flex";
    figure.style.display = "flex";

    // easter egg coming soon... coming
    // const victory = () => {
    //     const audio = new Audio();
    //     audio.src = "./bubble-docs/Party-horn.mp3";
    //     audio.play();
    // };

    // victory();

    // Quantity of particles at the end
    for (let i = 0; i < 80; i++) {
        party()
    }
}

const startGame = function () {

    counter = 0;
    endGameTrigger = true;

    h1.style.fontSize = "4em";
    h1.textContent = "0";
    timerContainer.style.display = "none";
    btnContainer.style.display = "none";
    figure.style.display = "none"

    setTimeout(() => {
        endGameTrigger = false;
    }, timerSetings * 1000)

    const loop = () => {

        if (endGameTrigger == true) {
            setTimeout(() => {
                bubblesMaker();
                loop();
            }, 200)
        } else {
            return endGame();
        }
    };

    loop();
}

btnGo.addEventListener('click', () => {

    if (timerSetings > 60 || timerSetings < 10) {
        alert("Between 10 and 60 seconds!");
    } else {
        startGame();
    }
});























