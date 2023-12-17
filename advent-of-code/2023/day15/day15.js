function doHash(str) {
	let current = 0;
	for (let i = 0; i < str.length; i++) {
		current += str.charCodeAt(i);
		current *= 17;
		current &= 255;
	}
	return current;
}

function solvePart1(input) {
	let steps = input.split(',');
	let sum = 0;

	for (let step of steps) {
		sum += doHash(step);
	}

	return sum;
}

function solvePart2(input) {
	let steps = input.split(',');
	let boxes = Array(256).fill(0).map(_ => []);

	for (let step of steps) {
		let [label] = step.split(/\W/);
		let boxIndex = doHash(label);
		let box = boxes[boxIndex];

		if (step.endsWith('-')) {
			boxes[boxIndex] = box.filter(lens => lens.label != label);
		}
		else {
			let lens = box.find(lens => lens.label == label);
			if (!lens) {
				lens = { label };
				box.push(lens);
			}
			lens.focalLength = step[step.length - 1] - 0;
		}
	}

	let sum = 0;
	let boxNumber = 1;
	for (let box of boxes) {
		let slotNumber = 1;
		for (let lens of box) {
			sum += boxNumber * slotNumber * lens.focalLength;
			slotNumber++;
		}
		boxNumber++;
	}

	return sum;
}
