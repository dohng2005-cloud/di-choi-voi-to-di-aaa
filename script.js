const invitation = {
  title: "cậu ơi,<br>tối nay đi chơi<br>với tớ nha? 🥺",
  subtitle: "Không cần đi đâu xa đâu,<br>chỉ cần cậu đi cùng tớ là được.",
  time: "20h45",
  location: "Chỗ nào cậu thích nhất!",
  planShort: "Ăn tối · dạo phố · tám chuyện"
};

const $ = (s) => document.querySelector(s);
const screens = [...document.querySelectorAll(".screen")];

$("#invite-title").innerHTML = invitation.title;
$("#invite-subtitle").innerHTML = invitation.subtitle;
$("#time").textContent = invitation.time;
$("#location").textContent = invitation.location;
$("#plan-short").textContent = invitation.planShort;
$("#yayTime").textContent = invitation.time;
$("#planTime").textContent = invitation.time;
$("#finalTime").textContent = invitation.time;

function showScreen(id){
  screens.forEach(s => s.classList.remove("active"));
  const next = $(id);
  next.classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

function toast(message, ms=2600){
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(()=>el.classList.remove("show"),ms);
}

const reactions = [
  "Ừm... cậu cứ suy nghĩ nha 😌",
  "Ơ kìa, cậu định trốn à? 👀",
  "Ê ê... nút này biết chạy đó nha 😂",
  "Thôi nào, tối nay ăn ngon rồi xem phim nhé? 🍜🍿"
];
let maybeCount = 0;
let maybeConverted = false;

function moveMaybeButton(){
  const btn = $("#maybeBtn");
  const x = (Math.random() * 150 - 75).toFixed(0);
  const y = (Math.random() * 90 - 45).toFixed(0);
  const r = (Math.random() * 8 - 4).toFixed(1);
  btn.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
}

$("#maybeBtn").addEventListener("click", () => {
  // Sau khi đổi thành lời rủ mới, lần bấm tiếp theo sẽ chuyển sang kế hoạch ăn tối + xem phim.
  if (maybeConverted) {
    $("#plan-short").textContent = "Ăn tối · xem phim · tám chuyện";
    $("#screen-yay .lead").textContent = "Vậy là tối nay ăn tối rồi xem phim nhé 🍜🍿";
    $("#screen-yay .plan-card").innerHTML = `
      <div class="card-label">🌙 KẾ HOẠCH TỐI NAY</div>
      <div class="plan-item"><span>🕘</span><span><b id="planTime">${invitation.time}</b><small>Gặp nhau</small></span></div>
      <div class="plan-item"><span>🍜</span><span><b>Ăn tối cùng nhau</b><small>Chọn món ngon rồi ăn thật no 😋</small></span></div>
      <div class="plan-item"><span>🎬</span><span><b>Xem một bộ phim</b><small>Ngồi cạnh nhau và chill một chút 🍿</small></span></div>
      <div class="plan-item"><span>💬</span><span><b>Tám chuyện linh tinh</b></span></div>
      <div class="plan-item"><span>❤️</span><span><b>Về nhà vui hơn lúc đi</b></span></div>
      <p class="note">Không cần lịch trình phức tạp.<br>Tối nay cứ ăn ngon và xem phim cùng nhau là được 😌</p>
    `;
    $("#planTime").textContent = invitation.time;
    confetti();
    heartBurst(18);
    showScreen("#screen-yay");
    return;
  }

  const msg = reactions[Math.min(maybeCount, reactions.length - 1)];
  $("#reaction").textContent = msg;
  maybeCount++;

  if (maybeCount <= 3) {
    moveMaybeButton();
    toast(maybeCount === 1 ? "Nút này hình như hơi nhát 😳" : "Bắt được tớ rồi thì đừng bấm nữa nha 😂");
  }

  if (maybeCount === 3) {
    maybeConverted = true;
    const btn = $("#maybeBtn");
    btn.textContent = "Ăn tối & xem phim 🍿";
    btn.classList.add("maybe-converted");
    btn.style.transform = "none";
    $("#reaction").textContent = "Thôi không chạy nữa... ăn tối rồi xem phim với tớ nhé? 🥺🍿";
    toast("Nút đã đầu hàng rồi 😌🍜🍿", 3000);
  }
});

function heartBurst(count=12){
  const wrap = $("#hearts");
  for(let i=0;i<count;i++){
    const h = document.createElement("span");
    h.className = "heart-float";
    h.textContent = ["❤️","💕","💗","✨"][Math.floor(Math.random()*4)];
    h.style.left = (20 + Math.random()*60) + "%";
    h.style.bottom = (20 + Math.random()*12) + "%";
    h.style.setProperty("--drift", ((Math.random()-.5)*120) + "px");
    h.style.animationDelay = (Math.random()*.35) + "s";
    wrap.appendChild(h);
    setTimeout(()=>h.remove(),2300);
  }
}

function confetti(){
  const wrap = $("#confetti");
  for(let i=0;i<45;i++){
    const p = document.createElement("span");
    p.className = "confetti-piece";
    p.style.left = Math.random()*100 + "vw";
    p.style.setProperty("--x", ((Math.random()-.5)*180) + "px");
    p.style.animationDelay = Math.random()*.35 + "s";
    p.style.transform = `rotate(${Math.random()*180}deg)`;
    p.style.background = ["#db4057","#ffb36f","#fff1d0","#7770a8","#f4d0df"][Math.floor(Math.random()*5)];
    wrap.appendChild(p);
    setTimeout(()=>p.remove(),2300);
  }
}

$("#yesBtn").addEventListener("click", () => {
  confetti();
  heartBurst(18);
  showScreen("#screen-yay");
});

$("#toFoodBtn").addEventListener("click", () => showScreen("#screen-food"));

let selectedFood = "";
document.querySelectorAll(".food-chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".food-chip").forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedFood = btn.dataset.food;
    $("#chosen").textContent = `Chốt ${selectedFood} nhé 😌`;
    $("#finishBtn").classList.remove("hidden");
  });
});

$("#finishBtn").addEventListener("click", () => {
  $("#finalFood").textContent = `Tối nay mình ăn ${selectedFood.toLowerCase()}.`;
  showScreen("#screen-final");
  heartBurst(10);
});

$("#doneBtn").addEventListener("click", () => {
  $("#doneBtn").classList.add("hidden");
  $("#ps").classList.remove("hidden");
  heartBurst(16);
  toast("Hẹn gặp cậu tối nay 🌙❤️", 3200);
});

$("#sun").addEventListener("click", () => {
  toast("À, cậu phát hiện ra rồi 😌");
  setTimeout(()=>toast("Thưởng cho cậu một trái tim ❤️",2300),900);
  heartBurst(1);
});

// Background sparkles
const sparkles = $("#sparkles");
for(let i=0;i<24;i++){
  const s = document.createElement("span");
  s.className = "sparkle";
  s.style.left = Math.random()*100 + "%";
  s.style.top = Math.random()*100 + "%";
  s.style.animationDelay = (Math.random()*3) + "s";
  s.style.opacity = Math.random()*.6;
  sparkles.appendChild(s);
}
