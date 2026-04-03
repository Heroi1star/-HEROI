import re

with open('c:/Users/bluewaves/Desktop/HEROI/vibrations.html', 'r', encoding='utf-8') as f:
    html = f.read()

if 'class="carousel-slide"' not in html:
    html = re.sub(r'(<img src="assets/vibrations_[^"]+" alt="VIBRATIONS">)', r'<div class="carousel-slide">\n                    \1\n                </div>', html)

html = html.replace('?v=21', '?v=23')
html = html.replace('?v=22', '?v=23')

with open('c:/Users/bluewaves/Desktop/HEROI/vibrations.html', 'w', encoding='utf-8') as f:
    f.write(html)


with open('c:/Users/bluewaves/Desktop/HEROI/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Blur background
css = css.replace('background: rgba(255,255,255,0.01);', 'background: rgba(255, 255, 255, 0.85);\n    backdrop-filter: blur(10px);\n    -webkit-backdrop-filter: blur(10px);')

# Update carousel elements
old_s = '.carousel-track > img,\n.carousel-track > .video-thumbnail-wrapper {\n    flex: 0 0 100%;\n    min-width: 100%;\n    max-width: 100%;\n    height: 100%;\n    object-fit: contain;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}'
replacement_track = '.carousel-track > .carousel-slide,\n.carousel-track > .video-thumbnail-wrapper {\n    flex: 0 0 100%;\n    width: 100%;\n    min-width: 100%;\n    height: 90vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}'
if old_s in css:
    css = css.replace(old_s, replacement_track)

if '.carousel-slide > img,' not in css:
    new_css = """
.carousel-slide > img,
.video-thumbnail-wrapper video {
    max-width: 90vw;
    max-height: 85vh;
    width: auto;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    object-fit: contain;
}
"""
    css += new_css

v_wrap = '.video-thumbnail-wrapper {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: 10px;\n    overflow: hidden;\n    cursor: pointer;\n}'
new_v_wrap = '.video-thumbnail-wrapper {\n    position: relative;\n    width: 100%;\n    height: 90vh;\n    overflow: visible;\n    cursor: default;\n}'
css = css.replace(v_wrap, new_v_wrap)

v_vid = '.vibrations-gallery video {\n    max-width: 100%;\n    max-height: 100%;\n    object-fit: contain;\n    border-radius: 10px;\n    display: block;\n    border: none;\n}'
css = css.replace(v_vid, '')

with open('c:/Users/bluewaves/Desktop/HEROI/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
