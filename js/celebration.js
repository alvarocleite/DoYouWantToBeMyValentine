document.addEventListener('DOMContentLoaded', () => {
    const gifContainer = document.getElementById('gif-container');
    
    // Array of festive/love GIFs using the more reliable i.giphy.com format
    const gifs = [
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3RycHBrZzR2eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqDrG/giphy.gif', // Hearts
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3RycHBrZzR2eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MeIucAjPKoA120R7sN/giphy.gif', // Cat
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3RycHBrZzR2eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0Cyhi8GCSU91PvtC/giphy.gif', // Dog
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3Fzd3dvOWQ4cDMzaXk5NDY5ZmZtdnk5ajZoamV1aXF5NmtqcDZteSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/R6gvnAxj2ISzJdbA63/giphy.gif',
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWttZzVjZmc4MThzcHpibnhsNnEwNTRhN3A5am1jMmIyaTVtanFsNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qC3nrM02H2Kb29sUOn/giphy.gif',
        'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmx1NDJoeGJ6cmdnZHRueHlkeWh0MzNlYnR1cGRwNmJkemQ1YmlkaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PuTSgeacS3Z7i/giphy.gif'
    ];

    // Select a random GIF
    const randomIndex = Math.floor(Math.random() * gifs.length);
    const selectedGif = gifs[randomIndex];

    // Create and append image element
    const img = document.createElement('img');
    img.src = selectedGif;
    img.alt = "Celebration GIF";
    
    gifContainer.appendChild(img);
});