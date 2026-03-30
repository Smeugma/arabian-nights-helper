function updateType() { 
    console.log("Type changed!"); // This should pop up in the background
    const type = document.getElementById('typeSelect').value;
    const cardSection = document.getElementById('cardSection');
    const rollSection = document.getElementById('rollSection');
    const charPath = document.getElementById('charPath');
    const terrainPath = document.getElementById('terrainPath');
    const cardSelect = document.getElementById('cardSelect');

    // Reset all sections to hidden first
    cardSection.style.display = 'none';
    rollSection.style.display = 'none';
    charPath.style.display = 'none';
    terrainPath.style.display = 'none';

    if (!type) {
        console.log("No type selected");
        return;
    }

    console.log("Selected Type:", type);

    // FILTERING LOGIC
    // We use [ "Encounter Type" ] in brackets to handle spaces
    const filteredCards = [...new Set(encounterData
        .filter(row => row["Encounter Type"] === type)
        .map(row => row["Encounter Card"])
    )].sort();

    console.log("Cards found:", filteredCards.length);

    if (filteredCards.length === 0) {
        alert("Warning: No cards found for type: " + type + ". Check your data.js column names!");
        return;
    }

    // Populate Card Dropdown
    cardSelect.innerHTML = '<option value="">-- Select Card --</option>';
    filteredCards.forEach(card => {
        let opt = document.createElement('option');
        opt.value = card;
        opt.innerText = card;
        cardSelect.appendChild(opt);
    });

    // Show the basic sections
    cardSection.style.display = 'block';
    rollSection.style.display = 'block';

    // Show specific path
    if (type === "Character") charPath.style.display = 'block';
    if (type === "Terrain") terrainPath.style.display = 'block';
}
