function injectCss() {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.runtime.getURL('styles/main.css');
    (document.html || document.documentElement).appendChild(style);
}

function removeVideo() {
    const videoElement = document.getElementsByClassName('the-work')[0];
    if (videoElement) videoElement.remove();
}

function addVideo() {
    removeVideo();

    const videoFilename = 'assets/the-work.webm';
    const videoUrl = chrome.runtime.getURL(videoFilename);

    const video = document.createElement('video');
    video.setAttribute('width', `${1920 / 2}`);
    video.setAttribute('height', `${1080 / 2}`);
    video.setAttribute('name', 'media');
    video.setAttribute('src', videoUrl);
    video.onended = () => removeVideo();
    video.addEventListener('loadeddata', () => {
        video.style.visibility = 'visible';
        video.play();
    }, false);
    video.onerror = () => {
        alert('ooops... the work is mysterious and errant. try on another tab');
        removeVideo();
    };
    video.load();

    const videoInnerDiv = document.createElement('div');
    videoInnerDiv.classList.add('container');
    videoInnerDiv.appendChild(video);

    const videoDiv = document.createElement('div');
    videoDiv.classList.add('the-work');
    videoDiv.appendChild(videoInnerDiv);

    document.querySelector('body').appendChild(videoDiv);
}

(() => {
    injectCss();
    addVideo();
})();