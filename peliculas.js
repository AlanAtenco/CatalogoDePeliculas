class MovieCatalog {
  #movies;
  #defaultImageUrl;

  constructor() {
    this.#movies = [];
    this.#defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Yd5gXf6tCxXAxtpCQB3_vwVgP6zVRo--J8PEzHglTg&s'; // Cambia esta URL a la ruta de tu imagen predeterminada
    this.initialize();
  }

  initialize() {
    const addMovieBtn = document.getElementById('addMovieBtn');
    addMovieBtn.addEventListener('click', () => this.addMovie());

    this.renderMovies();
  }

  addMovie() {
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const year = document.getElementById('year').value;

    if (!title || !director || !year) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const movie = { title, director, year, imageUrl: this.#defaultImageUrl };
    this.#movies.push(movie);
    this.clearForm();
    this.renderMovies();
  }

  editMovie(index) {
    const movie = this.#movies[index];
    document.getElementById('title').value = movie.title;
    document.getElementById('director').value = movie.director;
    document.getElementById('year').value = movie.year;

    const addMovieBtn = document.getElementById('addMovieBtn');
    addMovieBtn.textContent = 'Guardar Cambios';

    // Eliminar el evento anterior para evitar múltiples enlaces
    const newBtn = addMovieBtn.cloneNode(true);
    addMovieBtn.parentNode.replaceChild(newBtn, addMovieBtn);
    
    newBtn.addEventListener('click', () => this.saveChanges(index));
  }

  saveChanges(index) {
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const year = document.getElementById('year').value;

    if (!title || !director || !year) {
      alert('Por favor, complete todos los campos');
      return;
    }

    this.#movies[index] = { title, director, year, imageUrl: this.#defaultImageUrl };
    this.clearForm();
    this.renderMovies();

    const addMovieBtn = document.getElementById('addMovieBtn');
    addMovieBtn.textContent = 'Agregar Película';

    // Eliminar el evento anterior para evitar múltiples enlaces
    const newBtn = addMovieBtn.cloneNode(true);
    addMovieBtn.parentNode.replaceChild(newBtn, addMovieBtn);
    
    newBtn.addEventListener('click', () => this.addMovie());
}

  deleteMovie(index) {
    this.#movies.splice(index, 1);
    this.renderMovies();
}

  renderMovies() {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    this.#movies.forEach((movie, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${movie.imageUrl}" alt="${movie.title}">
        <div>
          <strong>${movie.title}</strong> (${movie.year})<br>
          Dirigida por: ${movie.director}
        </div>
        <button onclick="movieCatalog.editMovie(${index})">Editar</button>
        <button onclick="movieCatalog.deleteMovie(${index})">Eliminar</button>
      `;
      movieList.appendChild(li);
    });
}

  clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('director').value = '';
    document.getElementById('year').value = '';
  }
}
const movieCatalog = new MovieCatalog();
