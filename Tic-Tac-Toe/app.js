let buttons = document.querySelectorAll(".btn");
let popup_text = document.getElementById("popup_text");
let playerX = true;

// let game_mode ;
double_player = () => {
    buttons.forEach((button,idx) => {
        button.addEventListener("click", ()=>{
    if(playerX){
        button.innerHTML="X";
        playerX = false;
    }else{
        button.innerHTML = "O";
        playerX = true;
    }
    button.disabled = true;
    isWin();
});
});
}

let computer_turn = false;
single_player = () => {
    buttons.forEach((button,idx) =>{
        button.addEventListener("click",() =>{
            if(!computer_turn){
                button.innerHTML = "X";
                button.disabled = true;
                let move = computer_move();
                if(move !== -1)
                {
                    buttons[move].innerHTML = "O";
                    buttons[move].disabled = true;
                }
                isWin();
                if(popup_text.innerHTML ===  "PlayerO wins!"){
                    popup_text.innerHTML =  "Computer wins!";
                }
            }
        });       
    });
}

computer_move = () =>{

    let available = [];
    let random_idx;
    buttons.forEach((button,idx) =>{
        if(!button.disabled){
            available.push(idx);
        }
    });

        if(available.length === 0) return -1;

        random_idx= Math.floor(Math.random() * available.length);
    return available[random_idx];
}


const winning_patterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let isWin = () => {
    for(let pattern of winning_patterns)
    {
        let pos1 = buttons[pattern[0]].innerHTML;
        let pos2 = buttons[pattern[1]].innerHTML;
        let pos3 = buttons[pattern[2]].innerHTML;

        if( pos1 !== "" &&
            pos1 === pos2 &&
            pos2 === pos3
        )
        {
            popup_text.innerHTML =  "Player" + pos1 +" wins!";
            document.getElementById("popup").style.display = "flex";

            buttons.forEach(button =>{
                button.disabled = true;
            });
            return true;
        }

    }
        if(game_over()){
             popup_text.innerHTML =  "Game Teid!";
            document.getElementById("popup").style.display = "flex";
        }
    return false
}

game_over = () => {
    let full = 0;
    buttons.forEach(button => {
        if(button.innerHTML !== "")
        {
            full++;
        }
        
    });
    return full === 9;
}

close_popup = () => {
    document.getElementById("popup").style.display = "none";
    buttons.forEach(button => {
        button.innerHTML = "";
        button.disabled = false;
    });
}
// for double player 
document.querySelector(".double").addEventListener("click", () => {
    double_player();
    document.querySelector(".plays").style.display = "none"
});

// for single player
document.querySelector(".single").addEventListener("click", () => {
    
    single_player();
    document.querySelector(".plays").style.display = "none"
});
