const D = [0, 1, 0, -1, 0];
const M = { '/': [3,2,1,0], '\\': [1,0,3,2] };

function countEnergized(cave, r0, c0, d0) {
	let R = cave.length;
	let C = cave[0].length;
	let q = [[r0, c0, d0]];
	let energized = {};
	let seen = {};
	seen[r0+','+c0+','+d0] = true;

	for (let i = 0; i < q.length; i++) {
		let [r, c, d] = q[i];
		let cell = cave[r][c];
		let split = false;

		energized[r+','+c] = true;

		if (cell in M) {
			d = M[cell][d];
		}
		else if (cell == '|' && d%2 == 0 || cell == '-' && d%2) {
			d = (d + 1) % 4;
			split = true;
		}

		let rr = r += D[d];
		let cc = c += D[d + 1];
		let key = rr + ',' + cc + ',' + d;

		if (!seen[key] && rr >= 0 && rr < R && c >= 0 && c < C) {
			q.push([rr,cc,d]);
			seen[key] = true;
		}

		if (split) {
			d = (d + 2) % 4;
			rr = r += D[d];
			cc = c += D[d + 1];
			key = rr + ',' + cc + ',' + d;

			if (!seen[key] && rr >= 0 && rr < R && c >= 0 && c < C) {
				q.push([rr,cc,d]);
				seen[key] = true;
			}
		}
	}

	return Object.keys(energized).length;
}

function solvePart1(input) {
	let cave = input.split('\n');
	return countEnergized(cave, 0, 0, 0);
}

function solvePart2(input) {
	let cave = input.split('\n');
	let R = cave.length;
	let C = cave[0].length;
	let maxEnergized = 0;

	for (let r = 0; r < R; r++) {
		let fromTop = countEnergized(cave, r, 0, 0);
		let fromBottom = countEnergized(cave, r, C - 1, 2);
		maxEnergized = Math.max(maxEnergized, fromTop, fromBottom);
	}

	for (let c = 0; c < C; c++) {
		let fromLeft = countEnergized(cave, 0, c, 1);
		let fromRight = countEnergized(cave, R - 1, c, 3);
		maxEnergized = Math.max(maxEnergized, fromLeft, fromRight);
	}

	return maxEnergized;
}
