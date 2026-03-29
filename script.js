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

// Lightbox Interaction for Vibrations Gallery
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.vibrations-gallery img, .vibrations-gallery video');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                if (lightboxImg) lightboxImg.style.display = 'none';
                if (lightboxVideo) {
                    lightboxVideo.style.display = 'none';
                    lightboxVideo.pause();
                }

                if (item.tagName.toLowerCase() === 'img') {
                    if (lightboxImg) {
                        lightboxImg.src = item.src;
                        lightboxImg.style.display = 'block';
                    }
                } else if (item.tagName.toLowerCase() === 'video') {
                    if (lightboxVideo) {
                        let src = item.src;
                        if (src.includes('#t=')) src = src.split('#t=')[0]; // Remove thumbnail hack
                        lightboxVideo.src = src;
                        lightboxVideo.style.display = 'block';
                        lightboxVideo.play();
                    }
                }

                lightbox.style.display = 'flex';
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightboxVideo) return;
            
            lightbox.classList.remove('active');
            if (lightboxVideo) lightboxVideo.pause();

            setTimeout(() => {
                lightbox.style.display = 'none';
                if (lightboxImg) lightboxImg.src = '';
                if (lightboxVideo) lightboxVideo.src = '';
            }, 300); // Matches CSS transition duration
        });
    }
});
