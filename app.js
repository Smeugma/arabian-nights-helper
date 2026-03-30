function updateType() { 
    const type = document.getElementById('typeSelect').value;
    const cardSection = document.getElementById('cardSection');
    const rollSection = document.getElementById('rollSection');
    const charPath = document.getElementById('charPath');
    const terrainPath = document.getElementById('terrainPath');
    const cardSelect = document.getElementById('cardSelect');

    // Reset visibility
    [cardSection, rollSection, charPath, terrainPath].forEach(el => el.classList.add('hidden'));
    document.getElementById('results-area').classList.add('hidden');

    if (!type) return;

    // Filter cards based on Type
    const filteredCards = [...new Set(encounterData
        .filter(row => row["Encounter Type"] === type)
        .map(row => row["Encounter Card"])
    )].sort();

    // Populate Card Dropdown
    cardSelect.innerHTML = '<option value="">-- Select Card --</option>';
    filteredCards.forEach(card => {
        let opt = document.createElement('option');
        opt.value = card;
        opt.innerText = card;
        cardSelect.appendChild(opt);
    });

    cardSection.classList.remove('hidden');
    rollSection.classList.remove('hidden');

    // Show specific path
    if (type === "Character") charPath.classList.remove('hidden');
    if (type === "Terrain") terrainPath.classList.remove('hidden');
}

function processEncounter() {
    const type = document.getElementById('typeSelect').value;
    const card = document.getElementById('cardSelect').value;
    const roll = parseInt(document.getElementById('rollInput').value);
    
    let matches = encounterData.filter(row => 
        row["Encounter Type"] === type && 
        row["Encounter Card"] === card &&
        parseInt(row["Modified Roll"]) === roll
    );

    // Apply specific logic for Character/Terrain
    if (type === "Character") {
        const time = document.getElementById('timeOfDay').value;
        matches = matches.filter(row => row["Time of Day"] === time);
    } else if (type === "Terrain") {
        const terrain = document.getElementById('terrainKey').value;
        matches = matches.filter(row => row["Terrain Key"] === terrain);
    }

    if (matches.length > 0) {
        const resultArea = document.getElementById('results-area');
        const nameDiv = document.getElementById('realEncounterName');
        const btnContainer = document.getElementById('reactionButtons');
        
        resultArea.classList.remove('hidden');
        document.getElementById('finalParagraph').classList.add('hidden');
        btnContainer.innerHTML = '';

        // Real Encounter Logic
        let realName = matches[0]["Text"];
        if (type === "Character") realName += " " + matches[0]["Encounter Card"];
        nameDiv.innerText = realName;

        // Show reactions
        matches.forEach(m => {
            const btn = document.createElement('button');
            btn.className = 'reaction-btn';
            btn.innerText = m["Encounter Reaction Choices"];
            btn.onclick = () => {
                document.getElementById('finalParagraph').classList.remove('hidden');
                document.getElementById('paraValue').innerText = m["Paragraph"];
            };
            btnContainer.appendChild(btn);
        });
    } else {
        alert("No match found for this combination!");
    }
}
