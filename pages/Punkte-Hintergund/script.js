


// Full-page grid settings
const cols = 40;
const rows = 22;
const dotsBg = document.querySelector('.dots-bg');
const dots = [];

// Generate dots for the full page
for (let r = 0; r < rows; r++) {
	for (let c = 0; c < cols; c++) {
		const dot = document.createElement('div');
		dot.className = 'dot';
		dot.dataset.row = r;
		dot.dataset.col = c;
		dotsBg.appendChild(dot);
		dots.push({el: dot, row: r, col: c});
	}
}

// Listen for mousemove and update dots
document.addEventListener('mousemove', (e) => {
	const rect = dotsBg.getBoundingClientRect();
	const mouseX = e.clientX - rect.left;
	const mouseY = e.clientY - rect.top;
	const gridW = rect.width;
	const gridH = rect.height;
	const cellW = gridW / cols;
	const cellH = gridH / rows;
	const radius = 80; // px

	dots.forEach(({el, row, col}) => {
		const cx = (col + 0.5) * cellW;
		const cy = (row + 0.5) * cellH;
		const dist = Math.hypot(cx - mouseX, cy - mouseY);
		if (dist < radius) {
			const scale = 1.5 + 1.2 * (1 - dist / radius);
			el.style.transform = `scale(${scale})`;
			// Interpolate blue color: #2196f3 (33,150,243) to #bbdefb (187,222,251)
			const t = dist / radius;
			const r = Math.round(33 + (187 - 33) * t);
			const g = Math.round(150 + (222 - 150) * t);
			const b = Math.round(243 + (251 - 243) * t);
			el.style.background = `rgb(${r},${g},${b})`;
			el.style.zIndex = 10;
		} else {
			el.style.transform = '';
			el.style.background = '';
			el.style.zIndex = '';
		}
	});
});

// On mouse leave, reset all dots
dotsBg.addEventListener('mouseleave', () => {
	dots.forEach(({el}) => {
		el.style.transform = '';
		el.style.background = '';
		el.style.zIndex = '';
	});
});
