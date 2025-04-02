document.addEventListener("DOMContentLoaded", () => {
    const productImages = [
        { thumb: "./images/front-view.jpg", full: "./images/front-view.jpg", alt: "Front view of shirt" },
        { thumb: "./images/back-view.jpg", full: "./images/back-view.jpg", alt: "Back view of shirt" },
        { thumb: "./images/side-view.jpg", full: "./images/side-view.jpg", alt: "Side view of shirt" }
    ];

    // Get the containers
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const mainImageContainer = document.querySelector('.main-image-container');
    const mainImage = document.createElement('img');
    mainImage.className = 'main-image';
    
    // Insert thumbnails
    thumbnailContainer.innerHTML = productImages.map((img, index) => `
        <img class="thumbnail"
            src="${img.thumb}"
            alt="${img.alt}"
            data-full="${img.full}"
            data-index="${index}">
    `).join('');
    
    // Set initial main image
    mainImage.src = productImages[0].full;
    mainImage.alt = productImages[0].alt;
    mainImageContainer.appendChild(mainImage);
    
    // Thumbnail click handler - updates main image
    document.querySelectorAll(".thumbnail").forEach(thumb => {
        thumb.addEventListener("click", function() {
            const imgIndex = parseInt(this.dataset.index);
            mainImage.src = productImages[imgIndex].full;
            mainImage.alt = productImages[imgIndex].alt;
        });
    });

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentIndex = 0;

    // Main image click handler - opens lightbox
    mainImage.addEventListener("click", () => {
        currentIndex = Array.from(document.querySelectorAll('.thumbnail'))
            .findIndex(thumb => thumb.dataset.full === mainImage.src);
        updateLightbox();
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    function updateLightbox() {
        lightboxImg.src = productImages[currentIndex].full;
        lightboxImg.alt = productImages[currentIndex].alt;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % productImages.length;
        updateLightbox();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + productImages.length) % productImages.length;
        updateLightbox();
    }

    lightboxClose.addEventListener("click", () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    });

    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener("click", showPrev);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') {
                lightbox.style.display = "none";
                document.body.style.overflow = "auto"; 
            }
        }
    });

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // Size selection
    const sizeOptions = document.querySelectorAll(".size-option");
    sizeOptions.forEach(option => {
        option.addEventListener("click", function() {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add to bag functionality
    document.getElementById('addToBag').addEventListener("click", () => {
        const selectedSize = document.querySelector(".size-option.active").textContent;
        alert(`Added ${selectedSize} to your bag!`);
    });
});