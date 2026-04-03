function updateTime() {
    // Version 2.0
    const dateDisplay = document.getElementById('date-display');
    const timeDisplay = document.getElementById('time-display');
    const now = new Date();

    // Format: MM/DD/YYYY HH:MMam/pm TIMEZONE_ABBR
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;

    let timeZoneCode = '';
    try {
        const dateString = now.toLocaleTimeString('en-us', { timeZoneName: 'short' });
        const parts = dateString.split(' ');
        timeZoneCode = parts[parts.length - 1];
    } catch (e) {
        timeZoneCode = 'LOCAL';
    }

    const dateStr = `${month}/${day}/${year}`;
    const timeStr = `${hours}:${minutes}${ampm} ${timeZoneCode}`;

    if (dateDisplay) dateDisplay.textContent = dateStr;
    if (timeDisplay) timeDisplay.textContent = timeStr;
}

// Update immediately, then every second
updateTime();
setInterval(updateTime, 1000);
// Mobile Interaction: Toggle previews on click
document.addEventListener('DOMContentLoaded', () => {
    const previewItems = document.querySelectorAll('.log-details-list li.has-preview');

    previewItems.forEach(item => {
        // We attach listener to the whole item, but check if we clicked the text/row
        item.addEventListener('click', (e) => {
            // Prevent interaction if a link is clicked
            if (e.target.tagName === 'A' || e.target.closest('a')) return;

            // Prevent closing if interacting with the preview content (e.g. video, tweet)
            if (e.target.closest('.large-preview') || e.target.closest('.mobile-log-desc')) {
                return;
            }

            // Toggle active state
            const isActive = item.classList.contains('is-active');

            // Close all other open previews for a clean experience
            previewItems.forEach(i => {
                if (i !== item) i.classList.remove('is-active');
            });

            // Toggle the current one
            item.classList.toggle('is-active');
        });

    });


});

// Carousel Interaction for Vibrations Gallery
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    if (track && nextBtn && prevBtn) {
        // Collect all items (imgs and video wrappers)
        const slides = Array.from(track.children);
        let currentIndex = 0;

        function updateCarousel() {
            const amountToMove = -100 * currentIndex;
            track.style.transform = `translateX(${amountToMove}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            updateCarousel();
        });

        // Keyboard Navigation (Left/Right Arrows)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            }
        });

        // Swipe Detection for Mobile — attached to document for widest capture
        let touchStartX = 0;

        document.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        document.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextBtn.click(); // Swipe Left -> Next
                } else {
                    prevBtn.click(); // Swipe Right -> Prev
                }
            }
        }, { passive: true });
    }
});
// Native Video Playback inside Carousel
document.addEventListener('DOMContentLoaded', () => {
    const videoWrappers = document.querySelectorAll('.video-thumbnail-wrapper');
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        if (video) {
            wrapper.addEventListener('click', (e) => {
                if (!wrapper.classList.contains('is-playing')) {
                    e.preventDefault();
                    wrapper.classList.add('is-playing');
                    video.setAttribute('controls', 'true');
                    
                    if (video.src.includes('#t=')) {
                        video.src = video.src.split('#t=')[0];
                    }
                    video.play().catch(err => console.log('Playback error:', err));
                }
            });
        }
    });
});
