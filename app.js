// Initializing all the variable and constants 
let user = 'O';
let cpu = 'X';
let currentPlayer = undefined;
// Creating our scoresIndex, in order to keep the CPU as the maximizing player.
let scoresIndex;
// Initializing our game board which will be used by the optimizer to find an optimal move
let board = [
    ['','',''],
    ['','',''],
    ['','','']
];
// Select our components from our HTML file.
const whoWillPlayFirst = document.querySelector(".firstOne");
const choose = document.querySelector(".choose");
const card = document.querySelector(".card");
const tiles = document.querySelectorAll(".tile");
const won = document.querySelector(".won");
// The "moves" variable will keep a track of how many moves that have been played. Though it is used only once just to make the CPU play Random at first turn.
let moves = 0;


// The below loop assigns a coordinate ID to every tile on the board
for (let i = 0; i < board.length; i++)
{
    for (let j = 0; j < board[0].length; j++)
    {
        tiles[i * 3 + j].setAttribute("onclick", "triggerClick(this)");
        tiles[i * 3 + j].setAttribute("id", i+""+j);
    }
}

// The below function keeps checking if it's CPU's turn or not. If yes, then it invokes the function for it's play.
setInterval(()=>{
    if (currentPlayer == cpu)
    {
        playCPU();
    }
}, 1);



// =============================================================
// =====================FUNCTIONS===============================
// =============================================================

// This function is invoked when the user chooses who will be the first one to make the move.
function firstOne(btn)
{
    if (btn.innerHTML == 'CPU')
    {
        currentPlayer = cpu;
    }else{
        currentPlayer = user;
    }
    // Changing the visuals
    whoWillPlayFirst.classList.remove("activate");
    card.classList.add("activate");
}

// This function is invoked when user chooses which symbol he/she wants to take.
// This function will reinitialize the symbol values of user and cpu, that were defined above at the beginning of the code.
function choice(btn)
{
    user = btn.innerHTML;
    // We assign the values accordingly using switchcase.
    switch (user) {
        case 'X':
            cpu = 'O';
            // If the user chooses X, then cpu will have O and then O will have to be a maximizer, so the Score index is set accordingly.
            scoresIndex = {
                X: -10,
                O: +10,
                TIE: 0
            }
            break;
        case 'O':
            cpu = 'X';
            // If the user chooses O, then cpu will have X and then X will have to be a maximizer, so the Score index is set accordingly.
            scoresIndex = {
                X: +10,
                O: -10,
                TIE: 0
            }
            break;
        default:
            // Incase something goes wrong.
            console.log("Something went wrong");
            break;
    }
    // Changing the visuals.
    choose.classList.remove('activate');
    whoWillPlayFirst.classList.add("activate");
}

// The below function takes the tile object as parameter and accordingly sets the symbols on the tiles.
function triggerClick(tile)
{
    // If it's user's turn
    if (currentPlayer == user)
    {
        // We Increment the value of "moves".
        moves++;
        tile.innerHTML = currentPlayer;
        // We add a class "disabled" to our tile so that there are no further pointer events on that tile.
        tile.classList.add("disabled");
        board[(tile.id)[0]][(tile.id)[1]] = currentPlayer;
        // Checking if anyone has won or not.
        let x = checkWinner();
        if (x == null)
        {
            // If no one has won and it's not a tie either then continue the game
            currentPlayer = cpu;
        }else{
            if (x == "TIE")
            {
                // If it's a Tie, then print it and clear the currentPlayer value to avoid any mess.
                displayWinner("TIE");
                currentPlayer = null;
            }else{
                // If someone has won, then disable every tile and display the winner and clear the currentPlayer value.
                displayWinner(x);
                currentPlayer = null;
                disableEveryTile();
            }
        }
    }else{
        // If it's CPU's turn
        // We Increment the value of "moves".
        moves++;
        // We add a special class that differentiates user with the CPU as CPU's symbol colour will be Yellow.
        tile.classList.add("cpu");
        tile.innerHTML = currentPlayer;
        // We add a class "disabled" to our tile so that there are no further pointer events on that tile.
        tile.classList.add("disabled");
        board[(tile.id)[0]][(tile.id)[1]] = currentPlayer;
        // Checking if someone has won or not
        let x = checkWinner();
        if (x == null)
        {
            // If no one has won and it's not a tie either then continue the game
            currentPlayer = user;
        }else{
            if (x == "TIE")
            {
                // If it's a Tie, then print it and clear the currentPlayer value to avoid any mess.
                displayWinner("TIE");
                currentPlayer = null;
            }else{
                // If someone has won, then disable every tile and display the winner and clear the currentPlayer value.
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
    // Initialize the winner as null which will indicate that no one has won.
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

// The below function, takes a winner parameter and displays the winner.
function displayWinner(winner)
{
    // Changing visuals
    card.classList.remove("activate");
    const wonTitle = document.querySelector(".won-title");
    // Manipulating text according to who has won the game
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
    // Changing visuals
    won.classList.add("activate");
}

// The below function makes ever tile unclickable.
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

// The below function resets the page in case the user want a replay
function reset()
{
    window.location.reload();
}

// The below function redirect to my Github account on a new tab.
function myGithub()
{
    window.open("https://github.com/iamankitdwivedi", "_blank");
}


// █▀▀ █▀█ █▀▀ ▄▀█ ▀█▀ █ █▀█ █▄░█   █▄▄ █▄█   ▄▀█ █▄░█ █▄▀ █ ▀█▀   █▀▄ █░█░█ █ █░█ █▀▀ █▀▄ █
// █▄▄ █▀▄ ██▄ █▀█ ░█░ █ █▄█ █░▀█   █▄█ ░█░   █▀█ █░▀█ █░█ █ ░█░   █▄▀ ▀▄▀▄▀ █ ▀▄▀ ██▄ █▄▀ █