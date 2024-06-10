$(document).ready(function() {
    // The playSound function is called when a key is pressed or when an element is clicked/touched
    function playSound(e) {
        let keyCode;
        // Determine the key code if the event is a keydown
        if (e.type === 'keydown') {
            keyCode = e.keyCode;
        // Determine the key code if the event is a mousedown or touchstart
        } else if (e.type === 'mousedown' || e.type === 'touchstart') {
            keyCode = $(e.target).closest('.key').data('key');
        }

        // Select the audio element corresponding to the key code
        const audio = $(`audio[data-key="${keyCode}"]`)[0];
        // Select the key element corresponding to the key code
        const key = $(`div[data-key="${keyCode}"]`);
        // If no audio or if the key is already in 'playing' state, exit the function
        if (!audio || key.hasClass('playing')) return;

        // Add the 'playing' class to the key
        key.addClass('playing');
        // Rewind the audio to the start and play the sound
        audio.currentTime = 0;
        audio.play();
    }

    // The resetKey function is called to remove the 'playing' state from a key
    function resetKey(e) {
        let keyCode;
        // Determine the key code if the event is a keyup
        if (e.type === 'keyup') {
            keyCode = e.keyCode;
        } else {
            keyCode = $(e.target).closest('.key').data('key');
        }

        // Select the key element corresponding to the key code and remove the 'playing' class
        const key = $(`div[data-key="${keyCode}"]`);
        key.removeClass('playing');
    }

    // Bind the keydown and keyup events to the window to play and stop the sound
    $(window).on('keydown', playSound);
    $(window).on('keyup', resetKey);
    // Bind the mousedown, touchstart, mouseup, mouseleave, and touchend events to elements with class 'key'
    $('.key').on('mousedown touchstart', playSound);
    $('.key').on('mouseup mouseleave touchend', resetKey);
});
