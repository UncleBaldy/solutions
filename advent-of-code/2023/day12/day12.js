// brute force
// test all combinations of values in place of question marks
function solvePart1(input) {
	let lines = input.split('\n');
	let ways = 0;

	for (let line of lines) {
		let [condition, groups] = line.split(' ');
		let q = condition.replaceAll(/[^?]/g, '').length;
		groups = '1,' + groups + ',1';
		let limit = 1 << q;
		for (let i = 0; i < limit; i++) {
			let bits = i;
			let cond = '#.' + condition + '.#';
			for (let p = 0; p < q; p++) {
				cond = cond.replace('?', bits % 2 ? '.' : '#');
				bits >>= 1;
			}
			let broken = cond.split(/\.+/).map(group => group.length).join(',');
			if (broken == groups) ways++;
		}
	}

	return ways;
}

// memoized/dynamic lookup table
// number of ways group g can have k broken springs by index i
// so, when k is 0, there must be a '.' at index i
// and when k is greater than 0, there must be a '#' at index i
function countWays(condition, groups) {
	condition += '.';
	let dp = {};
	let memo = (i, g, k) => {
		let key = i+','+g+','+k;
		if (key in dp) return dp[key];
		if (i == 0) {
			if (g != 0 || k > 1) {
				dp[key] = 0;
			}
			else {
				dp[key] = condition[0] == '?' || (k > 0 ^ condition[0] == '.') ? 1 : 0;
			}
		}
		else if (k > 0) {
			if (condition[i] == '.') {
				dp[key] = 0;
			}
			else {
				dp[key] = memo(i-1, g, k-1);
			}
		}
		else if (condition[i] == '#') {
			dp[key] = 0;
		}
		else {
			dp[key] = memo(i-1, g, 0) + memo(i-1, g-1, groups[g-1]);
		}
		return dp[key];
	};
	return memo(condition.length - 1, groups.length, 0);
}

function solvePart2(input) {
	let lines = input.split('\n');
	let ways = 0;

	for (let line of lines) {
		let [condition, groups] = line.split(' ');
		let five = [1,2,3,4,5];
		condition = five.map(x => condition).join('?');
		groups = five.map(x => groups).join(',');
		groups = groups.split(',').map(x => x - 0);
		ways += countWays(condition, groups);
	}

	return ways;
}

export const Part1 = { solve: solvePart1 };
export const Part2 = { solve: solvePart2 };
