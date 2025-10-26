let numberOfplayers = 0; 

const min = 0; 

const max = 20; 

let playerList = []; 

function getUserInput()
{
    let inputElement = document.getElementById("amountPlayers");
    let inputValue = inputElement.value.trim();
    numberOfplayers = Number(inputValue);
    console.log(numberOfplayers);
}

function validate()
{
    
    let inputElement = document.getElementById("amountPlayers");
    let inputValue = inputElement.value.trim();
    numberOfplayers = Number(inputValue);
  
    if(inputValue === "")
    {
        alert("value entered is empty");
    }
    else if(isNaN(numberOfplayers))
    {
        alert("Number entered is not a number");
    }
    else if(!(Number.isInteger(numberOfplayers)))
    {
        alert("Please enter a whole number that is not negative");
    }
    else if(numberOfplayers <= min || numberOfplayers > max)
    {
        alert(`Please enter a number between ${min} and ${max}`)
    }
    else if(numberOfplayers % 2 === 1)
    {
        alert("Please enter an even number");
    }
    else
    {
        console.log(numberOfplayers);
    }
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
    }
}

generatePlayerNameInput(12);

function submitPlayerNames()
{
    const isValid = validatePlayerNames(); 

    if(!isValid)
    {
        return; 
    }
    
    collectPlayerNames();
    
    displayPlayerNames();

    randomizePlayerDraftOrder();

    displayRandomizedOrder();
}

function validatePlayerNames()
{
    const getNames = document.getElementsByClassName("playerNames");
    let validPattern = /^[A-Za-z\s]+$/;
    const seenNames = new Set();


    for(let i = 0; i < getNames.length; i++)
    {
        let currentName = getNames[i].value.trim(); 
        if(currentName === "")
        {
            alert("value entered is empty");
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


function collectPlayerNames()
{
    let playNames = document.getElementsByClassName("playerNames");

    playerList = []; 

    for(let i = 0; i < playNames.length; i++)
    {
        playerList.push(playNames[i].value); 
    }

    return playerList; 
}


function displayPlayerNames()
{
    let displayNamesContainer = document.getElementById("draftOrder");

    displayNamesContainer.innerHTML = "";

    for(let i = 0; i < playerList.length; i++)
    {
        let playerUnorderedName = document.createElement("li");
        playerUnorderedName.textContent = `${i + 1}. ${playerList[i]}`;

        displayNamesContainer.append(playerUnorderedName);
    }

}

//Fisher-Yates-Shuffle
function randomizePlayerDraftOrder()
{
    for(let i = playerList.length - 1; i > 0; i--)
    {
        let indexJ = Math.floor((Math.random() * (i + 1)));
        
        [playerList[i], playerList[indexJ]] = [playerList[indexJ], playerList[i]]; 
    }
}


function displayRandomizedOrder()
{
    let randomizedDisplayContainer = document.getElementById("draftOrderRandomized");

    randomizedDisplayContainer.innerHTML = "";

    for(let i = 0; i < playerList.length; i++)
    {
        let playerRandomizedName = document.createElement("li");
        playerRandomizedName.textContent = `${i + 1}. ${playerList[i]}`;

        randomizedDisplayContainer.append(playerRandomizedName);        
    }
}