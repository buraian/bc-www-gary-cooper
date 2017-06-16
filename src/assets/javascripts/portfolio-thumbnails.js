window.addEventListener('load', function() {

    // Initiate Isotope layout
    var thumbsContainer = document.getElementById('portfolio-item--thumbnails');
    if (thumbsContainer) {

        var iso = new Isotope( thumbsContainer, {
            itemSelector: '.portfolio-item--thumbnail',
            layoutMode: 'masonry'
        });
    }

    // Colorize Thumbs
    var thumbs = document.getElementsByClassName('portfolio-item--thumbnail');
    if (thumbs.length > 0) {
        var counter = 0;
        var i = setInterval(function() {
            if (counter === thumbs.length - 1) clearInterval(i);
            thumbs[counter].classList.remove('loading');
            counter++;
        }, 10);
    }
});
