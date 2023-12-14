function reflectsVertically(grid, col, R, C) {
	for (let row of grid) {
		for (let i = 0; col - i >= 0 && col+i+1 < C; i++) {
			if (row[col-i] != row[col+i+1]) return false;
		}
	}
	return true;
}

function reflectsHorizontally(grid, row, R, C) {
	for (let c = 0; c < C; c++) {
		for (let i = 0; row - i >= 0 && row+i+1 < R; i++) {
			if (grid[row-i][c] != grid[row+i+1][c]) return false;
		}
	}
	return true;
}

function findVerticalReflection(grid, R, C) {
	for (let c = 0; c+1 < C; c++) {
		if (reflectsVertically(grid, c, R, C)) return c + 1;
	}
	return 0;
}

function findHorizontalReflection(grid, R, C) {
	for (let r = 0; r+1 < R; r++) {
		if (reflectsHorizontally(grid, r, R, C)) return r + 1;
	}
	return 0;
}

function solvePart1(input) {
	let grids = input.split('\n\n');
	let total = 0;

	for (let grid of grids) {
		let rows = grid.split('\n');
		let R = rows.length;
		let C = rows[0].length;
		let vert = findVerticalReflection(rows, R, C);
		let horz = findHorizontalReflection(rows, R, C);
		total += vert + 100 * horz;
	}

	return total;
}

function countVerticalSmudges(grid, col, R, C) {
	let smudges = 0;
	for (let row of grid) {
		for (let i = 0; col - i >= 0 && col+i+1 < C; i++) {
			if (row[col-i] != row[col+i+1]) smudges++;
		}
	}
	return smudges;
}

function countHorizontalSmudges(grid, row, R, C) {
	let smudges = 0;
	for (let c = 0; c < C; c++) {
		for (let i = 0; row - i >= 0 && row+i+1 < R; i++) {
			if (grid[row-i][c] != grid[row+i+1][c]) smudges++;
		}
	}
	return smudges;
}

function desmudgify(input) {
	let grid = input.split('\n');
	let R = grid.length;
	let C = grid[0].length;

	for (let c = 0; c+1 < C; c++) {
		if (countVerticalSmudges(grid, c, R, C) == 1) return c + 1;
	}

	for (let r = 0; r+1 < R; r++) {
		if (countHorizontalSmudges(grid, r, R, C) == 1) return 100 * (r + 1);
	}
}

function solvePart2(input) {
	let grids = input.split('\n\n');
	let total = 0;

	for (let grid of grids) {
		total += desmudgify(grid);
	}

	return total;
}
