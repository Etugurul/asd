function getNextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  const birthday = new Date(`Dec 17, ${year} 00:00:00`);

  // Eğer bugünün tarihi 17 Aralık’tan sonra ise → gelecek yılın doğum günü
  if (now > birthday) {
    birthday.setFullYear(year + 1);
  }

  return birthday.getTime();
}

let targetDate = getNextBirthday();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;

  // 🎂 Eğer 17 Aralık günü geldiyse:
  if (distance <= 0 && now < targetDate + 24 * 60 * 60 * 1000) {
    document.getElementById("countdown").style.display = "none";
    const msg = document.getElementById("birthdayMessage");
    msg.style.display = "block";

    // Kalpler ve konfetiler yağsın 🎉💖
    for (let i = 0; i < 100; i++) {
      const el = document.createElement("div");
      el.className = Math.random() > 0.5 ? "confetti" : "heart";
      el.textContent = el.className === "heart" ? "💖" : "🎉";
      el.style.left = Math.random() * 100 + "vw";
      el.style.animationDuration = 3 + Math.random() * 2 + "s";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }
  }

  // 🎆 Eğer 18 Aralık olduysa, geri sayımı yeniden başlat
  if (now > targetDate + 24 * 60 * 60 * 1000) {
    targetDate = getNextBirthday(); // bir sonraki yılı ayarla
    document.getElementById("birthdayMessage").style.display = "none";
    document.getElementById("countdown").style.display = "block";
  }
}, 1000);
