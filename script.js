const grid = document.getElementById('crew-grid');
const statusText = document.getElementById('status-text');
const resetBtn = document.getElementById('reset-btn');

let impostorIndex = -1;
let gameOver = false;

// ئایکۆنەکانی یاریزانەکان
const crewIcons = ['👨‍🚀', '👩‍🚀', '🧑‍🚀', '👽', '🤖', '👾', '👻', '🐙', '🦊'];

function startGame() {
  gameOver = false;
  grid.innerHTML = '';
  statusText.innerText = 'کلیک لەسەر ئەو کەسە بکە کە پێت وایە خەیاڵییە!';
  statusText.style.color = '#aaa';

  // دیاریکردنی خەیاڵی بە شێوەیەکی هەڵکێش
  impostorIndex = Math.floor(Math.random() * 6);

  // دروستکردنی ٦ کارت
  for (let i = 0; i < 6; i++) {
    const card = document.createElement('div');
    card.classList.add('crew-card');
    
    // هەموو کەسەکان وەک یەک دەبن، تەنها یەکێکیان جیاوازە (بەڵام نیشانە نادرێت)
    card.innerText = crewIcons[0]; 

    card.addEventListener('click', () => {
      if (gameOver) return;

      if (i === impostorIndex) {
        // دۆزرایەوە!
        card.classList.add('impostor-found');
        card.innerText = '🔪'; // نیشانەی خەیاڵی
        statusText.innerText = '🎉 تۆ خەیاڵییەکەت دۆزییەوە! براوەیت!';
        statusText.style.color = '#3DDC84';
        gameOver = true;
        disableAllCards();
      } else {
        // هەڵە
        card.classList.add('disabled');
        card.innerText = '❌';
        statusText.innerText = '❌ ئەمە خەیاڵی نەبوو! دووبارە هەوڵبدەرەوە.';
        statusText.style.color = '#ff4d4d';
      }
    });

    grid.appendChild(card);
  }
}

function disableAllCards() {
  const cards = document.querySelectorAll('.crew-card');
  cards.forEach(card => card.classList.add('disabled'));
}

resetBtn.addEventListener('click', startGame);

// دەستپێکردنی یاری بە خۆکاری
startGame();
