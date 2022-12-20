function $(elem) {
    return document.querySelector(elem)
}

const $containCards = $(".contain-cards")
const $nextPage = $('#next-page')
const $previousPage = $('#previous-page')
const $initPage = $('#init-page')
const $lastPage = $('#last-page')
const $filterAll = $('#filter-all')
const $filterGrass = $('#filter-grass')
const $filterFire = $('#filter-fire')
const $filterWater = $('#filter-water')
const $filterNormal = $('#filter-normal')

// let page = 1;
let offset = 0;
let allDetailPokemons;
let totalPokemons;
let response;
let totalPages;

window.onload = async () => {
    //cargar cards
    load(0)
}

function load(offset) {

    if (offset < 20) {
        $previousPage.classList.add('desactived')
        $initPage.classList.add('desactived')
    } else {
        $previousPage.classList.remove('desactived')
        $initPage.classList.remove('desactived')
    }

    if (offset + 20 > totalPokemons) {
        $nextPage.classList.add('desactived')
        $lastPage.classList.add('desactived')
    } else {
        $nextPage.classList.remove('desactived')
        $lastPage.classList.remove('desactived')
    }





    /* try {
        response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        response = await response.json();
        totalPokemons = response.count   //1545;
        totalPages = totalPokemons / 20
        let tanto;
        //TotalPages
    } catch (error) {
        console.log(error)
    } */

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        .then(response => response.json())
        .then(data => {
            response = data
            totalPokemons = data.count   //1545;
            totalPages = totalPokemons / 20
        })
        .catch (error => console.log(error)) 
    





    /* 
    // DESTE ESTE LINEA
    let arrayPromises = [];
    try {
        response.results.forEach(async pokemon => {
            arrayPromises.push(fetch(pokemon.url))
        });
        allDetailPokemons = await Promise.all(arrayPromises)
        allDetailPokemons = await Promise.all(allDetailPokemons.map(responsePokemon => responsePokemon.json()))
        paintCards(allDetailPokemons)
    } catch (error) {
        console.log(error)
    }
    // HASTA ESTA LINEA ES PARTICULAR DE POKEAPI
    */


    
    // DESTE ESTE LINEA
    let arrayPromises = [];
        response.results.forEach(async pokemon => {
            arrayPromises.push(fetch(pokemon.url))
        });
        Promise.all(arrayPromises)
            .then(response => {
                allDetailPokemons = response
                Promise.all(allDetailPokemons.map(responsePokemon => responsePokemon.json()))
                .then(data => {
                    console.log(data)
                    allDetailPokemons = data
                    console.log(allDetailPokemons)
                    paintCards(allDetailPokemons)
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    // HASTA ESTA LINEA ES PARTICULAR DE POKEAPI
    

}


$nextPage.onclick = nextPage
$previousPage.onclick = previousPage
$initPage.onclick = initPage
$lastPage.onclick = lastPage

$filterAll.onclick = filterAll
$filterGrass.onclick = filterGrass
$filterFire.onclick = filterFire
$filterWater.onclick = filterWater
$filterNormal.onclick = filterNormal

function nextPage() {
    if (offset + 20 < totalPokemons) {
        offset += 20;
        load(offset)
    }
}

function previousPage() {
    if (offset > 0) {
        offset -= 20;
        load(offset)
    }
}

function initPage() {
    if (offset !== 0) {
        offset = 0;
        load(offset)
    }
}

function lastPage() {
    if (offset + 20 < totalPokemons) {
        while (offset + 20 < totalPokemons) {
            offset += 20
        }
        load(offset)
    }
}

async function filterAll() {
    paintCards(allDetailPokemons)
}

async function filterGrass() {
    let pokemonFilters = [];
    allDetailPokemons.forEach(pokemon => {
        pokemon.types.forEach(typePokemon => {
            if(typePokemon.type.name === "grass") {
                pokemonFilters.push(pokemon)
            }
        })
    })
    paintCards(pokemonFilters)


    /* 
    let charactersFilters = [];
    allCharacters.forEach(character => {
        if(character.gender === "male") {
            charactersFilters.push(character)
        }
    })
    paintCards(charactersFilters)
    */
}

async function filterFire() {
    let pokemonFilters = [];
    allDetailPokemons.forEach(pokemon => {
        pokemon.types.forEach(typePokemon => {
            if(typePokemon.type.name === "fire") {
                pokemonFilters.push(pokemon)
            }
        })
    })
    paintCards(pokemonFilters)
}

async function filterWater() {
    let pokemonFilters = [];
    allDetailPokemons.forEach(pokemon => {
        pokemon.types.forEach(typePokemon => {
            if(typePokemon.type.name === "water") {
                pokemonFilters.push(pokemon)
            }
        })
    })
    paintCards(pokemonFilters)
}

async function filterNormal() {
    let pokemonFilters = [];
    allDetailPokemons.forEach(pokemon => {
        pokemon.types.forEach(typePokemon => {
            if(typePokemon.type.name === "normal") {
                pokemonFilters.push(pokemon)
            }
        })
    })
    paintCards(pokemonFilters)
}



function paintCards (pokemonsToPaint) {
    $containCards.innerHTML = ""
    pokemonsToPaint.forEach(pokemon => {
        $containCards.innerHTML += `<div class="card">
            <img src=${pokemon.sprites.other.home.front_default} class="img-pokemon">
            <div class="contain-info">
                <p>Name: ${pokemon.name}</p>
                <p>Base Experience: ${pokemon.base_experience}</p>
                <p>Hp: ${pokemon.stats[0].base_stat}</p>
                <p>Atack: ${pokemon.stats[1].base_stat}</p>
                <p>Defense: ${pokemon.stats[2].base_stat}</p>
                <p>Speed: ${pokemon.stats[5].base_stat}</p>
            </div>
        </div>`
    })
}