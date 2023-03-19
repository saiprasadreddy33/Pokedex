const grid = document.querySelector('#grid');

const createPokemonGrid = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemonList = data.results;
        for (const pokemon of pokemonList) {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            const { id, name, types } = data;
            const type = types.map(type => type.type.name).join(', ');

            const pokemonDiv = createPokemonCard({
                id,
                name,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                types,
            });

            grid.appendChild(pokemonDiv);
        }
    } catch (error) {
        console.log(error);
    }
};
const grid = document.querySelector('#grid');
const searchInput = document.querySelector('#search-input');
const filterSelect = document.querySelector('#filter-select');
const favoriteButton = document.querySelector('#favorite-button');

let pokemonList = [];

const createPokemonGrid = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        pokemonList = data.results;

        for (const pokemon of pokemonList) {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            const { id, name, types } = data;
            const type = types.map(type => type.type.name).join(', ');

            const pokemonDiv = createPokemonCard({
                id,
                name,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                types,
            });

            grid.appendChild(pokemonDiv);
        }
    } catch (error) {
        console.log(error);
    }
};

const createPokemonCard = ({ id, name, imageUrl, types }) => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name;

    const nameElement = document.createElement('div');
    nameElement.classList.add('name');
    nameElement.innerText = name;

    const typeElement = document.createElement('div');
    typeElement.classList.add('type');
    typeElement.innerText = types.map((type) => type.type.name).join(', ');

    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.innerText = `#${id}`;

    pokemonDiv.appendChild(img);
    pokemonDiv.appendChild(nameElement);
    pokemonDiv.appendChild(typeElement);
    pokemonDiv.appendChild(numberElement);

    return pokemonDiv;
};

const filterPokemons = () => {
    const filterValue = filterSelect.value;
    const filteredPokemonList = pokemonList.filter((pokemon) => {
        const pokemonTypes = pokemon.types.map(type => type.type.name);
        return pokemonTypes.includes(filterValue);
    });

    clearGrid();
    filteredPokemonList.forEach((pokemon) => {
        const pokemonDiv = createPokemonCard({
            id: pokemon.id,
            name: pokemon.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
            types: pokemon.types,
        });

        grid.appendChild(pokemonDiv);
    });
};

const searchPokemons = () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    const searchedPokemonList = pokemonList.filter((pokemon) => {
        const pokemonName = pokemon.name.toLowerCase();
        return pokemonName.includes(searchValue);
    });

    clearGrid();
    searchedPokemonList.forEach((pokemon) => {
        const pokemonDiv = createPokemonCard({
            id: pokemon.id,
            name: pokemon.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
            types: pokemon.types,
        });

        grid.appendChild(pokemonDiv);
    });
};

const clearGrid = () => {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
};

const toggleFavorite = (pokemonDiv) => {
    pokemonDiv.classList.toggle('favorite');
};

createPokemonGrid();

searchInput.addEventListener('input', () => {
    searchPokemons();
});

filterSelect.addEventListener('change', () => {
    filterPokemons();
});

favoriteButton.addEventListener('click', () => {
    const favoritePokemon


const createPokemonCard = ({ id, name, imageUrl, types }) => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name;

    const nameElement = document.createElement('div');
    nameElement.classList.add('name');
    nameElement.innerText = name;

    const typeElement = document.createElement('div');
    typeElement.classList.add('type');
    typeElement.innerText = types.map((type) => type.type.name).join(', ');

    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.innerText = `#${id}`;

    pokemonDiv.appendChild(img);
    pokemonDiv.appendChild(nameElement);
    pokemonDiv.appendChild(typeElement);
    pokemonDiv.appendChild(numberElement);

    return pokemonDiv;
};

createPokemonGrid();
