function isBirthdayToday() {
  const d = new Date();
  return d.getDate() === 17 && d.getMonth() === 11;
}

function createConfetti() {
  for (let i = 0; i < 30; i++) {
    const el = document.createElement("div");
    el.className = Math.random() > 0.5 ? "confetti" : "heart";
    el.textContent = el.className === "heart" ? "💖" : "🎉";
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = 3 + Math.random() * 2 + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
}

function getNextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  let birthday = new Date(year, 11, 17, 0, 0, 0);
  if (now > birthday) birthday.setFullYear(year + 1);
  return birthday.getTime();
}

let targetDate = getNextBirthday();

// ⏱️ TEK VE SAĞLAM INTERVAL
setInterval(() => {
  const now = new Date();
  const nowTime = now.getTime();

  // 🎉 17 Aralık
  if (isBirthdayToday()) {
    document.getElementById("countdown").style.display = "none";
    document.getElementById("birthdayMessage").style.display = "block";

    // 🔁 HER 2 SANİYEDE BİR KONFETİ
    createConfetti();
    return;
  }

  // ⏳ Geri sayım
  const distance = targetDate - nowTime;

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;
}, 2000); // ⬅️ BURASI KRİTİK: 2 SANİYE
