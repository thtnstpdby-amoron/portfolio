window.addEventListener('load', () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach((container) => {
    // 1. Instance Configuration
    const folderPath = container.dataset.folderPath;
    const images = JSON.parse(container.dataset.images);
    
    const track = container.querySelector('.carousel-track');
    const nextButton = container.querySelector('.carousel-button.next');
    const prevButton = container.querySelector('.carousel-button.prev');

    // 2. Instance State
    let currentIndex = 0;
    let slides = [];

    // 3. Initialization
    const buildCarousel = () => {
        const fragment = document.createDocumentFragment();

        images.forEach((fileName, index) => {
        const li = document.createElement('li');
        li.className = 'carousel-slide';
        
        const img = document.createElement('img');
        img.src = `${folderPath}${fileName}`;
        img.alt = `Slide ${index + 1}`;
        
        li.appendChild(img);
        fragment.appendChild(li);
        });

        track.appendChild(fragment);
        slides = Array.from(track.children);
    };

    // 4. Movement Logic
    const moveSlide = (direction) => {
        const total = slides.length;
        
        if (direction === 'next') {
        currentIndex = (currentIndex + 1) % total;
        } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + total) % total;
        }

        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    // 5. Event Listeners
    nextButton.addEventListener('click', () => moveSlide('next'));
    prevButton.addEventListener('click', () => moveSlide('prev'));
    window.addEventListener('resize', () => moveSlide('current'));

    // 6. Execute Instance
    buildCarousel();
    });
});