const generate = document.getElementById('number');
const generateButton = document.getElementById('generateButton');
const resetButton = document.getElementById('resetButton')
const displayedNumbers = new Set();
const draws = document.getElementById('draws')
const records = document.getElementById('results')


function generateNumber() {
  let count = 0;
  const maxCount = 75;

  const bingoRanges = {
    B: [1, 15],
    I: [16, 30],
    N: [31, 45],
    G: [46, 60],
    O: [61, 75]
  };

  for (count; count < maxCount; count++) {
    let number = Math.floor((Math.random() * 75) + 1);

    if (!displayedNumbers.has(number)) {
      displayedNumbers.add(number);

      let bingoColumn = '';
      if (number >= bingoRanges.B[0] && number <= bingoRanges.B[1]) bingoColumn = 'B';
      else if (number >= bingoRanges.I[0] && number <= bingoRanges.I[1]) bingoColumn = 'I';
      else if (number >= bingoRanges.N[0] && number <= bingoRanges.N[1]) bingoColumn = 'N';
      else if (number >= bingoRanges.G[0] && number <= bingoRanges.G[1]) bingoColumn = 'G';
      else if (number >= bingoRanges.O[0] && number <= bingoRanges.O[1]) bingoColumn = 'O';

      generate.textContent = `${bingoColumn} ${number}`;

      let p = document.createElement('p');
      p.id = 'draws';
      p.textContent = `${bingoColumn} ${number}`;
      records.appendChild(p);

      console.log(displayedNumbers);
      return;
    }
  }
}

generateButton.addEventListener('click', generateNumber);

function resetCount() {
  displayedNumbers.clear();
  records.innerHTML = ""
  generate.textContent = "00"; 
}

resetButton.addEventListener('click', resetCount);

document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init({
        disableScroll: false,
        disableFocus: false,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true,
        debugMode: true,
        onShow: modal => {
            // Focus the first focusable element in the modal
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
            console.log('Modal shown:', modal.id);
        },
        onClose: modal => {
            // Return focus to the trigger button
            const trigger = document.getElementById('winTrigger');
            if (trigger) {
                trigger.focus();
            }
            console.log('Modal closed:', modal.id);
        }
    });
});

// Function to show modal and display bingo card
function showWinModal() {
    try {
        // 1. Collect and group drawn numbers by BINGO columns
        const columns = [[], [], [], [], []]; // B, I, N, G, O
        displayedNumbers.forEach(num => {
            num = parseInt(num);
            if (num >= 1 && num <= 15) columns[0].push(num);
            else if (num >= 16 && num <= 30) columns[1].push(num);
            else if (num >= 31 && num <= 45) columns[2].push(num);
            else if (num >= 46 && num <= 60) columns[3].push(num);
            else if (num >= 61 && num <= 75) columns[4].push(num);
        });
        columns.forEach(col => col.sort((a,b)=>a-b));

        // 2. Build the bingo card table
        const bingoCardTable = document.getElementById('bingoCardTable').querySelector('tbody');
        bingoCardTable.innerHTML = '';
        // Find the max column length for rows
        const maxRows = Math.max(...columns.map(col => col.length), 5);
        for (let row = 0; row < maxRows; row++) {
            const tr = document.createElement('tr');
            for (let col = 0; col < 5; col++) {
                const td = document.createElement('td');
                td.className = 'winning-number';
                td.textContent = columns[col][row] !== undefined ? columns[col][row] : '';
                tr.appendChild(td);
            }
            bingoCardTable.appendChild(tr);
        }
        // Show the modal using MicroModal
        MicroModal.show('modal-1');
    } catch (error) {
        console.error('Modal error:', error);
        MicroModal.show('modal-1');
    }
}

// Winner button opens modal and shows bingo card
document.getElementById('winnerButton').addEventListener('click', showWinModal);

// X button closes modal
document.getElementById('closeModal').addEventListener('click', function() {
    MicroModal.close('modal-1');
});
