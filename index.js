let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
//set variables: player message, restart button, and the gameboard grid

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
//set up variables for my Xs and Os
let currentPlayer = X_TEXT
//starts game off with Xs turn
let spaces = Array(9).fill(null)
//9 spaces (the array) to be filled in with the X and Os, and fill means it wont get overwritten so only one player can claim the space.


const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}
//arrow function used so when the game starts it loops over this and adds an event listener to each box. the event is the click
//which then runs the function called boxClicked.

function boxClicked(e) {
    const id = e.target.id
    //function called boxclicked created, and passed parameter. e is what is being passed which is the entire dom element of the box.
    //basically saying target its id in the html and save that id inside of this variable in order to check
    //if spaces in array are filled or doesnt contain this id.

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
//if index is equal to null then it hasnt been fillled with an id so we can continue
//if null then fill that space at current index of id with current player so its no longer null.
//in other words if its array 1, make array 1 equal either x or 0. 
        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
//variable w an array of the winning combinations. 

function playerHasWon() { //doesnt take parameter
    for (const condition of winningCombos) {
        let [a, b, c] = condition
//this function checks if current player has won by looping over the winning combo 
//by checking the condition. the aray
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}
// if statement condition within the condition that checks if the spaces in this array are equal to spaces a, b, and c.
//so x or o must be equal to the array spaces in position a, b, and c.

restartBtn.addEventListener('click', restart)
//event listener to run function called restart which clears array 
function restart() {
    spaces.fill(null)
    //tells function to clear array and make it null again

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })
    //this highlights the box for the when the winning combination is identified

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

startGame()