let noClickCount = 0;
const noMessages = [
    'Are you sure? 😢',
    'Think again!? 🥺',
    'WRONG BUTTON! 😭',
    'You look fabulous today- click yes!',
    'Nice try, you can’t escape! 💕',
    'Cool, cool, cool, cool, no doubt, but click yes. 😎',
    'Okay, last chance 😭',
    'I know you want to say yes! 🥰',
    'you can run but you can’t hide! 😘',
    'Error 404: "No" button not found. 🛑',
    'I see you trying to escape! 😏',
    'I know you want to say yes! 🥰',
    'PLEASE SAY YES! 🥺',
    'You are stuck with me, just accept it! 🤪',
    'I LOVE YOU! 💖',
    'You’re mine now! 💕'
];


function openEnvelope() {
    const envelope = document.querySelector('.envelope-button');
    if (!envelope) return;

    envelope.classList.add('open');
    setTimeout(() => {
        window.location.href = 'letter.html';
    }, 850);
}

function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const stage = document.querySelector('.button-stage');

    if (!noBtn || !yesBtn || !stage) return;

    // Make sure the "No" button is positioned absolutely inside the stage
    noBtn.style.position = 'absolute';

    const stageWidth = stage.clientWidth - noBtn.offsetWidth;
    const stageHeight = stage.clientHeight - noBtn.offsetHeight;

    // Generate random coordinates within the stage bounds
    const randomX = Math.max(0, Math.floor(Math.random() * stageWidth));
    const randomY = Math.max(0, Math.floor(Math.random() * stageHeight));

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.right = 'auto';

    // Update the message text sequentially or loop through them
    const messageIndex = Math.min(noClickCount, noMessages.length - 1);
    noBtn.textContent = noMessages[messageIndex];
    noClickCount++;

    // Safely grow the Yes button size and padding
    const nextScale = Math.min(1.6, 1 + noClickCount * 0.12);
    yesBtn.style.transform = `scale(${nextScale})`;
    yesBtn.style.padding = `${0.9 + noClickCount * 0.18}rem ${2.1 + noClickCount * 0.3}rem`;
}

function sayYes() {
    window.location.href = 'plan.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');

    if (noBtn && yesBtn) {
        // Trigger movement on both hover and click
        noBtn.addEventListener('mouseenter', moveNoButton);
        noBtn.addEventListener('click', moveNoButton);
    }

    const envelopeButton = document.querySelector('.envelope-button');
    if (envelopeButton) {
        envelopeButton.addEventListener('click', openEnvelope);
    }

    const page = document.body.dataset.page;
    if (page === 'plan') {
        const steps = document.querySelectorAll('.plan-step');
        steps.forEach((step, index) => {
            step.style.setProperty('--delay', index);
        });
    }
});
