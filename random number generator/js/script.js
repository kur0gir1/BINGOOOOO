const generate = document.getElementById('number');
const generateButton = document.getElementById('generateButton');
const resetButton = document.getElementById('resetButton')
const displayedNumbers = new Set();

function generateNumber() {
  let count = 0; 
  const maxCount = 75;

  for (count; count < maxCount; count++) {
    let number = Math.floor((Math.random() * 75) + 1);
    if (!displayedNumbers.has(number)) {
      displayedNumbers.add(number);
      generate.textContent = number;

      console.log(displayedNumbers)
      return; 
    }
  }
}

generateButton.addEventListener('click', generateNumber);

function resetCount() {
  displayedNumbers.clear();
  generate.textContent = "00"; 
}

generateButton.addEventListener('click', generateNumber);
resetButton.addEventListener('click', resetCount);