import sys

lightbox_css = """
/* Lightbox Styles */
.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: zoom-out;
}

.lightbox.active {
    display: flex;
    opacity: 1;
}

.lightbox img,
.lightbox video {
    max-width: 90%;
    max-height: 90vh;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    transform: scale(0.95);
    transition: transform 0.3s ease;
}

.lightbox img {
    cursor: default;
}

.lightbox.active img,
.lightbox.active video {
    transform: scale(1);
}
"""

with open('c:/Users/bluewaves/Desktop/HEROI/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('max-width: 1200px;', 'max-width: 500px;')
css = css.replace('align-items: center;', 'align-items: flex-start;', 1)
css = css.replace('    height: 80vh;\n', '')
css = css.replace('height: 100%;\n    object-fit: contain;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}', 'height: auto;\n    border-radius: 10px;\n    display: block;\n}')
css = css.replace('.video-thumbnail-wrapper {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: 10px;\n    overflow: hidden;\n    cursor: pointer;\n}', '.video-thumbnail-wrapper {\n    position: relative;\n    width: 100%;\n    height: auto;\n    border-radius: 10px;\n    overflow: hidden;\n    cursor: pointer;\n}')

if 'cursor: zoom-in' not in css:
    css += '\n.vibrations-gallery img { cursor: zoom-in; transition: transform 0.2s ease; }\n.vibrations-gallery img:hover { transform: scale(1.01); }\n'

if 'Lightbox Styles' not in css:
    css += lightbox_css

with open('c:/Users/bluewaves/Desktop/HEROI/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

lightbox_js = """
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
                        if (src.includes('#t=')) src = src.split('#t=')[0];
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
            }, 300);
        });
    }
});
"""

with open('c:/Users/bluewaves/Desktop/HEROI/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

if '// Lightbox Interaction' not in js:
    with open('c:/Users/bluewaves/Desktop/HEROI/script.js', 'w', encoding='utf-8') as f:
        f.write(js + '\n' + lightbox_js)

html_modal = """
    <!-- Lightbox Overlay -->
    <div id="lightbox" class="lightbox">
        <img id="lightbox-img" src="" style="display: none;">
        <video id="lightbox-video" src="" controls playsinline style="display: none;"></video>
    </div>
"""

with open('c:/Users/bluewaves/Desktop/HEROI/vibrations.html', 'r', encoding='utf-8') as f:
    html = f.read()

if 'Lightbox Overlay' not in html:
    html = html.replace('<script src="script.js', html_modal + '    <script src="script.js')
    html = html.replace('?v=18', '?v=19')

with open('c:/Users/bluewaves/Desktop/HEROI/vibrations.html', 'w', encoding='utf-8') as f:
    f.write(html)
