const bestScore = document.getElementById('best-score')
const bestSeconds = document.getElementById('best-seconds')

if (window.localStorage.previousBestScore && window.localStorage.previousBestSeconds) {
    bestScore.textContent = window.localStorage.previousBestScore;
    bestSeconds.textContent = window.localStorage.previousBestSeconds;
    console.log(window.localStorage.previousBestScore);
}

// New message every time, took from this json
let pepTalk;
fetch('pep-talk.json')
    .then((response) => response.json())
    .then((data) => pepTalk = data.pep)

// Timer Handler
const timerInput = document.getElementById('timer-input');
let timerSetings = timerInput.value;
timerInput.addEventListener('keydown', (e) => {
    e.preventDefault();
});

timerInput.addEventListener('input', (input) => {
    timerSetings = input.target.value;
});

document.getElementById('timer-minus').addEventListener('click', () => {
    if (timerInput.value > 10) {
        timerInput.value--;
        timerSetings--;
    }
});

document.getElementById('timer-plus').addEventListener('click', () => {
    if (timerInput.value < 60) {
        timerInput.value++;
        timerSetings++
    }
});

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
// And the event listener of those ones
const main = document.querySelector('main');
const h1 = document.querySelector('h1')
const bubblesMaker = function () {
    const bubble = document.createElement("span");
    document.body.appendChild(bubble);
    bubble.classList.add('bubbles');

    bubbleAnim(bubble);

    // It goes out of screen, so it's not necessary to keep theme alive...
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

// ------------------------------------------------------------
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
// ------------------------------------------------------------

// Triggered at the end of the timer
const endGame = function () {

    const bubblesClass = document.querySelectorAll('.bubbles');
    bubblesClass.forEach((bubble) => {
        bubble.remove();
    });

    document.querySelectorAll('.to-hide').forEach((element) => {
        document.querySelector('label').textContent = "try again!";
        element.classList.remove('hidden')
    });

    if (bestScore.textContent < counter) {
        bestScore.textContent = counter;
        bestSeconds.textContent = timerSetings;
        window.localStorage.previousBestScore = counter;
        window.localStorage.previousBestSeconds = timerSetings;

        const randomIndex = Math.floor(Math.random() * pepTalk.length)
        document.querySelector('label').textContent = pepTalk[randomIndex];
    }

    // easter egg
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

// Onclick button "go" event listener
let endGameTrigger;
let counter;
const startGame = function () {
    document.querySelectorAll('.to-hide').forEach((element) => {
        element.classList.add('hidden')
    });

    counter = 0;
    endGameTrigger = true;
    h1.textContent = counter;

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

// Trigger the beginning of the game
document.getElementById('go-btn').addEventListener('click', () => {

    if (timerSetings > 60 || timerSetings < 10) {
        alert("Between 10 and 60 seconds!");
    } else {
        startGame();
    }
});























