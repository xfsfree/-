window.addEventListener('load', () => {
    const video = document.querySelector('.background-video');
    video.play().catch(() => {
        video.play();
    });
});

const introScreen = document.querySelector('.intro-screen');
const container = document.querySelector('.container');
const backgroundMusic = document.getElementById('background-music');

document.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    container.classList.add('visible');
    backgroundMusic.play().catch(error => {
        console.log('Music playback error:', error);
    });
});