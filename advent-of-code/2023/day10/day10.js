function canGoNorth(r, c, grid, last) {
	return last != 'SOUTH' && r > 0 && 'SF7|'.includes(grid[r-1][c]) && 'SLJ|'.includes(grid[r][c]);
}

function canGoSouth(r, c, grid, last) {
	return last != 'NORTH' && r+1 < grid.length && 'SJL|'.includes(grid[r+1][c]) && 'SF7|'.includes(grid[r][c]);
}

function canGoWest(r, c, grid, last) {
	return last != 'EAST' && c > 0 && 'SLF-'.includes(grid[r][c-1]) && 'SJ7-'.includes(grid[r][c]);
}

function solvePart1(input) {
	let lines = input.split('\n');
	let grid = lines.map(row => [...row]);

	let R = grid.length;
	let C = grid[0].length;

	let startRow = 0;
	let startCol = 0;

	for (let r = 0; r < R; r++) {
		for (let c = 0; c < C; c++) {
			if (grid[r][c] == 'S') {
				startRow = r;
				startCol = c;
			}
		}
	}

	let currentRow = startRow;
	let currentCol = startCol;
	let lastDir = '';
	let steps = 0;

	do {
		if (canGoNorth(currentRow, currentCol, grid, lastDir)) {
			currentRow--;
			lastDir = 'NORTH';
		}
		else if (canGoSouth(currentRow, currentCol, grid, lastDir)) {
			currentRow++;
			lastDir = 'SOUTH';
		}
		else if (canGoWest(currentRow, currentCol, grid, lastDir)) {
			currentCol--;
			lastDir = 'WEST';
		}
		else { // go east
			currentCol++;
			lastDir = 'EAST';
		}
		steps++;
	} while (currentRow != startRow || currentCol != startCol);

	return steps / 2;
}

function solvePart2(input) {
	let lines = input.split('\n');
	let grid = lines.map(row => [...row]);
	let loop = grid.map(row => row.map(cell => 0));

	let R = grid.length;
	let C = grid[0].length;

	let startRow = 0;
	let startCol = 0;

	for (let r = 0; r < R; r++) {
		for (let c = 0; c < C; c++) {
			if (grid[r][c] == 'S') {
				startRow = r;
				startCol = c;
			}
		}
	}

	let currentRow = startRow;
	let currentCol = startCol;
	let lastDir = '';

	// replace 'S' with a valid pipe character
	// TODO: code to determine which pipe is valid
	grid[startRow][startCol] = '|';

	do {
		loop[currentRow][currentCol] = 1;

		if (canGoNorth(currentRow, currentCol, grid, lastDir)) {
			currentRow--;
			lastDir = 'NORTH';
		}
		else if (canGoSouth(currentRow, currentCol, grid, lastDir)) {
			currentRow++;
			lastDir = 'SOUTH';
		}
		else if (canGoWest(currentRow, currentCol, grid, lastDir)) {
			currentCol--;
			lastDir = 'WEST';
		}
		else { // go east
			currentCol++;
			lastDir = 'EAST';
		}
	} while (!loop[currentRow][currentCol]);

	let totalTiles = 0;
	let isInside = false;
	let firstElbow = 'L';

	for (let r = 0; r < R; r++) {
		for (let c = 0; c < C; c++) {
			if (loop[r][c]) {
				if (grid[r][c] == '|') {
					isInside = !isInside;
				}
				else if ('LF'.includes(grid[r][c])) {
					firstElbow = grid[r][c];
				}
				else if (firstElbow == 'L' && grid[r][c] == '7') {
					isInside = !isInside;
				}
				else if (firstElbow == 'F' && grid[r][c] == 'J') {
					isInside = !isInside;
				}
			}
			else if (isInside) {
				totalTiles++;
			}
		}
	}

	return totalTiles;
}

export const Part1 = { solve: solvePart1 };
export const Part2 = { solve: solvePart2 };
