
let list = JSON.parse(localStorage.getItem("todos")) || [];
display();


function todo_input()
{
    let submitted_value = document.querySelector(".todo_input").value.trim();
    let submitted_date = document.querySelector(".todo_date").value;
    
    if (submitted_value === "" || submitted_date === "") return;

    list.push({   
        name :submitted_value,
        date : submitted_date,
    });

    localStorage.setItem("todos", JSON.stringify(list));
  
    console.log(list);
    todo_submit_btn();
    display();
}


function todo_submit_btn()
{
     document.querySelector(".todo_input").value = "";

     document.querySelector(".todo_date").value = "";
    
}

function display()
{
    let content = document.querySelector(".for_display");
    content.innerHTML = "";

     for (let i = 0; i < list.length; i++) {
        content.innerHTML += `
<div class="box">
    <p>${list[i].name}</p>
    <p>${list[i].date}</p>
    <p>
        <button class="for_delete"
        onclick="list.splice(${i},1); display()">Delete</button>
    </p>
</div>`;

    }
    
}