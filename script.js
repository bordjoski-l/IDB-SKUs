// Create a list of images and their alt text
const imageList = [
    { src: "img/01.png", alt: "IDB-HDMI-C" },
    { src: "img/02.png", alt: "IDB-RJ45-C" },
    { src: "img/03.png", alt: "IDB-USBC-C" },
    { src: "img/04.png", alt: "IDB-USBA-C" }
];

// Function to cycle through images
function cycleImage(imageElement) {
    // Get current image source
    let currentSrc = imageElement.src;

    // Find the current index in the image list
    let currentIndex = imageList.findIndex(item => currentSrc.includes(item.src));

    // Calculate the next index (loop back to 0 if at the end)
    let nextIndex = (currentIndex + 1) % imageList.length;

    // Update the image source and alt text
    imageElement.src = imageList[nextIndex].src;
    imageElement.alt = imageList[nextIndex].alt;
}

// Attach click event to each image
document.querySelectorAll('.image-block img').forEach(img => {
    img.addEventListener('click', function() {
        cycleImage(this); // Pass the clicked image to the function
    });
});

// Select the Done button and Popup elements
const doneButton = document.getElementById('done-button');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const closePopupButton = document.getElementById('close-popup');

// Function to open the popup and show selected images' text
doneButton.addEventListener('click', () => {
    // Get all image elements
    const images = document.querySelectorAll('.image-block img');

    // Create an object to count occurrences of each alt text
    const altCounts = {};

    images.forEach(img => {
        const altText = img.alt;
        if (altCounts[altText]) {
            altCounts[altText]++; // Increment count if altText exists
        } else {
            altCounts[altText] = 1; // Initialize count to 1
        }
    });

// Create the display text from the counts
const selectedTexts = Object.entries(altCounts)
    .map(([altText, count]) => `${count} x ${altText}`)
    .join('\n'); // Join with a newline for multiple rows

// Update the popup text
popupContent.querySelector('p').innerText = `
    Place an Order Using These SKUs:
    ----------------------------------------------
    IDB-400-MS-C
    IDB-K2-C
    ${selectedTexts}
`;

// Show the popup
popup.style.display = 'flex';
});


// Function to close the popup
closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

