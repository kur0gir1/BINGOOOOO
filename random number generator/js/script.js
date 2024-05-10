const generate = document.getElementById('number');
const generateButton = document.getElementById('generateButton');
const resetButton = document.getElementById('resetButton')
const displayedNumbers = new Set();
const draws = document.getElementById('draws')
const records = document.getElementById('results')

function generateNumber() {
  let count = 0; 
  const maxCount = 75;

  for (count; count < maxCount; count++) {
    let number = Math.floor((Math.random() * 75) + 1);
    if (!displayedNumbers.has(number)) {
      displayedNumbers.add(number);
      generate.textContent = number;

      let p = document.createElement('p');
      p.id = 'draws';
      p.textContent = number;
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