document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Name Injection
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || 'Sweetheart';
    document.getElementById('question').innerText = `${name}, Do You Want to Be My Valentine?`;

    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    let hasMoved = false;

    // Success State
    yesBtn.addEventListener('click', () => {
        window.location.href = 'celebration.html';
    });

    // The Unclickable "No" Button
    const moveButton = (cursorX, cursorY) => {
        if (!hasMoved) {
            // Create a spacer to hold the layout position
            const spacer = document.createElement('div');
            spacer.style.width = `${noBtn.offsetWidth}px`;
            spacer.style.height = `${noBtn.offsetHeight}px`;
            spacer.style.display = 'inline-block'; // Maintain inline-block behavior if needed
            // Insert spacer where the button currently is to prevent layout shift
            noBtn.parentNode.insertBefore(spacer, noBtn);

            // Explicitly set width/height to prevent resizing when position becomes fixed
            noBtn.style.width = `${noBtn.offsetWidth}px`;
            noBtn.style.height = `${noBtn.offsetHeight}px`;
            
            hasMoved = true;
        }

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Get button dimensions
        const btnRect = noBtn.getBoundingClientRect();
        const btnWidth = btnRect.width;
        const btnHeight = btnRect.height;

        // Calculate safe area (padding from edges)
        const padding = 20;

        // Calculate new random position
        // Ensure it doesn't go off screen
        const maxLeft = viewportWidth - btnWidth - padding;
        const maxTop = viewportHeight - btnHeight - padding;

        let newLeft, newTop;
        let bestLeft, bestTop;
        let maxFoundDistance = -1;
        let attempts = 0;
        
        // Use 500px or 60% of the smaller viewport dimension, whichever is smaller.
        // This ensures the button is still "hard to get" on mobile without being mathematically impossible.
        const minDistance = Math.min(500, Math.min(viewportWidth, viewportHeight) * 0.6);

        // Try up to 100 times to find a position at least minDistance away from the cursor
        while (attempts < 100) {
            const tempLeft = Math.max(padding, Math.random() * maxLeft);
            const tempTop = Math.max(padding, Math.random() * maxTop);
            
            let currentDistance;
            if (cursorX !== undefined && cursorY !== undefined) {
                const newCenterX = tempLeft + btnWidth / 2;
                const newCenterY = tempTop + btnHeight / 2;
                currentDistance = Math.hypot(newCenterX - cursorX, newCenterY - cursorY);
            } else {
                currentDistance = minDistance + 1; // Satisfy condition if no cursor info
            }

            if (currentDistance > maxFoundDistance) {
                maxFoundDistance = currentDistance;
                bestLeft = tempLeft;
                bestTop = tempTop;
            }

            if (maxFoundDistance >= minDistance) {
                break;
            }
            attempts++;
        }

        newLeft = bestLeft;
        newTop = bestTop;

        // Apply new position
        noBtn.style.position = 'fixed'; // Use fixed to position relative to viewport
        noBtn.style.left = `${newLeft}px`;
        noBtn.style.top = `${newTop}px`;
    };

    // Trigger based on proximity (desktop)
    document.addEventListener('mousemove', (e) => {
        const btnRect = noBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

        if (distance < 100) {
            moveButton(e.clientX, e.clientY);
        }
    });
    
    // Trigger on touchstart (mobile) - before click registers
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        const touch = e.touches[0];
        moveButton(touch.clientX, touch.clientY);
    });
});
