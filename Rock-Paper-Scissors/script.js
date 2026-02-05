
    
    let result = "";
    let com = "";
    let score = {
        win : 0,
        lose : 0,
        tie : 0,
    };

  
    const storedScore = JSON.parse(localStorage.getItem("score"));
    if (storedScore) {
    score = storedScore;        //score doesn't change untill user press the reset score button even page refreshes
    updateUI();
    }


    
    function for_reset()
    {
        score.lose = 0;
        score.tie = 0;
        score.win = 0;

        updateUI();
        localStorage.setItem("score",JSON.stringify(score));
        display_content.innerHTML = ""

    }
    
    function gusses()
    {
        
        const num = Math.floor(Math.random() * 3) + 1;
    if(num === 1)
    {
        com = "Rock";
    }else if(num === 2)
    {
        com = "Paper";
    }else if(num === 3)
    {
        com = "Scissors";
    }
    return com;
    }

   
    function forRock()
    {
        com = gusses();
       
        if(com == "Rock")
    {
        result = "Tie";
        score.tie++;
    }else if(com == "Paper")
    {
        result = "You Lose";
        score.lose++;
    }else if(com == "Scissors")
    {
        result = "You Win";
        score.win++;
    }
    updateUI()
    localStorage.setItem("score", JSON.stringify(score));


    for_display("Rock");
    }

    function forPaper()
    {
        com = gusses();
        if(com == "Rock")
    {
        result = "You Win";
        score.win++;
    }else if(com == "Paper")
    {
        result = "Tie";
        score.tie++;
    }else if(com == "Scissors")
    {
        result = "You Lose";
        score.lose++;
    }
    updateUI();
    localStorage.setItem("score", JSON.stringify(score));

    for_display("Paper");
    }

    function forScissors()
    {
        com = gusses();
        if(com == "Rock")
    {
        result = "You Lose";
        score.lose++;
    }else if(com == "Paper")
    {
        result = "You Win";
        score.win++;
    }else if(com == "Scissors")
    {
        result = "Tie";
        score.tie++;
    }
    updateUI();
    localStorage.setItem("score", JSON.stringify(score));

    for_display("Scissors");

    }
    
    function updateUI() 
    {
        document.getElementById("1").textContent = score.win;
        document.getElementById("2").textContent = score.lose;
        document.getElementById("3").textContent = score.tie;
    }
    
    let display_content = document.querySelector(".display")
    function for_display(userChoice)
    {
     
        display_content.innerHTML = `
  <div class="line line-1">You Choice ${userChoice}.</div>
  <div class="line line-2">Computer Choice is ${com}.</div>
  <div class="line line-3">So, ${result}</div>
`;

        const resultLine = display_content.querySelector(".line-3");

        if (result === "You Win") {
        resultLine.style.color = "#1f7a3f";
        } else if (result === "You Lose") {
        resultLine.style.color = "#a83232";
        } else {
        resultLine.style.color = "#6b5b95";
        }
   }
    localStorage.setItem("score",JSON.stringify(score));