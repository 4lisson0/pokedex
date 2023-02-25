const pokemonName = document.querySelector('.pokemon-name'); // procura elemento pela Class no HTML
const pokemonNumber = document.querySelector('.pokemon-number');
const buttonPrev = document.querySelector('.Prev');
const buttonNext = document.querySelector('.Next');
const pokemonImage = document.getElementById('pokemon-image'); // procura elemento pelo ID no HTML

const form = document.querySelector('.search-pokemon');
const input = document.querySelector('.input-search');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if (data) {
                pokemonName.innerHTML = data.name;
                        pokemonNumber.innerHTML = data.id;
                                pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
                                        pokemonImage.style.display = ''
                                                searchPokemon = data.id
                                                        input.value('')
    }
    } else {
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

renderPokemon('1')

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})
