const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureInfo = document.getElementById('creature-info');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const API_BASE_URL = 'https://rpg-creature-api.freecodecamp.rocks';

async function searchCreature() {
    const searchValue = searchInput.value.trim().toLowerCase();

    if (!searchValue) {
        alert('Please enter a creature name or ID');
        return;
    }

    try {
        // Try to fetch the creature data
        const response = await fetch(`${API_BASE_URL}/api/creature/${searchValue}`);

        if (!response.ok) {
            throw new Error('Creature not found');
        }

        const creatureData = await response.json();
        displayCreatureData(creatureData);

    } catch (error) {
        alert('Creature not found');
        creatureInfo.style.display = 'none';
    }
}

function displayCreatureData(creature) {
    // Clear previous types
    types.innerHTML = '';

    // Set creature data
    creatureName.textContent = creature.name.toUpperCase();
    creatureId.textContent = `#${creature.id}`;
    weight.textContent = `Weight: ${creature.weight}`;
    height.textContent = `Height: ${creature.height}`;

    // Set stats from the array format
    creature.stats.forEach(stat => {
        switch (stat.name) {
            case 'hp':
                hp.textContent = stat.base_stat;
                break;
            case 'attack':
                attack.textContent = stat.base_stat;
                break;
            case 'defense':
                defense.textContent = stat.base_stat;
                break;
            case 'special-attack':
                specialAttack.textContent = stat.base_stat;
                break;
            case 'special-defense':
                specialDefense.textContent = stat.base_stat;
                break;
            case 'speed':
                speed.textContent = stat.base_stat;
                break;
        }
    });

    // Add types
    creature.types.forEach(typeInfo => {
        const typeElement = document.createElement('span');
        typeElement.className = 'type-badge';
        typeElement.textContent = typeInfo.name.toUpperCase();
        types.appendChild(typeElement);
    });

    // Show creature info
    creatureInfo.style.display = 'block';
}

// Add event listeners
searchButton.addEventListener('click', searchCreature);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCreature();
    }
});

// Focus on search input when page loads
window.addEventListener('load', () => {
    searchInput.focus();
});