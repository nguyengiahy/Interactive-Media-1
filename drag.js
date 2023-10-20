const curtains = document.querySelectorAll('.curtain');                 // Get all elements with class 'curtain'
const curtainSound = document.getElementById('curtainSound');           // Get the audio element with id 'curtainSound'
const container = document.querySelector('.container');                 // Get the first element with class 'container'
let isDragging = false;                                                 // Flag to indicate whether a curtain is being dragged
const left_edge = container.getBoundingClientRect().left;               // Get the left boundary of the container

// Variables to hold x-coordinates when dragging starts and the current x-coordinate during dragging
let initialX = left_edge;
let currentX = left_edge;

let activeCurtain = null;                                               // Which curtain is currently active

// Attach a pointerdown event to each curtain. This event fires when a pointing device button is pressed down over an element.
curtains.forEach(curtain => {
    curtain.addEventListener('pointerdown', (e) => {
        isDragging = true;
        initialX = e.clientX;                                   // Capture the x-coordinate where dragging started
        currentX = curtain.getBoundingClientRect().left;        // Set current x-coordinate to curtain's left position
        activeCurtain = curtain;                                // Set the active curtain
        curtain.setPointerCapture(e.pointerId);                 // Capture all pointer events until released
    });
});

// Event listener for mouse movement across the document
document.addEventListener('mousemove', (e) => {
    // If dragging is active and there's an active curtain
    if (isDragging && activeCurtain) {
        curtainSound.play();                        // Play the curtain dragging sound

        // Calculate the difference between the current mouse x-coordinate and the initial one
        let deltaX = e.clientX - initialX;

        // Adjust the left position based on the difference calculated
        let newLeft = currentX + deltaX - left_edge;
        
        // Retrieve the maximum allowable percentage the curtain can be dragged from its data attribute
        const maxPercentage = parseFloat(activeCurtain.getAttribute('data-max-percentage'));

        // Calculate the maximum left position based on the container's width and the max percentage
        const maxLeftForCurrentCurtain = container.getBoundingClientRect().width * maxPercentage;

        // Ensure newLeft remains within the allowed boundaries
        if (newLeft < 0) {
            newLeft = 0;
        }
        if (newLeft > maxLeftForCurrentCurtain) {
            newLeft = maxLeftForCurrentCurtain;
        }

        // Apply the new left position to the active curtain
        activeCurtain.style.left = `${newLeft}px`;

        // Update the x-coordinates for the next movement
        initialX = e.clientX;
        currentX = newLeft + left_edge;
    }
});

// Event listener for mouse button release across the document
document.addEventListener('mouseup', () => {
    isDragging = false;                 // Reset the dragging flag
    activeCurtain = null;               // Clear the active curtain
    curtainSound.pause();               // Pause the curtain sound
    curtainSound.currentTime = 0;       // Reset the curtain sound to the beginning
});

// Create an Audio object for the background music
let bgMusic = new Audio('sounds/music.mov');
bgMusic.loop = true;        // Enable looping for the music
bgMusic.volume = 0.5;       // Adjust this to set the desired volume


// Event listener for mouse button press across the document
document.addEventListener('mousedown', () => {
    // If the background music isn't playing, play it
    if (bgMusic.paused) {
        bgMusic.play().catch((e) => {
            // Log any errors that occur while trying to play the music
            console.error("Couldn't play the background music:", e);
        });
    }
});

