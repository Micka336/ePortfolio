const container = document.getElementById("waveform");
const barCount = 160;
const bars = [];
let globalOffset = 0;
let direction = 1;

// Création des barres
for (let i = 0; i < barCount; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    container.appendChild(bar);
    const baseHeight = 0.75*(80 + Math.random() * 60);
    bars.push({ el: bar, baseHeight });
}

// Animation fluide
function animateWaveform() {
    globalOffset += direction * 0.05;
    if (Math.random() < 0.01) direction *= -1;

    bars.forEach((barData, i) => {
        const slopeEffect = Math.sin((i / barCount) * Math.PI * 2 + globalOffset) * 40;
        const newHeight = barData.baseHeight + slopeEffect;
        barData.el.style.height = `${newHeight * 2}px`;
    });

    requestAnimationFrame(animateWaveform);
}
animateWaveform();

// Interaction au survol
bars.forEach((bar, index) => {
    bar.el.addEventListener("mouseenter", () => {
        bars.forEach((b, i) => {
            b.el.classList.toggle("active", i <= index);
        });
    });
});
container.addEventListener("mouseleave", () => {
    bars.forEach(b => b.el.classList.remove("active"));
});

// Points colorés liés aux popups HTML
const specialIndices = [0, 39, 79, 119, 159];
const colors = ["red", "orange", "green", "blue", "violet"];
const popupIds = ["popup1","popup2","popup3","popup4","popup5"];

specialIndices.forEach((index, i) => {
    if (bars[index]) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.style.background = colors[i % colors.length];
        bars[index].el.appendChild(dot);

    const popup = document.getElementById(popupIds[i]);

    // Ouvrir popup au clic
    dot.addEventListener("click", () => {
        popup.style.display = "flex";
    });

    // Fermer popup
    popup.querySelector(".close").addEventListener("click", () => {
        popup.style.display = "none";
    });
    popup.addEventListener("click", (e) => {
        if (e.target === popup) popup.style.display = "none";
    });
  }
});