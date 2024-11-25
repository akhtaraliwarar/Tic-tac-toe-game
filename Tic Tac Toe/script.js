
  let boxes = document.querySelectorAll(".box");
  let resetbtn = document.querySelector("#reset-btn");
  let newbtn = document.querySelector("#new-btn");
  let msgcontainer = document.querySelector(".msg-container");
  let msg = document.querySelector("#msg");

  let turnO = true;

  const winpatterns = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
  ];

  const resetgame = () => {
      turnO = true;
      enableboxes();
      msgcontainer.classList.add("hide");
      msg.innerText = "";  
  };

  const disableboxes = () => {
      for (let box of boxes) {
         box.style.pointerEvents = "none";  
       
   
      }
  };

  const enableboxes = () => {
      for (let box of boxes) {
         box.style.pointerEvents = "auto";  
          box.innerText = "";
      }
  };

  const showwinner = (winner) => {
      msg.innerText = `Congratulations, Winner is ${winner}`;
      msgcontainer.classList.remove("hide");
      disableboxes();
  };

  const checkTie = () => {
      if ([...boxes].every(box => box.innerText !== "")) {
          msg.innerText = "It's a tie!";
          msgcontainer.classList.remove("hide");
          disableboxes();
      }
  };

  const checkwinner = () => {
      for (let pattern of winpatterns) {
          let pos1Val = boxes[pattern[0]].innerText;
          let pos2Val = boxes[pattern[1]].innerText;
          let pos3Val = boxes[pattern[2]].innerText;

          if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
              if (pos1Val === pos2Val && pos2Val === pos3Val) {
                  showwinner(pos1Val);
                  return;

              }
          }
      }
      checkTie();
  };

  boxes.forEach((box) => {
      box.addEventListener("click", () => {
          if (box.innerText !== "") return;  

          if (turnO) {
              box.innerText = "O";
              turnO = false;
          } else {
              box.innerText = "X";
              turnO = true;
          }

          box.style.pointerEvents = "none";  
          checkwinner();
      });
  });

  newbtn.addEventListener("click", resetgame);  
  resetbtn.addEventListener("click", resetgame);

