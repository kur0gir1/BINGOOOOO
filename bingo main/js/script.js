const table = document.querySelector("#tblBingo");
const letter = document.querySelectorAll(".letters-bingo");
const win = document.querySelector(".youWin");

const winningPositions = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
];

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

        const allMarked = Array.from(cell).every(el =>
            el.classList.contains("strikeout")
        );

        if (matchWin()) {
            if (winningCondition < 4) {
                letter[winningCondition].classList.add("show-bingo");
                winningCondition++;
            }
        }

        if (allMarked) {
            // Show the final "O"
            if (winningCondition === 4) {
                letter[4].classList.add("show-bingo");
                winningCondition++;
            }

            // Show win text
            win.textContent = "🎉 BLACKOUT BINGO! YOU WIN! 🎉".repeat(5);
        }
    });
})


function matchWin() {
    const cell = document.querySelectorAll(".main-table-cell");

    // First check for blackout (all 25 are strikeout)
    const allMarked = Array.from(cell).every(e =>
        e.classList.contains("strikeout")
    );

    if (allMarked) {
        return true; // Final win condition
    }

    // If we already reached 4 patterns, don't process more
    if (winningCondition >= 4) return false;

    // Check for pattern-based wins (row/col/diagonal)
    return winningPositions.some((combination, i) => {
        const isWin = combination.every(index =>
            cell[index].classList.contains("strikeout")
        );

        if (isWin) {
            winningPositions.splice(i, 1); // prevent reusing the same pattern
            return true;
        }

        return false;
    });
}


console.log(arr)