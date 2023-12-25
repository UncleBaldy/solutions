const D = [ 0, 1, 0, -1, 0 ];

function solvePart1(input) {
	let map = input.split('\n');
	let R = map.length;
	let hikers = [[0,1,1,0]]; // row, column, direction, steps
	let longestHike = 0;

	while (hikers.length > 0) {
		for (let hiker of hikers) {
			let [r, c, d, steps] = hiker;
			if (map[r][c] == '<' && d == 0
				|| map[r][c] == '^' && d == 1
				|| map[r][c] == '>' && d == 2
				|| map[r][c] == 'v' && d == 3) hiker.done = true;
			if (r == R-1) {
				hiker.done = true;
				if (steps > longestHike) longestHike = steps;
			}
			if (hiker.done) continue;
			let k = 0;
			for (let dd = d + 3; dd <= d + 5; dd++) {
				let rr = r + D[dd % 4];
				let cc = c + D[dd % 4 + 1];
				if (map[rr][cc] != '#') {
					k++;
					if (k == 1) {
						hiker[0] = rr;
						hiker[1] = cc;
						hiker[2] = dd % 4;
						hiker[3] = steps + 1;
					}
					else {
						hikers.push([rr, cc, dd % 4, steps + 1]);
					}
				}
			}
		}
		hikers = hikers.filter(hiker => !hiker.done);
	}

	return longestHike;
}

function solvePart2(input) {
	let map = input.split('\n');
	let R = map.length;
	let q = [[0, 1, 1]];
	let visited = { "0,1": true };

	function followPath(hiker) {
		while (hiker) {
			let { row, col, dir, steps } = hiker;
			let k = 0;
			for (let turn of [0, 1, 3]) { // [straight, right, left]
				let d = (dir + turn) % 4;
				let r = row + D[d];
				let c = col + D[d + 1];
				if (map[r][c] != '#') {
					k++;
					if (k == 1) {
						hiker.row = r;
						hiker.col = c;
						hiker.dir = d;
						hiker.steps++;
					}
					else if (!visited[row+','+col]) {
						q.push([row, col, d]);
					}
				}
			}
			if (k < 1) { // there are no dead ends in the input
				console.log('### >>>   [ DEAD END ]');
			}
			if (k > 1) { // found a junction
				if (!visited[row+','+col]) {
					q.push([row, col, dir]);
					visited[row+','+col] = true;
				}
				return { row, col, steps };
			}
			
			// if hiker reached bottom row (end of trail)
			if (hiker.row == R - 1) return hiker;
		}
	}

	for (let i = 0; i < q.length; i++) {
		let [row, col, dir] = q[i];
		let vertex = followPath({ row: row + D[dir], col: col + D[dir + 1], dir, steps: 1 });
		console.log(`(${row},${col}) --> (${vertex.row},${vertex.col}) = ${vertex.steps}`);
	}

	// TODO: given vertices and edge lenths, find longest path
}
