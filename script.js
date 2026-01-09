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

    // Subscribe Form Handling
    const subscribeForm = document.getElementById('subscribe-form');
    const subscribeMessage = document.getElementById('subscribe-message');
    const subscribeDesc = document.querySelector('.subscribe-desc');
    const subscribeInput = document.querySelector('.subscribe-input');

    if (subscribeForm && subscribeMessage) {
        subscribeForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = subscribeInput.value;
            const pubId = '190e25f3-8141-497f-8862-338c7b6c5c22';

            // UI Feedback: Show loading or just success immediately for "optimistic" UI
            // We'll try to send data, but show success regardless to not block user flow if CORS issues.

            try {
                // Correct Endpoint for standard embeds
                const formId = 'a16104d2-e21d-476a-9f96-3917f6c80979';

                // Construct URL encoded data (mimicking a standard form submit)
                const formData = new URLSearchParams();
                formData.append('form[email]', email);
                formData.append('form_id', formId);
                formData.append('utm_source', 'heroi_website');
                formData.append('utm_medium', 'custom_form');

                // We use no-cors to bypass CORS restrictions on the public form endpoint
                await fetch('https://subscribe-forms.beehiiv.com/api/submit', {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                });
            } catch (err) {
                console.log('Subscription attempt error:', err);
            }

            // Show Success State
            subscribeForm.style.display = 'none';
            if (subscribeDesc) subscribeDesc.style.display = 'none';
            subscribeMessage.style.display = 'block';
        });
    }
});
