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