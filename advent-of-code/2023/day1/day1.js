function solvePart1(input) {
	let lines = input.split('\n');
	let sum = 0;

	for (let line of lines) {
		let digits = line.replaceAll(/\D/g, '');
		let num = digits[0] + digits[digits.length - 1] - 0;
		sum += num;
	}

	return sum;
}

function solvePart2(input) {
	let lines = input.split('\n');
	let sum = 0;

	for (let line of lines) {
		let digits = line.replaceAll('one', 'o1e')
		                 .replaceAll('two', 't2o')
		                 .replaceAll('three', 't3e')
		                 .replaceAll('four', '4')
		                 .replaceAll('five', '5e')
		                 .replaceAll('six', '6')
		                 .replaceAll('seven', '7n')
		                 .replaceAll('eight', 'e8t')
		                 .replaceAll('nine', 'n9e')
		                 .replaceAll(/\D/g, '');
		let num = digits[0] + digits[digits.length - 1] - 0;
		sum += num;
	}

	return sum;
}

export const Part1 = { solve: solvePart1 };
export const Part2 = { solve: solvePart2 };
