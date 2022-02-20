let user = 'O';
let cpu = 'X';
let currentPlayer = undefined;
let scoresIndex;
let board = [
    ['','',''],
    ['','',''],
    ['','','']
];
const whoWillPlayFirst = document.querySelector(".firstOne");
const choose = document.querySelector(".choose");
const card = document.querySelector(".card");
const tiles = document.querySelectorAll(".tile");
const won = document.querySelector(".won");
function firstOne(btn)
{
    if (btn.innerHTML == 'CPU')
    {
        currentPlayer = cpu;
    }else{
        currentPlayer = user;
    }
    whoWillPlayFirst.classList.remove("activate");
    card.classList.add("activate");
}

function choice(btn)
{
    user = btn.innerHTML;
    if (user == 'X')
    {
        cpu = 'O';
        scoresIndex = {
            X: -10,
            O: +10,
            TIE: 0
        }
    }else{
        cpu = 'X';
        scoresIndex = {
            X: +10,
            O: -10,
            TIE: 0
        }
    }
    
    choose.classList.remove('activate');
    whoWillPlayFirst.classList.add("activate");
}

for (let i = 0; i < board.length; i++)
{
    for (let j = 0; j < board[0].length; j++)
    {
        tiles[i * 3 + j].setAttribute("onclick", "triggerClick(this)");
        tiles[i * 3 + j].setAttribute("id", i+""+j);
    }
}

setInterval(()=>{
    if (currentPlayer == cpu)
    {
        playCPU();
    }
}, 1);

function triggerClick(tile)
{
    if (currentPlayer == user)
    {
        console.log("Pressed");
        if (user == 'O')
        {
            tile.classList.add("cpu");
        }
        tile.innerHTML = currentPlayer;
        tile.classList.add("disabled");
        board[(tile.id)[0]][(tile.id)[1]] = currentPlayer;
        let x = checkWinner();
        if (x == null)
        {
            currentPlayer = cpu;
        }else{
            if (x == "TIE")
            {
                displayWinner("TIE");
                currentPlayer = null;
            }else{
                displayWinner(x);
                currentPlayer = null;
                disableEveryTile();
            }
        }
    }else{
        console.log("Pressed");
        if (user != 'O')
        {
            tile.classList.add("cpu");
        }
        tile.innerHTML = currentPlayer;
        tile.classList.add("disabled");
        board[(tile.id)[0]][(tile.id)[1]] = currentPlayer;
        let x = checkWinner();
        if (x == null)
        {
            currentPlayer = user;
        }else{
            if (x == "TIE")
            {
                displayWinner("TIE");
                currentPlayer = null;
            }else{
                displayWinner(x);
                currentPlayer = null;
                disableEveryTile();
            }
        }
    }
}

// This function checks if the characters have same values and are not empty 
function matchChecker(a, b, c)
{
    return a == b && b == c && a != '';
}


// This function checks if someone has won the game
function checkWinner()
{
    let winner = null;
    // Horizontal
    for (let i = 0; i < 3; i++)
    {
        if (matchChecker(board[i][0], board[i][1], board[i][2]))
        {
            winner = board[i][0];
        }
    }
    // Vertical
    for (let i = 0; i < 3; i++)
    {
        if (matchChecker(board[0][i], board[1][i], board[2][i]))
        {
            winner = board[0][i];
        }
    }
    // Diagonal
    if (matchChecker(board[0][0], board[1][1], board[2][2]))
    {
        winner = board[0][0];
    }
    if (matchChecker(board[0][2], board[1][1], board[2][0]))
    {
        winner = board[0][2];
    }
    // Checking if there are any empty spots left on the board 
    let emptySpots = 0;
    for (let i = 0; i < board.length; i++)
    {
        for (let j = 0; j < board[0].length; j++)
        {
            if (board[i][j] == '')
            {
                emptySpots++;
            }
        }
    }

    if (winner == null && emptySpots == 0)
    {
        return 'TIE';
    }
    if (winner != null)
    {
        return winner;
    }else{
        return null;
    }
}

function displayWinner(winner)
{
    card.classList.remove("activate");
    const wonTitle = document.querySelector(".won-title");
    if (winner == cpu)
    {
        wonTitle.innerHTML = "CPU wins!";
    }else{
        if (winner == 'TIE')
        {
            wonTitle.innerHTML = "IT'S A TIE!";
        }else{
            wonTitle.innerHTML = "You win!";
        }
    }
    won.classList.add("activate");
}

function disableEveryTile()
{
    for (let i = 0; i < board.length; i++)
    {
        for (let j = 0; j < board[0].length; j++)
        {
            if (!(tiles[i * 3 + j].classList.contains("disabled")))
            {
                tiles[i * 3 + j].classList.add("disabled");
            }
        }
    }
}


function reset()
{
    window.location.reload();
}

function myGithub()
{
    window.open("https://github.com/iamankitdwivedi", "_blank");
}