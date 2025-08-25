async function loadConfig() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        return config;
    } catch (error) {
        console.error('Error loading config:', error);
        return {};
    }
}

function setCSSVariables(colors) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colors.primaryColor);
    root.style.setProperty('--secondary-color', colors.secondaryColor);
    root.style.setProperty('--tertiary-color', colors.tertiaryColor);
    root.style.setProperty('--quaternary-color', colors.quaternaryColor);
    root.style.setProperty('--text-color', colors.textColor);
    root.style.setProperty('--sub-text-color', colors.subTextColor);
    root.style.setProperty('--location-text-color', colors.locationTextColor);
    root.style.setProperty('--status-card-background', colors.statusCardBackground);
    root.style.setProperty('--status-card-border', colors.statusCardBorder);
    root.style.setProperty('--social-link-background', colors.socialLinkBackground);
    root.style.setProperty('--social-link-hover-background', colors.socialLinkHoverBackground);
    root.style.setProperty('--indicator-green', colors.indicatorGreen);
    root.style.setProperty('--indicator-orange', colors.indicatorOrange);
    root.style.setProperty('--primary-color-alpha', colors.primaryColor.replace(')', ', 0.3)'));
    root.style.setProperty('--primary-color-alpha-low', colors.primaryColor.replace(')', ', 0.15)'));
    root.style.setProperty('--indicator-green-alpha', colors.indicatorGreen.replace(')', ', 0.8)'));
    root.style.setProperty('--indicator-green-alpha-low', colors.indicatorGreen.replace(')', ', 0.5)'));
    root.style.setProperty('--indicator-orange-alpha', colors.indicatorOrange.replace(')', ', 0.9)'));
    root.style.setProperty('--indicator-orange-alpha-low', colors.indicatorOrange.replace(')', ', 0.5)'));
    colors.overlayGradient.forEach((color, index) => {
        root.style.setProperty(`--overlay-gradient-${index}`, color);
    });
}

function populateProfile(config) {
    document.querySelector('.username').textContent = config.profile.username;
    document.querySelector('.tagline').textContent = config.profile.tagline;
    document.querySelector('.location span').textContent = config.profile.location;
    document.querySelector('.profile-picture img').src = config.profile.profilePicture;
    document.querySelector('.status-name').textContent = config.profile.statusName;
    document.querySelector('.status-message').textContent = config.profile.statusMessage;
    document.querySelector('.view-counter span').textContent = config.profile.viewCount;

    const video = document.querySelector('#background-video');
    video.querySelector('source').src = config.media.backgroundVideo;
    video.load();

    const videoBackground = document.querySelector('.video-background');
    videoBackground.src = config.media.backgroundImage;

    const socialLinksContainer = document.querySelector('.social-links');
    socialLinksContainer.innerHTML = '';
    config.socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'social-link';
        a.title = link.platform;
        a.setAttribute('aria-label', `${link.platform} Profile`);
        a.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="${link.svgPath}"/>
            </svg>
        `;
        socialLinksContainer.appendChild(a);
    });
}

function toggleMute() {
    const video = document.querySelector('#background-video');
    video.muted = !video.muted;
    console.log('Mute toggled:', video.muted);
}

document.addEventListener('DOMContentLoaded', async () => {
    const config = await loadConfig();
    setCSSVariables(config.colors);
    populateProfile(config);

    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.1)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    document.addEventListener('mousemove', function(e) {
        const profilePic = document.querySelector('.profile-picture');
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        profilePic.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
    });
});

