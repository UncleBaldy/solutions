function solvePart1(input) {
	let map = input.split('\n');
	let R = map.length;
	let C = map[0].length;
	let startRow, startCol, nextPlots, reached;

	for (let r = 0; r < R; r++) {
		for (let c = 0; c < C; c++) {
			if (map[r][c] == 'S') {
				startRow = r;
				startCol = c;
			}
		}
	}

	let currentPlots = [[startRow, startCol]];

	function go(r, c) {
		if (r < 0 || r >= R || c < 0 || c >= C) return;
		if (map[r][c] == '#') return;
		if (`${r},${c}` in reached) return;
		nextPlots.push([r, c]);
		reached[`${r},${c}`] = true;
	}

	for (let step = 0; step < 64; step++) {
		nextPlots = [];
		reached = {};
		for (let [r, c] of currentPlots) {
			go(r-1, c);
			go(r+1, c);
			go(r, c-1);
			go(r, c+1);
		}
		currentPlots = nextPlots;
	}

	return currentPlots.length;
}

function solvePart2(input) {
	let goalSteps = 26501365;
	let map = input.split('\n');
	let R = map.length;
	let C = map[0].length;
	let startRow, startCol, nextPlots;

	for (let r = 0; r < R; r++) {
		for (let c = 0; c < C; c++) {
			if (map[r][c] == 'S') {
				startRow = r;
				startCol = c;
			}
		}
	}

	let fringePlots = [[startRow, startCol]];
	let reached = {};
	let totalReached = [1];

	reached[`${startRow},${startCol}`] = true;

	function go(r, c) {
		let key = r+','+c;
		if (key in reached) return;
		if (map[(r + 1000000 * R) % R][(c + 1000000 * C) % C] == '#') return;
		nextPlots.push([r, c]);
		reached[key] = true;
	}

	let step = 0;
	while (step < 1000) {
		step++;
		nextPlots = [];
		for (let [r, c] of fringePlots) {
			go(r-1, c);
			go(r+1, c);
			go(r, c-1);
			go(r, c+1);
		}
		totalReached.push(nextPlots.length + (totalReached[step - 2] || 0));
		fringePlots = nextPlots;
	}

	step -= R;
	while ((goalSteps - step) % R > 0) step--;
	let dt = [], ddt = [];
	for (let i = 0; i < R; i++) {
		step++;
		let diff = totalReached[step] - totalReached[step - 1];
		let prev = totalReached[step - R] - totalReached[step - R - 1];
		dt.push(diff);
		ddt.push(diff - prev);
	}

	let total = totalReached[step];
	while (step < goalSteps) {
		for (let i = 0; i < R; i++) {
			dt[i] += ddt[i];
			total += dt[i];
		}
		step += R;
	}
	return total;
}
