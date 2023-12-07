function solvePart1(input) {
	let lines = input.split('\n');
	let sum = 0;

	for (let line of lines) {
		let [game, ...rounds] = line.split(/:|;/);
		let possible = true;
		for (let round of rounds) {
			for (let marbles of round.split(',')) {
				let [count, color] = marbles.trim().split(' ');
				if (color == 'red' && count - 0 > 12) possible = false;
				if (color == 'green' && count - 0 > 13) possible = false;
				if (color == 'blue' && count - 0 > 14) possible = false;
			}
		}
		if (possible) {
			sum += game.split(' ')[1] - 0;
		}
	}

	return sum;
}

function solvePart2(input) {
	let lines = input.split('\n');
	let sum = 0;

	for (let line of lines) {
		let [game, ...rounds] = line.split(/:|;/);
		let minRed = 0, minGreen = 0, minBlue = 0;
		for (let round of rounds) {
			for (let marbles of round.split(',')) {
				let [count, color] = marbles.trim().split(' ');
				let min = count - 0;
				if (color == 'red' && min > minRed) minRed = min;
				if (color == 'green' && min > minGreen) minGreen = min;
				if (color == 'blue' && min > minBlue) minBlue = min;
			}
		}
		sum += minRed * minGreen * minBlue;
	}

	return sum;
}

export const Part1 = { solve: solvePart1 };
export const Part2 = { solve: solvePart2 };
