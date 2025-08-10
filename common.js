const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const center = width / 2;

const color_data = [
  "#fedf30",
  "#fdb441",
  "#fd6930",
  "#eb5454",
  "#bf9dd3",
  "#29b8cd",
  "#00f2a6",
  "#f67",
];
const label_data = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
];
const slices = color_data.length;
const sliceDeg = 360 / slices;

let deg = Math.random() * 360;
let speed = 10;
let animation;
let isSpinning = false;
let lock = false;
let slowDownRand = 0;

function deg2rad(deg) {
  return (deg * Math.PI) / 180;
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function drawWheel(currentDeg) {
  ctx.clearRect(0, 0, width, width);
  let tempDeg = currentDeg;

  for (let i = 0; i < slices; i++) {
    ctx.beginPath();
    ctx.fillStyle = color_data[i];
    ctx.moveTo(center, center);
    ctx.arc(
      center,
      center,
      center,
      deg2rad(tempDeg),
      deg2rad(tempDeg + sliceDeg)
    );
    ctx.lineTo(center, center);
    ctx.fill();

    const drawText_deg = tempDeg + sliceDeg / 2;
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(deg2rad(drawText_deg));
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText(label_data[i], 100, 5);
    ctx.restore();

    tempDeg += sliceDeg;
  }
}

function spin() {
  deg += speed;
  deg %= 360;

  if (!lock && isSpinning) {
    animation = requestAnimationFrame(spin);
    drawWheel(deg);
    return;
  }

  // Decelerate
  if (lock) {
    if (speed > 0.2) {
      speed *= slowDownRand;
    } else {
      cancelAnimationFrame(animation);
      isSpinning = false;
      speed = 10;
      lock = false;
      showResult();
      return;
    }
    deg += speed;
    deg %= 360;
    animation = requestAnimationFrame(spin);
    drawWheel(deg);
  }
}

function startSpin() {
  isSpinning = true;
  lock = false;
  slowDownRand = rand(0.985, 0.992);
  speed = 10;
  deg = Math.random() * 360;
  drawWheel(deg);
  spin();

  // Stop after 3 seconds
  setTimeout(() => {
    lock = true;
  }, 3000);
}

function showResult() {
  const ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg);
  const index = (slices + ai) % slices;
  const winner = label_data[index];

  document.getElementById(
    "modalBodyText"
  ).innerHTML = `<p class="text-center">It's <strong>${winner}</strong>'s turn! 🎯</p>`;
  $("#resultModal").modal("show");
}

// Draw initial wheel
drawWheel(deg);
function showResult() {
  const ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg);
  const index = (slices + ai) % slices;
  const winner = label_data[index];

  document.getElementById("modalBodyText").innerHTML = `
    <p class="text-center" style="color: purple;">Энэ удаа <strong>${winner}</strong> тоглоорой! 🎯</p>`;
  document.getElementById("resultModal").style.display = "flex";
}

function hideModal() {
  document.getElementById("resultModal").style.display = "none";
}
