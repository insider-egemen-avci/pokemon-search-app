(() => {
    'use strict';

    const $ = (selector) => document.querySelector(selector);

    const { typeClass, shrinkClass } = {
        typeClass: 'type',
        shrinkClass: 'shrink'
    };

    const { searchInput, searchButton, pokemonContainer, pokemonName, pokemonId, pokemonWeight, pokemonHeight,
        pokemonSprite, pokemonTypes } = {
        searchInput: $('#search-input'),
        searchButton: $('#search-button'),
        pokemonContainer: $('#pokemon-container'),
        pokemonName: $('#pokemon-name'),
        pokemonId: $('#pokemon-id'),
        pokemonWeight: $('#weight'),
        pokemonHeight: $('#height'),
        pokemonSprite: $('#sprite'),
        pokemonTypes: $('#types'),
    };

    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
    };

    const setEventListeners = () => {
        searchButton.addEventListener('click', searchPokemon);
    };

    const searchPokemon = async () => {
        const searchValue = searchInput.value.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase();

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ searchValue }`);
            const data = await response.json();

            renderPokemon(data);
            resetInput();
        } catch (error) {
            handleError();
        }
    };

    const renderPokemon = (data) => {
        const { name, id, weight, height, sprites, types, stats } = data ?? {};

        pokemonName.textContent = name.toUpperCase();
        pokemonId.textContent = `#${ id }`;
        pokemonWeight.textContent = `Weight: ${ weight / 10 } kg`;
        pokemonHeight.textContent = `Height: ${ height / 10 } m`;
        pokemonSprite.src = sprites?.front_default ?? '';
        pokemonTypes.innerHTML = types.map((type) => {
            const typeName = type.type.name;
            const typeColor = typeColors[typeName] ?? '#000';

            return `<span class="${ typeClass }" style="background-color: ${ typeColor }">${ typeName }</span>`;
        }).join('');

        for (const pokemonStat of stats) {
            const { base_stat, stat } = pokemonStat;

            $(`#${ stat.name }`).innerHTML = `<span>${ stat.name }</span> <span>${ base_stat }</span>`;
        }

        pokemonContainer.classList.remove(shrinkClass);
    };

    const resetInput = () => {
        searchInput.style.backgroundColor = '';
        searchInput.value = '';
    };

    const handleError = () => {
        pokemonContainer.classList.add(shrinkClass);

        searchInput.style.backgroundColor = 'red';

        setTimeout(() => {
            resetInput();
            alert('Pokémon not found');
        }, 500);
    };

    setEventListeners();
})();