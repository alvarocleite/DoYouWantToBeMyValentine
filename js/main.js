document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Name Injection
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || 'Sweetheart';
    document.getElementById('question').innerText = `${name}, Do You Want to Be My Valentine?`;

    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    let hasMoved = false;

    // 2. Success State
    yesBtn.addEventListener('click', () => {
        window.location.href = 'celebration.html';
    });

    // 3. The Unclickable "No" Button
    const moveButton = () => {
        if (!hasMoved) {
            // Create a spacer to hold the layout position
            const spacer = document.createElement('div');
            spacer.style.width = `${noBtn.offsetWidth}px`;
            spacer.style.height = `${noBtn.offsetHeight}px`;
            spacer.style.display = 'inline-block'; // Maintain inline-block behavior if needed
            // Insert spacer where the button currently is to prevent layout shift
            noBtn.parentNode.insertBefore(spacer, noBtn);
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

        const newLeft = Math.max(padding, Math.random() * maxLeft);
        const newTop = Math.max(padding, Math.random() * maxTop);

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
            moveButton();
        }
    });
    
    // Trigger on touchstart (mobile) - before click registers
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        moveButton();
    });
});
