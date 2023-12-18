const D = [0, 1, 0, -1, 0];

function solvePart1(input) {
	let lines = input.split('\n');
	let map = lines.map(row => [...row].map(cell => cell - 0));
	let R = map.length;
	let C = map[0].length;
	let q = [[0,0,0,0]];
	let dp = { "0,0,0,0": 0 };
	let best = 999999999;

	function updateCost(r, c, d, k, cost) {
		if (r < 0 || r >= R || c < 0 || c >= C) return;
		let key = r+','+c+','+d+','+k;
		let prev = (key in dp) ? dp[key] : 999999999;

		if (cost + map[r][c] < prev) {
			dp[key] = cost + map[r][c];
			q.push([r,c,d,k]);
		}
	}

	for (let i = 0; i < q.length; i++) {
		let [r, c, d, k] = q[i];
		let key = r+','+c+','+d+','+k;
		let cost = dp[key];

		if (r == R-1 && c == C-1 && cost < best) best = cost;

		if (k < 3) {
			updateCost(r + D[d], c + D[d+1], d, k + 1, cost);
		}
		d = (d + 1) % 4;
		updateCost(r + D[d], c + D[d+1], d, 1, cost);
		d = (d + 2) % 4;
		updateCost(r + D[d], c + D[d+1], d, 1, cost);
	}

	return best;
}

function solvePart2(input) {
	let lines = input.split('\n');
	let map = lines.map(row => [...row].map(cell => cell - 0));
	let R = map.length;
	let C = map[0].length;
	let q = [[0,0,0,0]];
	let dp = { "0,0,0,0": 0 };
	let best = 999999999;

	function updateCost(r, c, d, k, cost) {
		if (r < 0 || r >= R || c < 0 || c >= C) return;
		let key = r+','+c+','+d+','+k;
		let prev = (key in dp) ? dp[key] : 999999999;

		if (cost + map[r][c] < prev) {
			dp[key] = cost + map[r][c];
			q.push([r,c,d,k]);
		}
	}

	function goStraight(r, c, d, k) {
		let heatLoss = 0;
		for (let i = 0; i < k; i++) {
			r += D[d];
			c += D[d+1];
			if (r < 0 || r >= R || c < 0 || c >= C) return 999999999;
			heatLoss += map[r][c];
		}
		return heatLoss;
	}

	for (let i = 0; i < q.length; i++) {
		let [r, c, d, k] = q[i];
		let key = r+','+c+','+d+','+k;
		let cost = dp[key];

		if (r == R-1 && c == C-1 && cost < best) best = cost;

		if (k < 10) {
			updateCost(r + D[d], c + D[d+1], d, k + 1, cost);
		}
		d = (d + 1) % 4;
		updateCost(r + 4 * D[d], c + 4 * D[d+1], d, 4, cost + goStraight(r, c, d, 3));
		d = (d + 2) % 4;
		updateCost(r + 4 * D[d], c + 4 * D[d+1], d, 4, cost + goStraight(r, c, d, 3));
	}

	return best;
}
