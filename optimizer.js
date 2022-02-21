// ======================================================================
// ======================================================================
// ==============THIS IS THE BRAIN STRUCTURE OF AI=======================
// ======================================================================
// ======================================================================

// THIS CODE IMPLEMENTS THE MINIMAX ALGORITHM WITH ALPHA-BETA PRUNING...

// The below function makes a move on behalf of the CPU
function playCPU()
{
    // If it's the first turn of CPU then set it's symbol at any place at random.
    if (moves == 0)
    {
        let random = Math.floor((Math.random() * 9));
        let tile = document.getElementById(Math.floor(random/3) + "" + random%3);
        triggerClick(tile);
    }else{
        // Applying the minimax algorithm to make a move...
        let maxEval = -Infinity;
        let optimalMove;
        for (let i = 0; i < board.length; i++)
        {
            for (let j = 0; j < board[0].length; j++)
            {
                if (board [i][j] == '')
                {
                    board [i][j] = cpu;
                    let score = minimax(board, 0, -Infinity, +Infinity, false);
                    board [i][j] = '';
                    if (score > maxEval)
                    {
                        maxEval = score;
                        optimalMove = {i, j};
                    }
                }
            }
        }
        
        try {
            let tile = document.getElementById(optimalMove.i + "" + optimalMove.j);
            triggerClick(tile);
        } catch (e) {
            console.log("End")
        }
    }
}

function minimax(board, depth, alpha, beta, maximizingPlayer)
{
    let result = checkWinner();
    if (result != null)
    {
        let score = scoresIndex[result];
        return score;
    }
    if (maximizingPlayer)
    {
        let maxEval = -Infinity;
        for (let i = 0; i < board.length; i++)
        {
            for (let j = 0; j < board[0].length; j++)
            {
                if (board [i][j] == '')
                {
                    board [i][j] = cpu;
                    let score = minimax(board, depth + 1, alpha, beta, false);
                    board [i][j] = '';
                    maxEval = Math.max(score, maxEval);
                    alpha = Math.max(score, alpha);
                    if (beta <= alpha)
                    {
                        break;
                    }
                }
            }
        }
        return maxEval;
    }else{
        let minEval = Infinity;
        for (let i = 0; i < board.length; i++)
        {
            for (let j = 0; j < board[0].length; j++)
            {
                if (board [i][j] == '')
                {
                    board [i][j] = user;
                    let score = minimax(board, depth + 1, alpha, beta, true);
                    board [i][j] = '';
                    minEval = Math.min(score, minEval);
                    beta = Math.min(beta, score);
                    if (beta <= alpha)
                    {
                        break;
                    }
                }
            }
        }
        return minEval;
    }
}


// █▀▀ █▀█ █▀▀ ▄▀█ ▀█▀ █ █▀█ █▄░█   █▄▄ █▄█   ▄▀█ █▄░█ █▄▀ █ ▀█▀   █▀▄ █░█░█ █ █░█ █▀▀ █▀▄ █
// █▄▄ █▀▄ ██▄ █▀█ ░█░ █ █▄█ █░▀█   █▄█ ░█░   █▀█ █░▀█ █░█ █ ░█░   █▄▀ ▀▄▀▄▀ █ ▀▄▀ ██▄ █▄▀ █