
import { useEffect, useState } from 'react'
import './Puzzle.css'
import BG_Image from "../src/assets/BG_Image.jpg"

export default function Puzzle() {
  const [move, setMove] = useState(0)
  function shuffle() {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15]
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * 16);
      let u = array[i]
      array[i] = array[j]
      array[j] = u
    }
    return array;
  }
  function setting_move() {
    setMove(0);
  }


  const [arr, setarr] = useState(shuffle())
  const [checkTrigger, setCheckTrigger] = useState(false)
  let win = false;

  function status() {
    if (win === true) {
      let maindiv = document.getElementById("maindiv");
      maindiv.remove();
      let newdiv = document.createElement("div");
      newdiv.style.position = "absolute"; // Positioning it absolutely within the page
      newdiv.style.top = "50%"; // Center vertically
      newdiv.style.left = "50%"; // Center horizontally
      newdiv.style.transform = "translate(-50%, -50%)"; // Offset for centering
      newdiv.style.textAlign = "center"; // Center the text
      newdiv.innerHTML = `
        <h2>You won the Game</h2>
      `;
  
      let refreshButton = document.createElement("button");
      refreshButton.textContent = "Play again";
      refreshButton.style.marginTop = "20px";
      refreshButton.addEventListener("click", function () {
        window.location.reload();
      });
  
      newdiv.appendChild(refreshButton);
  
      // Add CSS animation
      newdiv.style.animation = "move 2s alternate infinite";
  
      document.body.appendChild(newdiv);
    }
  }

  function mapped(array) {
    const hashmap = {}
    for (let i = 0; i < array.length; i++) {
      hashmap[`${i}`] = array[i]
    }
    return hashmap
  }

  const hashmap = mapped(arr)

  function findKey(value) {
    for (const key in arr) {
      if (arr[key] == value) {
        return key;
      }
    }
  }
  function swap(a, b) {
    let newArr = [...arr];
    let chan = newArr[a];
    newArr[a] = newArr[b];
    newArr[b] = chan;
    setarr(newArr);
  }

  const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
  useEffect(() => {
    if (checkTrigger) {
      let flag = 0;
      for (let i = 0; i < 16; i++) {
        if (result[i] != arr[i]) {
          flag = 1;
          break;
        }
      }

      if (flag == 0) win = true;
      status();
      setCheckTrigger(false)
    }

  }, [arr, checkTrigger])

  function check(e) {

    let x = e.target.textContent
    let f = parseInt(findKey(x))


    if ([3, 7, 11, 15].includes(f) && (arr[f - 1] == 0 || arr[f + 4] == 0 || arr[f - 4] == 0)) {
      setMove(move + 1);
      if (arr[f - 1] == 0) swap(f - 1, f);
      else if (arr[f + 4] == 0) swap(f + 4, f);
      else if (arr[f - 4] == 0) swap(f - 4, f);
    }

    else if ([0, 4, 8, 12].includes(f) && (arr[f + 1] == 0 || arr[f + 4] == 0 || arr[f - 4] == 0)) {
      setMove(move + 1);
      if (arr[f + 1] == 0) swap(f + 1, f);
      else if (arr[f + 4] == 0) swap(f + 4, f);
      else if (arr[f - 4] == 0) swap(f - 4, f);
    }

    else if (arr[f + 1] == 0 || arr[f + 4] == 0 || arr[f - 1] == 0 || arr[f - 4] == 0) {
      setMove(move + 1);
      if (arr[f + 1] == 0) swap(f + 1, f);
      else if (arr[f - 1] == 0) swap(f - 1, f);
      else if (arr[f + 4] == 0) swap(f + 4, f);
      else if (arr[f - 4] == 0) swap(f - 4, f);
    }
    else {
      console.log("Invalid move")
    }
    
    setCheckTrigger(true)

  }


  return (
    <>
      <div id="maindiv">
        <h1>Puzzle</h1>
        <div className="container">

          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[0]) ? "#a52a2a" : 1 == arr[0] ? "green" : "white", color: (true && !arr[0]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[0]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[1]) ? "#a52a2a" : 2 == arr[1] ? "green" : "white", color: (true && !arr[1]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[1]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[2]) ? "#a52a2a" : 3 == arr[2] ? "green" : "white", color: (true && !arr[2]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[2]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[3]) ? "#a52a2a" : 4 == arr[3] ? "green" : "white", color: (true && !arr[3]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[3]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[4]) ? "#a52a2a" : 5 == arr[4] ? "green" : "white", color: (true && !arr[4]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[4]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[5]) ? "#a52a2a" : 6 == arr[5] ? "green" : "white", color: (true && !arr[5]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[5]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[6]) ? "#a52a2a" : 7 == arr[6] ? "green" : "white", color: (true && !arr[6]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[6]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[7]) ? "#a52a2a" : 8 == arr[7] ? "green" : "white", color: (true && !arr[7]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[7]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[8]) ? "#a52a2a" : 9 == arr[8] ? "green" : "white", color: (true && !arr[8]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[8]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[9]) ? "#a52a2a" : 10 == arr[9] ? "green" : "white", color: (true && !arr[9]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[9]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[10]) ? "#a52a2a" : 11 == arr[10] ? "green" : "white", color: (true && !arr[10]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[10]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[11]) ? "#a52a2a" : 12 == arr[11] ? "green" : "white", color: (true && !arr[11]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[11]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[12]) ? "#a52a2a" : 13 == arr[12] ? "green" : "white", color: (true && !arr[12]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[12]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[13]) ? "#a52a2a" : 14 == arr[13] ? "green" : "white", color: (true && !arr[13]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[13]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[14]) ? "#a52a2a" : 15 == arr[14] ? "green" : "white", color: (true && !arr[14]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[14]}</span></div>
          <div onClick={check} className="cell" style={{ backgroundColor: (true && !arr[15]) ? "#a52a2a" : "white", color: (true && !arr[15]) ? "#a52a2a" : "black" }}><span onClick={check} >{arr[15]}</span></div>
        </div>
        <div><h3>Move: {move}</h3></div>
        <button onClick={() => (setarr(shuffle()), setting_move())} >New Game</button>
      </div>


    </>
  )
}
