const minPlayers = 2; 

const maxPlayers = 20; 

function handleNumberOfPlayers()
{
    let inputElement = document.getElementById("amountPlayers");
    let inputValue = inputElement.value.trim();
    const numberOfPlayers = Number(inputValue);
    if(!validateNumberOfPlayers(numberOfPlayers)) return; 

    generatePlayerNameInput(numberOfPlayers);
}

function validateNumberOfPlayers(number)
{
    if (number === 0 || number === "") 
    {
        alert("Value entered is empty");
        return false;
    }

    if (isNaN(number)) 
    {
        alert("Number entered is not a number");
        return false;
    }

    if (!Number.isInteger(number) || number < minPlayers) 
    {
        alert(`Please enter a whole number greater than or equal to ${minPlayers}`);
        return false;
    }

    if (number > maxPlayers) 
    {
        alert(`Please enter a number less than or equal to ${maxPlayers}`);
        return false;
    }

    if (number % 2 === 1) 
    {
        alert("Please enter an even number");
        return false;
    }

    return true;
}

function generatePlayerNameInput(numberOfPlayers)
{
    const container = document.getElementById("playerInputs");

    container.innerHTML = "";

    for(let i = 1; i <= numberOfPlayers; i++)
    {
        const label = document.createElement('label');
        const input = document.createElement('input'); 
        const br = document.createElement('br');

        input.id = `Player${i}`;
        input.className = "playerNames";
        input.type = "text";
        input.placeholder = `Enter Player ${i} Name`;

        label.setAttribute("for", input.id);
        label.textContent = `Player ${i}`;

        container.appendChild(label); 
        container.appendChild(input);
        container.appendChild(br);
    }

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Player Names";
    submitButton.onclick = () => handleSubmitPlayerNames(container);
    container.appendChild(submitButton);
}

function handleSubmitPlayerNames(container) 
{
    const inputs = container.getElementsByClassName("playerNames");

    if(!validatePlayerNames(inputs)) return; 

    const playerList = collectPlayerNames(inputs);
    displayPlayerNames(playerList);

    const randomizedList = randomizePlayerDraftOrder([...playerList]);
    displayRandomizedOrder(randomizedList);
}

function validatePlayerNames(inputs)
{
    let validPattern = /^[A-Za-z\s]+$/;
    const seenNames = new Set();


    for(let i = 0; i < inputs.length; i++)
    {
        let currentName = inputs[i].value.trim(); 
        if(currentName === "")
        {
            alert("Player names cannot be empty");
            return false; 
        }
        
        if(!validPattern.test(currentName))
        {
            alert(`"${currentName}" contains invalid characters`);
            return false; 
        }
        
        if(seenNames.has(currentName.toLowerCase()))
        {
            alert(`Duplicate name found: ${currentName}`);
            return false; 
        }

        seenNames.add(currentName.toLowerCase());
    }

    return true; 
}


function collectPlayerNames(inputs)
{
    return Array.from(inputs).map(input => input.value.trim());
}


function displayPlayerNames(playerList)
{
    let displayNamesContainer = document.getElementById("draftOrder");
    displayNamesContainer.innerHTML = "";
    playerList.forEach((name, index) => 
    {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${name}`;
        displayNamesContainer.appendChild(li);
    }); 
}

//Fisher-Yates-Shuffle
function randomizePlayerDraftOrder(playerList)
{
    for(let i = playerList.length - 1; i > 0; i--)
    {
        const indexJ = Math.floor((Math.random() * (i + 1)));
        
        [playerList[i], playerList[indexJ]] = [playerList[indexJ], playerList[i]]; 
    }

    return playerList; 
}


function displayRandomizedOrder(playerList)
{
    const randomizedDisplayContainer = document.getElementById("draftOrderRandomized");

    randomizedDisplayContainer.innerHTML = "";

    playerList.forEach((name, index) =>
    {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${name}`;
        randomizedDisplayContainer.appendChild(li);
    });
}