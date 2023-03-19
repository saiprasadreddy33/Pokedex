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
