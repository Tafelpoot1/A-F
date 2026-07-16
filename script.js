
const wedding = new Date("2027-09-18T15:00:00+02:00");

function updateCountdown(){
  const d = Math.max(0, wedding - new Date());
  days.textContent = Math.floor(d / 86400000);
  hours.textContent = Math.floor(d / 3600000) % 24;
  minutes.textContent = Math.floor(d / 60000) % 60;
  seconds.textContent = Math.floor(d / 1000) % 60;
}
updateCountdown();
setInterval(updateCountdown, 1000);

addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", scrollY > 60);
  const h = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (h ? scrollY / h * 100 : 0) + "%";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

menuBtn.onclick = () => navLinks.classList.toggle("open");
navLinks.querySelectorAll("a").forEach(a => a.onclick = () => navLinks.classList.remove("open"));

heroVideo.addEventListener("canplay", () => heroVideo.classList.add("ready"));
heroVideo.addEventListener("error", () => heroVideo.remove());

let playing = false;
soundButton.onclick = async () => {
  try{
    if(!playing){
      await ambientAudio.play();
      playing = true;
      soundButton.setAttribute("aria-pressed","true");
      soundText.textContent = "Pauzeer sfeer";
      soundIcon.textContent = "❚❚";
    } else {
      ambientAudio.pause();
      playing = false;
      soundButton.setAttribute("aria-pressed","false");
      soundText.textContent = "Speel sfeer";
      soundIcon.textContent = "♫";
    }
  }catch(err){
    soundText.textContent = "Tik opnieuw";
  }
};

rsvpForm.addEventListener("submit", e => {
  e.preventDefault();
  const subject = encodeURIComponent(`RSVP trouwweekend - ${name.value}`);
  const body = encodeURIComponent(
`Naam/namen: ${name.value}
E-mailadres: ${email.value}
Aanwezig: ${attendance.value}
Dieetwensen of opmerkingen: ${message.value || "-"}`
  );
  location.href = `mailto:fbcdevree@gmail.com,ambervanderhorst@hotmail.com?subject=${subject}&body=${body}`;
});
