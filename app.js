// Fill the search suggestions based on your data 
const cardList = document.getElementById('cardList');
const uniqueCards = [...new Set(encounterData.map(item => item["Encounter Card"]))].sort();
uniqueCards.forEach(card => {
    let option = document.createElement('option');
    option.value = card;
    cardList.appendChild(option);
});

function lookupEncounter() {
    const cardSearch = document.getElementById('cardInput').value;
    const rollSearch = parseInt(document.getElementById('rollInput').value);
    
    // Filter data for the specific card and roll
    const matches = encounterData.filter(row => 
        row["Encounter Card"] === cardSearch && 
        parseInt(row["Modified Roll"]) === rollSearch
    );

    if (matches.length > 0) {
        document.getElementById('results-area').style.display = 'block';
        document.getElementById('encounterDesc').innerText = "Encounter: " + matches[0]["Text"];
        
        const btnContainer = document.getElementById('reactionButtons');
        btnContainer.innerHTML = ''; // Clear old buttons

        // Create a button for every reaction available for this encounter
        matches.forEach(match => {
            const btn = document.createElement('button');
            btn.innerText = match["Encounter Reaction Choices"];
            btn.style.marginTop = "5px";
            btn.style.background = "#4a1c51";
            btn.style.color = "white";
            btn.onclick = () => {
                document.getElementById('finalParagraph').style.display = 'block';
                document.getElementById('paraValue').innerText = match["Paragraph"];
            };
            btnContainer.appendChild(btn);
        });
    } else {
        alert("Encounter not found. Check your spelling or roll!");
    }
}
