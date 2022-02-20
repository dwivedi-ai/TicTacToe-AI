
function playCPU()
{
    let maxEval = -Infinity;
    let optimalMove;
    for (let i = 0; i < board.length; i++)
    {
        for (let j = 0; j < board[0].length; j++)
        {
            if (board [i][j] == '')
            {
                board [i][j] = cpu;
                let score = minimax(board, 0, false);
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

function minimax(board, depth, maximizingPlayer)
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
                    let score = minimax(board, depth + 1, false);
                    board [i][j] = '';
                    maxEval = Math.max(score, maxEval);
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
                    let score = minimax(board, depth + 1, true);
                    board [i][j] = '';
                    minEval = Math.min(score, minEval);
                }
            }
        }
        return minEval;
    }
}