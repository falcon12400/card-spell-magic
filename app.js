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

function updatePreview() {
  const suit = SUITS[suitSelect.value];
  const rank = rankSelect.value;
  document.querySelector("#previewRank").textContent = rank;
  document.querySelector("#previewSuit").textContent = suit.symbol;
  document.querySelector("#previewCenterSuit").textContent = suit.symbol;
  const bottom = document.querySelector(".corner-bottom");
  bottom.querySelector("b").textContent = rank;
  bottom.querySelector("span").textContent = suit.symbol;
  document.querySelector("#chosenPreview").classList.toggle("red", suit.red);
}

function renderGuide() {
  const rankKey = rankSelect.value;
  const suitKey = suitSelect.value;
  const rank = RANKS[rankKey];
  const suit = SUITS[suitKey];
  const words = [rank.en, "of", suit.en];
  const total = words.reduce((sum, word) => sum + word.length, 0);

  document.querySelector("#resultRank").textContent = rankKey;
  document.querySelector("#resultSuit").textContent = suit.symbol;
  document.querySelector("#resultCard").classList.toggle("red", suit.red);
  document.querySelector("#guideTitle").innerHTML = `${rank.en} <i>of</i> ${suit.en}`;
  document.querySelector("#zhCardName").textContent = `${suit.zh} ${rank.zh}`;
  document.querySelector("#totalLetters").textContent = `共 ${total} 字母`;

  document.querySelector("#countGrid").innerHTML = words.map(word => `
    <div class="count-card">
      <strong>${word.toUpperCase()}</strong>
      <span>${word.length} 個字母</span>
    </div>
  `).join("");

  const stages = [
    { label: "牌面", word: rank.en },
    { label: "連接詞", word: "OF" },
    { label: "花色", word: suit.en },
    { label: "魔術字", word: "MAGIC", magic: true }
  ];

  document.querySelector("#timeline").innerHTML = stages.map((stage, index) => `
    <article class="timeline-item">
      <span class="timeline-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="timeline-content">
        <div class="timeline-title">
          <strong>${stage.word.toUpperCase()}</strong>
          <span class="deal-count">${stage.magic ? "<b>C</b><small>時翻牌</small>" : `<b>${stage.word.length}</b><small>張牌</small>`}</span>
        </div>
        <div class="letters">
          ${letters(stage.word).map((letter, letterIndex) => `
            <span class="letter"${stage.magic && letterIndex === 4 ? ' title="在 C 翻牌"' : ""}>${letter}</span>
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
