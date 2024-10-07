function searchCharactersByName(name, statusFilter, done) {
    const apiUrl = `https://rickandmortyapi.com/api/character/?name=${name}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Personaje no encontrado');
            }
            return response.json();
        })
        .then(data => {
            const filteredCharacters = data.results.filter(personaje => {
                if (statusFilter) {
                    return personaje.status.toLowerCase() === statusFilter.toLowerCase();
                }
                return true;
            });
            done(filteredCharacters);
        })
        .catch(error => {
            console.error(error);
            const main = document.querySelector("main");
            main.innerHTML = '<p>No se encontró ningún personaje con ese nombre.</p>';
        });
}

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;

    searchCharactersByName(searchQuery, statusFilter, characters => {
        const main = document.querySelector("main");
        main.innerHTML = '';  // Limpiar resultados anteriores

        characters.forEach(personaje => {
            const article = document.createRange().createContextualFragment(/*html*/ `
                <article>
                    <div class="image-container">
                        <img src="${personaje.image}" alt="${personaje.name}">
                    </div>
                    <h2>Name: ${personaje.name}</h2>
                    <p>Status: ${personaje.status}</p>
                    <p>Specie: ${personaje.species}</p>
                    <p>Gender: ${personaje.gender}</p>
                    <p>Origin Name: ${personaje.origin.name}</p>
                </article>
            `);

            main.append(article);
        });
    });
});

// Alternar tema claro/oscuro al cambiar el switch
document.getElementById('theme-toggle').addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');

    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        article.classList.toggle('dark-mode');
    });
});
