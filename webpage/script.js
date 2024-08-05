function filterMovies(category) {
    var movies = document.querySelectorAll('.movie');
    movies.forEach(function(movie) {
        if (category === 'all' || movie.getAttribute('data-category') === category) {
            movie.style.display = 'block';
        } else {
            movie.style.display = 'none';
        }
    });
}
