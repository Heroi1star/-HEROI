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
        timeZoneCode = 'LOC';
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
