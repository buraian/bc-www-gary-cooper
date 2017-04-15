window.addEventListener('load', function() {

    var thumbs = document.getElementById('portfolio-item--thumbnails');
    if (thumbs) {
        var iso = new Isotope( thumbs, {
            itemSelector: '.portfolio-item--thumbnail',
            layoutMode: 'masonry'
        });
    }
});
