function getNextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  let birthday = new Date(year, 11, 17, 0, 0, 0);

  if (now > birthday) {
    birthday = new Date(year + 1, 11, 17, 0, 0, 0);
  }

  return birthday.getTime();
}

let targetDate = getNextBirthday();
let confettiInterval = null;

const countdown = setInterval(() => {
  const nowDate = new Date();
  const now = nowDate.getTime();

  const isBirthday =
    nowDate.getDate() === 17 &&
    nowDate.getMonth() === 11;

  // 🎉 17 Aralık GÜNÜ
  if (isBirthday) {
    document.getElementById("countdown").style.display = "none";
    document.getElementById("birthdayMessage").style.display = "block";

    // Konfeti sadece 1 kere interval olarak başlasın
    if (!confettiInterval) {
      confettiInterval = setInterval(() => {
        for (let i = 0; i < 40; i++) {
          const el = document.createElement("div");
          el.className = Math.random() > 0.5 ? "confetti" : "heart";
          el.textContent = el.className === "heart" ? "💖" : "🎉";
          el.style.left = Math.random() * 100 + "vw";
          el.style.animationDuration = 3 + Math.random() * 2 + "s";
          document.body.appendChild(el);
          setTimeout(() => el.remove(), 5000);
        }
      }, 2000); // 🔁 her 4 saniyede bir
    }

    return;
  }

  // ⏳ Normal geri sayım
  const distance = targetDate - now;

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;

  // 🎆 18 Aralık olduysa reset
  if (nowDate.getDate() === 18 && nowDate.getMonth() === 11) {
    targetDate = getNextBirthday();
    document.getElementById("birthdayMessage").style.display = "none";
    document.getElementById("countdown").style.display = "block";

    if (confettiInterval) {
      clearInterval(confettiInterval);
      confettiInterval = null;
    }
  }
}, 1000);
