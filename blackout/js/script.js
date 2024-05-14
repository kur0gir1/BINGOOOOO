const table = document.querySelector("#tblBingo");
const letter = document.querySelectorAll(".letters-bingo");
const win = document.querySelector(".youWin");

let arr = [];

for (let i = 0; i < 5; i++) {
    const columnNumbers = [];
    const min = i * 15 + 1; 
    const max = (i + 1) * 15; 
    const columnRange = Array.from({ length: 15 }, (_, index) => min + index);
    columnNumbers.push(...columnRange);
    shuffle(columnNumbers); 
    arr.push(columnNumbers);
}

arr = transpose(arr);

shuffle(arr);

fillTable();

function shuffle(arr) {
    let currentIndex = arr.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
}

function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

function fillTable() {
    for (let i = 0; i < 5; i++) {
        const tr = document.createElement("tr");
        table.appendChild(tr);
        for (let j = 0; j < 5; j++) {
            const td = document.createElement("td");
            td.id = arr[i][j].toString();
            td.style.height = "20%";
            td.style.width = "20%";
            td.classList.add("main-table-cell");
            const div = document.createElement("div");
            div.classList.add("cell-format");
            div.textContent = arr[i][j].toString();
            td.appendChild(div);
            tr.appendChild(td);
        }
    }
}

const cell = document.querySelectorAll(".main-table-cell");
let winningCondition = 0;
cell.forEach(e => {
    e.addEventListener("click", () => {
        e.classList.toggle("strikeout");

        if (matchWin()) {
            letter[winningCondition].classList.add("show-bingo");

            winningCondition++;
            if (winningCondition === 1) {
                win.style.display= "block"
                win.textContent = "CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!! CONGRATULATIONS !!! YOU WIN !!!";  
            }
        }
    })
})

function matchWin() {
    const cell = document.querySelectorAll(".main-table-cell");
    return Array.from(cell).every(td => td.classList.contains("strikeout"));
}

console.log(arr);
