const RANKS = {
  A: { en: "Ace", zh: "A" },
  2: { en: "Two", zh: "2" },
  3: { en: "Three", zh: "3" },
  4: { en: "Four", zh: "4" },
  5: { en: "Five", zh: "5" },
  6: { en: "Six", zh: "6" },
  7: { en: "Seven", zh: "7" },
  8: { en: "Eight", zh: "8" },
  9: { en: "Nine", zh: "9" },
  10: { en: "Ten", zh: "10" },
  J: { en: "Jack", zh: "J" },
  Q: { en: "Queen", zh: "Q" },
  K: { en: "King", zh: "K" }
};

const SUITS = {
  spades: { en: "Spades", zh: "黑桃", symbol: "♠", red: false },
  hearts: { en: "Hearts", zh: "紅心", symbol: "♥", red: true },
  diamonds: { en: "Diamonds", zh: "方塊", symbol: "♦", red: true },
  clubs: { en: "Clubs", zh: "梅花", symbol: "♣", red: false }
};

const rankSelect = document.querySelector("#rankSelect");
const suitSelect = document.querySelector("#suitSelect");
const setupScreen = document.querySelector("#setupScreen");
const guideScreen = document.querySelector("#guideScreen");

function letters(word) {
  return [...word.toUpperCase()];
}

function cardAsset(rank, suitKey) {
  const suitCode = { clubs: "C", diamonds: "D", hearts: "H", spades: "S" }[suitKey];
  return `assets/cards/${rank}${suitCode}.svg`;
}

function updatePreview() {
  const suit = SUITS[suitSelect.value];
  const rank = rankSelect.value;
  const image = document.querySelector("#previewCardImage");
  image.src = cardAsset(rank, suitSelect.value);
  image.alt = `${suit.zh} ${rank}`;
}

function renderGuide() {
  const rankKey = rankSelect.value;
  const suitKey = suitSelect.value;
  const rank = RANKS[rankKey];
  const suit = SUITS[suitKey];
  const words = [rank.en, "of", suit.en];
  const total = words.reduce((sum, word) => sum + word.length, 0);

  const resultImage = document.querySelector("#resultCardImage");
  resultImage.src = cardAsset(rankKey, suitKey);
  resultImage.alt = `${suit.zh} ${rank.zh}`;
  document.querySelector("#guideTitle").innerHTML = `${rank.en} <i>of</i> ${suit.en}`;
  document.querySelector("#zhCardName").textContent = `${suit.zh} ${rank.zh}`;
  document.querySelector("#totalLetters").textContent = `共 ${total} 字母`;

  document.querySelector("#countGrid").innerHTML = words.map((word, index) => `
    <div class="count-card${index === 2 ? ` suit-count-card${suit.red ? " red" : ""}` : ""}">
      ${index === 2 ? `<span class="count-suit-watermark" aria-hidden="true">${suit.symbol}</span>` : ""}
      <strong>${word.toUpperCase()}</strong>
      <small>${word.length} 個字母</small>
    </div>
  `).join("");

  const stages = [
    { label: "牌面", word: rank.en },
    { label: "連接詞", word: "OF" },
    { label: "花色", word: suit.en }
  ];

  document.querySelector("#timeline").innerHTML = stages.map((stage, index) => `
    <article class="timeline-item">
      <span class="timeline-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="timeline-content">
        <div class="timeline-title">
          <strong>${stage.word.toUpperCase()}</strong>
          <span class="deal-count"><b>${stage.word.length}</b><small>張牌</small></span>
        </div>
        <div class="letters">
          ${letters(stage.word).map((letter, letterIndex) => `
            <span class="letter">${letter}</span>
          `).join("")}
        </div>
      </div>
    </article>
  `).join("");

  setupScreen.classList.remove("active");
  guideScreen.classList.add("active");
  document.querySelector("#stepPill").textContent = "教學";
  document.title = `${rank.en} of ${suit.en}｜Spellbound`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSetup() {
  guideScreen.classList.remove("active");
  setupScreen.classList.add("active");
  document.querySelector("#stepPill").textContent = "選牌";
  document.title = "Spellbound｜撲克牌魔術拼字助手";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

rankSelect.addEventListener("change", updatePreview);
suitSelect.addEventListener("change", updatePreview);
document.querySelector("#cardForm").addEventListener("submit", event => {
  event.preventDefault();
  renderGuide();
});
document.querySelector("#backButton").addEventListener("click", showSetup);
document.querySelector("#restartButton").addEventListener("click", showSetup);
document.querySelector("#brandHome").addEventListener("click", showSetup);

updatePreview();
