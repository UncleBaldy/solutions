function solvePart1(input) {
	let lines = input.split('\n');
	let minRow = 9e9, maxRow = -9e9;
	let minCol = 9e9, maxCol = -9e9;
	let r = 0, c = 0;

	for (let line of lines) {
		let [dir, dist] = line.split(' ');
		let meters = dist - 0;
		if (dir == 'R') c += meters;
		else if (dir == 'L') c -= meters;
		else if (dir == 'D') r += meters;
		else r -= meters;
		if (r < minRow) minRow = r;
		if (r > maxRow) maxRow = r;
		if (c < minCol) minCol = c;
		if (c > maxCol) maxCol = c;
	}

	let R = maxRow - minRow + 10;
	let C = maxCol - minCol + 10;
	let grid = Array(R).fill(0).map(row => Array(C).fill('.'));

	function dig(r, c) {
		grid[r - minRow + 5][c - minCol + 5] = '#';
	}

	r = 0;
	c = 0;
	for (let line of lines) {
		let [dir, dist] = line.split(' ');
		let meters = dist - 0;
		for (let i = 0; i < meters; i++) {
			if (dir == 'R') c++;
			else if (dir == 'L') c--;
			else if (dir == 'D') r++;
			else r--;
			dig(r, c);
		}
	}

	let q = [[0,0]];
	grid[0][0] = 'X';

	function fill(r, c) {
		if (r < 0 || r >= R || c < 0 || c >= C) return;
		if (grid[r][c] == '.') {
			grid[r][c] = 'X';
			q.push([r, c]);
		}
	}

	for (let i = 0; i < q.length; i++) {
		let [r, c] = q[i];
		fill(r-1, c);
		fill(r+1, c);
		fill(r, c-1);
		fill(r, c+1);
	}

	return R*C - q.length;
}

function solvePart2(input) {
	let lines = input.split('\n');
	let x = 0, y = 0;
	let x1 = 0, y1 = 0;
	let x2 = 0, y2 = 0;
	let perimeter = 0;
	let area = 0;

	for (let line of lines) {
		let [_color, hex] = line.split('#');
		let value = parseInt(hex, 16);
		let meters = value >> 4;
		let dir = value & 15;
		perimeter += meters;
		
		if (dir == 0) x += meters;
		else if (dir == 1) y += meters;
		else if (dir == 2) x -= meters;
		else y -= meters;

		x1 = x2;
		y1 = y2;
		x2 = x;
		y2 = y;

		area += x1 * y2 - x2 * y1;
	}

	return (area + perimeter) / 2 + 1;
}
