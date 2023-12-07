function isSymbol(x) {
	return x.match(/[^0-9.A-J]/);
}

function update(grid, r, c) {
	if (r < 0 || r >= grid.length) return;
	if (c < 0 || c >= grid[0].length) return;
	let digit = grid[r][c];
	if (digit.match(/\d/)) {
		grid[r][c] = 'ABCDEFGHIJ'[digit - 0];
	}
}

function solvePart1(input) {
	let lines = input.split('\n');
	let grid = lines.map(line => [...line]);
	let R = grid.length;
	let C = grid[0].length;

	for (let r = 0; r < R; r++) {
		for (let c = 0; c < C; c++) {
			if (isSymbol(grid[r][c])) {
				update(grid, r-1, c-1);
				update(grid, r-1, c);
				update(grid, r-1, c+1);
				update(grid, r, c-1);
				update(grid, r, c+1);
				update(grid, r+1, c-1);
				update(grid, r+1, c);
				update(grid, r+1, c+1);
			}
		}
	}

	let all = grid.map(row => row.join('')).join('.');
	let numbers = all.split(/[^0-9A-J]+/);
	let sum = 0;

	for (let num of numbers) {
		if (num.match(/^\d+$/)) continue;
		sum += num.replaceAll('A', '0').replaceAll('B', '1').replaceAll('C', '2').replaceAll('D', '3').replaceAll('E', '4')
		          .replaceAll('F', '5').replaceAll('G', '6').replaceAll('H', '7').replaceAll('I', '8').replaceAll('J', '9') - 0;
	}

	return sum;
}

function getPart(grid, r, c) {
	if (r < 0 || r >= grid.length) return;
	if (c < 0 || c >= grid[0].length) return;
	let number = grid[r][c];
	grid[r][c] = 'X';
	if ('0123456789'.includes(number)) {
		for (let k = 1; c - k >= 0 && '0123456789'.includes(grid[r][c-k]); k++) {
			number = grid[r][c - k] + number;
			grid[r][c - k] = 'X';
		}
		for (let k = 1; c + k < grid[r].length && '0123456789'.includes(grid[r][c+k]); k++) {
			number += grid[r][c + k];
			grid[r][c + k] = 'X';
		}
		return number - 0;
	}
}

function gearRatio(grid, r, c) {
	let parts = [
		getPart(grid, r-1, c-1),
		getPart(grid, r-1, c),
		getPart(grid, r-1, c+1),
		getPart(grid, r, c-1),
		getPart(grid, r, c+1),
		getPart(grid, r+1, c-1),
		getPart(grid, r+1, c),
		getPart(grid, r+1, c+1)
	].filter(part => part > 0);

	if (parts.length == 2) {
		return parts[0] * parts[1];
	}

	return 0;
}

function solvePart2(input) {
	let lines = input.split('\n');
	let grid = lines.map(line => [...line]);
	let R = grid.length;
	let C = grid[0].length;
	let sum = 0;

	for (let r = 0; r < R; r++) {
		for (let c = 0; c < C; c++) {
			if (grid[r][c] == '*') {
				sum += gearRatio(grid, r, c);
			}
		}
	}

	return sum;
}

export const Part1 = { solve: solvePart1 };
export const Part2 = { solve: solvePart2 };
