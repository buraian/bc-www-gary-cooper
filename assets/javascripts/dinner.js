document.addEventListener('DOMContentLoaded', function() {

    var hamburger = document.getElementById('header--button--dinner');
    var offclick = document.getElementById('page--main--overlay');

    function exposeDinnerMenu(e) {
        document.body.classList.toggle('dinner-menu-exposed');
    }

    hamburger.addEventListener('click', exposeDinnerMenu, false);
    offclick.addEventListener('click', exposeDinnerMenu, false);
});
