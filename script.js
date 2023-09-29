// initially we can observe that 
/*
----->all the cells of the tictaktoe grid is empty and 
----->the current player at starting is set to x
-----> new game button is empty

    so as some are initally set , why don't we create one function that initializes the game , let us call that function as init_game()
*/ 


/* 

 1. At first we would want to know who is the current player ( X or O)  -----> so we would want to create one variable to get know who is the current player
 2. We can see that on the grid the game is being played -----> so we have to create a variable for the grid ( to know the current status of the game , all cells are filled or not , i,e. at what stage we are in the game , should chances be provided for other player to continue the game or has the current player has won the game )
 3. By considering at some specific positions only we would say that the player has win , so what are those positions that we treat as wining positions we make list of all those 
 4. Call the init function() and set the default properties that we want to preseve at the starting of the game 

*/


const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // at starting we can observe that new game button is invsible and it is made visible only when the game ends
    newGameBtn.classList.remove("active");


    // hamne yaha pe tho declare kardiya ki pehle current player X hai , lekin usko UI pe tho reflect karna padtha haina
    gameInfo.innerText = `Current Player - ${currentPlayer}`;


            // We can obseve that all the boxes are empty at the beginning , and when we click on the boxes X or O will get placed accrodingly , this gets done only with the help of eventListners
           
          // UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
}


// inorder to reflect the changes onto the screen we call the initlaizing function
initGame();


// we can note that on clicking the boxes , we are able to place X or O respectively . For this to happen we should add event listner to each div element of the grid
boxes.forEach((box, index) => {                                // this function is to add an event listner to each of the div elements of the grid
    box.addEventListener("click", () => {                      // for each of the box we iterate over it i.e, using box variable we get hold of each of box and add an event listner for ----> on clicking that iteration under box , we must call the handle click event() fuction
        handleClick(index);                                    // handle click event() function makes use of index of the sent box in the boxes array so it must also be sent while calling the handle clickevent() function
    })                                                         // inorder to get know which box is selected out of the total 9 boxes , we must get hold of it's index 
});                                             // NOTE : whenever we make use of an arrow function , by using index variable we can get hold of the index as the arrow function itself generates the index values
                                                               // we could also have made use of event.target , but with this we would not be able to find the exact class of the box that has been clicked



// It is also important to note that after clicking once we should make the clicked box as unclickable
function handleClick(index) {
    if(gameGrid[index] === "" ) {                  // this if condition basically provides us the unclickable feature
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";      //with this code we make the cursor to non-pointer just after placing some value onto the boxes of the grid
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;                                    // when we get any winner we must update " Current Player " div to " Winner is player - , and make the new game button visible "
        newGameBtn.classList.add("active");
        return;
    }




    // i thought no need to again check for tie , directly we could execute tie code( because , already the control has checked the above code and reached here , and why it has reached here because the above conditions are not satisfied ) , but it is not possible because at every point giving the input we call the gameOver() function and we should check for tie condition only when all the boxes of the grid are completely filled

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";                                          // agian we need not check if all the elements inside the grid are same or not , because we have reached here because we had checked above 
        newGameBtn.classList.add("active"); 
    }

}



function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener("click", initGame);