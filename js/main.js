document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const CONFIG = {
        GROWTH_THRESHOLD: 6,
        GROWTH_RATE: 0.05,
        PROXIMITY_THRESHOLD: 100,
        SAFE_PADDING: 20,
        MIN_DISTANCE_PERCENT: 0.6,
        MAX_DISTANCE_PX: 500,
        MAX_SEARCH_ATTEMPTS: 100
    };

    // --- State ---
    const state = {
        hasMoved: false,
        moveCount: 0
    };

    // --- DOM Elements ---
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const questionEl = document.getElementById('question');

    // --- Initialization ---
    const injectName = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name') || 'Sweetheart';
        questionEl.innerText = `${name}, Do You Want to Be My Valentine?`;
    };

    // --- Logic Functions ---

    const growYesButton = () => {
        if (state.moveCount <= CONFIG.GROWTH_THRESHOLD) return;
        
        const currentScale = 1 + (state.moveCount - CONFIG.GROWTH_THRESHOLD) * CONFIG.GROWTH_RATE;
        yesBtn.style.transform = `scale(${currentScale})`;
        yesBtn.style.transition = 'transform 0.2s ease';
    };

    const preserveLayout = () => {
        if (state.hasMoved) return;

        // Create a spacer to hold the layout position
        const spacer = document.createElement('div');
        spacer.style.width = `${noBtn.offsetWidth}px`;
        spacer.style.height = `${noBtn.offsetHeight}px`;
        spacer.style.display = 'inline-block';
        
        // Insert spacer and fix button dimensions
        noBtn.parentNode.insertBefore(spacer, noBtn);
        noBtn.style.width = `${noBtn.offsetWidth}px`;
        noBtn.style.height = `${noBtn.offsetHeight}px`;
        
        state.hasMoved = true;
    };

    const calculateNewPosition = (cursorX, cursorY) => {
        const viewport = { w: window.innerWidth, h: window.innerHeight };
        const btn = noBtn.getBoundingClientRect();
        const padding = CONFIG.SAFE_PADDING;

        const limits = {
            maxLeft: viewport.w - btn.width - padding,
            maxTop: viewport.h - btn.height - padding
        };

        const minRequiredDist = Math.min(
            CONFIG.MAX_DISTANCE_PX, 
            Math.min(viewport.w, viewport.h) * CONFIG.MIN_DISTANCE_PERCENT
        );

        let bestPos = { left: padding, top: padding };
        let maxFoundDist = -1;

        for (let i = 0; i < CONFIG.MAX_SEARCH_ATTEMPTS; i++) {
            const tempLeft = Math.max(padding, Math.random() * limits.maxLeft);
            const tempTop = Math.max(padding, Math.random() * limits.maxTop);
            
            let dist;
            if (cursorX !== undefined && cursorY !== undefined) {
                const centerX = tempLeft + btn.width / 2;
                const centerY = tempTop + btn.height / 2;
                dist = Math.hypot(centerX - cursorX, centerY - cursorY);
            } else {
                dist = minRequiredDist + 1;
            }

            if (dist > maxFoundDist) {
                maxFoundDist = dist;
                bestPos = { left: tempLeft, top: tempTop };
            }

            if (maxFoundDist >= minRequiredDist) break;
        }

        return bestPos;
    };

    const moveButton = (cursorX, cursorY) => {
        state.moveCount++;
        growYesButton();
        preserveLayout();

        const { left, top } = calculateNewPosition(cursorX, cursorY);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${left}px`;
        noBtn.style.top = `${top}px`;
    };

    // --- Event Listeners ---

    yesBtn.addEventListener('click', () => {
        window.location.href = 'celebration.html';
    });

    let ticking = false;
    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const btnRect = noBtn.getBoundingClientRect();
                const centerX = btnRect.left + btnRect.width / 2;
                const centerY = btnRect.top + btnRect.height / 2;
                const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

                if (distance < CONFIG.PROXIMITY_THRESHOLD) {
                    moveButton(e.clientX, e.clientY);
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        moveButton(touch.clientX, touch.clientY);
    });

    // Run init
    injectName();
});