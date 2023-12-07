function solvePart1(input) {
	let lines = input.split('\n');
	let totalPoints = 0;

	for (let line of lines) {
		let [_card, winning, yours] = line.split(/[:|]/);
		let winningNumbers = winning.trim().split(/\s+/);
		let yourNumbers = yours.trim().split(/\s+/);
		let points = 1;
		for (let number of yourNumbers) {
			if (winningNumbers.includes(number)) points <<= 1;
		}
		totalPoints += points >> 1;
	}

	return totalPoints;
}

function countMatches(card) {
	let [_number, winning, yours] = card.split(/[:|]/);
	let winningNumbers = winning.trim().split(/\s+/);
	let yourNumbers = yours.trim().split(/\s+/);
	let total = 0;
	for (let number of yourNumbers) {
		if (winningNumbers.includes(number)) total++;
	}
	return total;
}

function solvePart2(input) {
	let lines = input.split('\n');
	let total = 0;
	let copies = lines.map(_ => 0);

	for (let i = lines.length - 1; i >= 0; i--) {
		total++;
		let matches = countMatches(lines[i]);
		for (let j = 1; j <= matches; j++) {
			copies[i] += copies[i+j] + 1;
		}
		total += copies[i];
	}

	return total;
}

export const Part1 = { solve: solvePart1 };
export const Part2 = { solve: solvePart2 };
