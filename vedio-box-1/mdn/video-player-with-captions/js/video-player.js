(function () {
    'use strict';

    // ... (Your existing code)

    // Add event listeners for video specific events
    video.addEventListener('play', function () {
        changeButtonState('playpause');
    }, false);
    video.addEventListener('pause', function () {
        changeButtonState('playpause');
    }, false);
    video.addEventListener('volumechange', function () {
        checkVolume();
    }, false);

    // Add events for all buttons
    playpause.addEventListener('click', function (e) {
        if (video.paused || video.ended) video.play();
        else video.pause();
    });

    // Turn off all subtitles
    for (var i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = 'hidden';
    }

    // Creates and returns a menu item for the subtitles language menu
    var subtitleMenuButtons = [];
    var createMenuItem = function (id, lang, label) {
        var listItem = document.createElement('li');
        var button = listItem.appendChild(document.createElement('button'));
        button.setAttribute('id', id);
        button.className = 'subtitles-button';
        if (lang.length > 0) button.setAttribute('lang', lang);
        button.value = label;
        button.setAttribute('data-state', 'inactive');
        button.appendChild(document.createTextNode(label));
        button.addEventListener('click', function (e) {
            // Set all buttons to inactive
            subtitleMenuButtons.map(function (v, i, a) {
                subtitleMenuButtons[i].setAttribute('data-state', 'inactive');
            });
            // Find the language to activate
            var lang = this.getAttribute('lang');
            for (var i = 0; i < video.textTracks.length; i++) {
                // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
                if (video.textTracks[i].language == lang) {
                    video.textTracks[i].mode = 'showing';
                    this.setAttribute('data-state', 'active');
                }
                else {
                    video.textTracks[i].mode = 'hidden';
                }
            }
            subtitlesMenu.style.display = 'none';
        });
        subtitleMenuButtons.push(button);
        return listItem;
    }

    // ... (Remaining code remains unchanged)

    // React to the user clicking within the progress bar
    progress.addEventListener('click', function (e) {
        // Also need to take the parents into account here as .controls and figure now have position:relative
        var pos = (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft + this.offsetParent.offsetParent.offsetLeft)) / this.offsetWidth;
        video.currentTime = pos * video.duration;
    });

    // Listen for fullscreen change events (from other controls, e.g. right-clicking on the video itself)
    document.addEventListener('fullscreenchange', function (e) {
        setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
    });
    document.addEventListener('webkitfullscreenchange', function () {
        setFullscreenData(!!document.webkitIsFullScreen);
    });
    document.addEventListener('mozfullscreenchange', function () {
        setFullscreenData(!!document.mozFullScreen);
    });
    document.addEventListener('msfullscreenchange', function () {
        setFullscreenData(!!document.msFullscreenElement);
    });
})();
