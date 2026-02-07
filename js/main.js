document.addEventListener('DOMContentLoaded', () => {
    // --- State ---
    const state = {
        hasMoved: false,
        moveCount: 0
    };

    // --- DOM Elements ---
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');

    // --- Initialization ---

    const initApp = () => {
        const { name, type } = PageInitializer.run();
        const questionText = ProposalPresenter.getQuestionText(name, type);
        ViewManager.updateText('#question', questionText);
    };

    // --- Logic Functions ---

    const growYesButton = () => {
        if (!yesBtn) return;
        const scale = GameRules.calculateScale(state.moveCount);
        ViewManager.setElementScale(yesBtn, scale);
    };

    const preserveLayout = () => {
        if (!noBtn || state.hasMoved) return;

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

    const handleButtonMovement = (cursorX, cursorY) => {
        if (!noBtn) return;
        state.moveCount++;
        
        growYesButton();
        preserveLayout();

        const viewport = { w: window.innerWidth, h: window.innerHeight };
        const btnRect = noBtn.getBoundingClientRect();
        const btnSize = { w: btnRect.width, h: btnRect.height };
        
        const { left, top } = GameRules.findBestPosition(
            { x: cursorX, y: cursorY }, 
            btnSize, 
            viewport
        );

        ViewManager.setElementPosition(noBtn, left, top);
    };

    // --- Event Listeners ---

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            const { raw } = UrlGateway.getParams();
            window.location.href = UrlGateway.createUrl('celebration.html', raw);
        });
    }

    let ticking = false;
    document.addEventListener('mousemove', (e) => {
        if (!noBtn) return;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const btnRect = noBtn.getBoundingClientRect();
                const centerX = btnRect.left + btnRect.width / 2;
                const centerY = btnRect.top + btnRect.height / 2;
                const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

                if (distance < GAME_CONFIG.PROXIMITY_THRESHOLD) {
                    handleButtonMovement(e.clientX, e.clientY);
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    if (noBtn) {
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            handleButtonMovement(touch.clientX, touch.clientY);
        });
    }

    // Run init
    initApp();
});
