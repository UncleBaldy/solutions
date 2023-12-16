function slideNorth(grid, r, c) {
	while (r > 0 && grid[r-1][c] == '.') {
		grid[r-1][c] = 'O';
		grid[r][c] = '.';
		r--;
	}
}

function slideSouth(grid, r, c) {
	while (r+1 < grid.length && grid[r+1][c] == '.') {
		grid[r+1][c] = 'O';
		grid[r][c] = '.';
		r++;
	}
}

function slideWest(grid, r, c) {
	while (c > 0 && grid[r][c-1] == '.') {
		grid[r][c-1] = 'O';
		grid[r][c] = '.';
		c--;
	}
}

function slideEast(grid, r, c) {
	while (c+1 < grid[0].length && grid[r][c+1] == '.') {
		grid[r][c+1] = 'O';
		grid[r][c] = '.';
		c++;
	}
}

function solvePart1(input) {
	let lines = input.split('\n');
	let grid = lines.map(row => [...row]);
	let R = grid.length;
	let C = grid[0].length;

	for (let c = 0; c < C; c++) {
		for (let r = 0; r < R; r++) {
			if (grid[r][c] == 'O') {
				slideNorth(grid, r, c);
			}
		}
	}

	let load = 0;
	for (let r = 0; r < R; r++) {
		for (let c = 0; c < C; c++) {
			if (grid[r][c] == 'O') load += R - r;
		}
	}

	return load;
}

function spinCycle(grid, R, C) {
	for (let c = 0; c < C; c++) {
		for (let r = 0; r < R; r++) {
			if (grid[r][c] == 'O') {
				slideNorth(grid, r, c);
			}
		}
	}
	for (let r = 0; r < R; r++) {
		for (let c = 0; c < C; c++) {
			if (grid[r][c] == 'O') {
				slideWest(grid, r, c);
			}
		}
	}
	for (let c = 0; c < C; c++) {
		for (let r = R-1; r >= 0; r--) {
			if (grid[r][c] == 'O') {
				slideSouth(grid, r, c);
			}
		}
	}
	for (let r = 0; r < R; r++) {
		for (let c = C-1; c >= 0; c--) {
			if (grid[r][c] == 'O') {
				slideEast(grid, r, c);
			}
		}
	}
}

function solvePart2(input) {
	let lines = input.split('\n');
	let grid = lines.map(row => [...row]);
	let R = grid.length;
	let C = grid[0].length;
	let seen = {};
	let seq = [];
	let cycleLength = 1;
	let i = 0;

	while (seq.length < cycleLength) {
		spinCycle(grid, R, C);
		i++;
		let key = grid.map(row => row.join('')).join(',');
		if (key in seen) {
			if (cycleLength == 1) {
				cycleLength = i - seen[key];
			}
			seq.push(key);
		}
		seen[key] = i;
	}

	let j = 1000000000 - i - 1;
	grid = seq[j % seq.length].split(',');

	let load = 0;
	for (let r = 0; r < R; r++) {
		for (let c = 0; c < C; c++) {
			if (grid[r][c] == 'O') load += R - r;
		}
	}

	return load;
}
