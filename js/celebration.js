document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const GIFS = [
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3RycHBrZzR2eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqDrG/giphy.gif',
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3RycHBrZzR2eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MeIucAjPKoA120R7sN/giphy.gif',
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3RycHBrZzR2eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0Cyhi8GCSU91PvtC/giphy.gif',
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3Fzd3dvOWQ4cDMzaXk5NDY5ZmZtdnk5ajZoamV1aXF5NmtqcDZteSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/R6gvnAxj2ISzJdbA63/giphy.gif',
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWttZzVjZmc4MThzcHpibnhsNnEwNTRhN3A5am1jMmIyaTVtanFsNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qC3nrM02H2Kb29sUOn/giphy.gif',
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmx1NDJoeGJ6cmdnZHRueHlkeWh0MzNlYnR1cGRwNmJkemQ1YmlkaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PuTSgeacS3Z7i/giphy.gif'
    ];

    // --- Configuration ---
    const CONFIG = {
        CONFETTI_DURATION: 15 * 1000,
        CONFETTI_INTERVAL: 250,
        PARTICLE_COUNT: 50
    };

    const COLORS = {
        MARRY: ['#ffd700', '#d4af37', '#fbc02d'],
        VALENTINE: undefined // Uses default confetti colors
    };

    // --- DOM Elements ---
    const gifContainer = document.getElementById('gif-container');

    // --- Functions ---

    const injectRandomGif = () => {
        if (!gifContainer) return;
        const randomIndex = Math.floor(Math.random() * GIFS.length);
        const img = document.createElement('img');
        img.src = GIFS[randomIndex];
        img.alt = "Celebration GIF";
        img.loading = "lazy";
        gifContainer.appendChild(img);
    };

    const startConfettiCelebration = (theme) => {
        const animationEnd = Date.now() + CONFIG.CONFETTI_DURATION;
        const isMarry = theme === THEMES.MARRY;
        
        const defaults = { 
            startVelocity: 30, 
            spread: 360, 
            ticks: 60, 
            zIndex: 0,
            colors: isMarry ? COLORS.MARRY : COLORS.VALENTINE
        };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = CONFIG.PARTICLE_COUNT * (timeLeft / CONFIG.CONFETTI_DURATION);
            
            // Fire from both sides
            confetti({ 
                ...defaults, 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
            });
            confetti({ 
                ...defaults, 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
            });
        }, CONFIG.CONFETTI_INTERVAL);
    };

    // --- Initialization ---
    const initCelebration = () => {
        const { type } = PageInitializer.run();

        injectRandomGif();
        startConfettiCelebration(type);
    };

    initCelebration();
});
