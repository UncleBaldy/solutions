function solvePart1(input) {
	let lines = input.split('\n');
	let times = lines[0].split(/\s+/);
	let dists = lines[1].split(/\s+/);
	let product = 1;

	for (let i = 1; i < times.length; i++) {
		let time = times[i] - 0;
		let dist = dists[i] - 0;
		let ways = 0;

		for (let push = 1; push < time; push++) {
			let d = push * (time - push);
			if (d > dist) ways++;
		}

		product *= ways;
	}

	return product;
}

function solvePart2(input) {
	return solvePart1(input.replaceAll(/(\d+) +/g, '$1'));
}

export const Part1 = { solve: solvePart1 };
export const Part2 = { solve: solvePart2 };
