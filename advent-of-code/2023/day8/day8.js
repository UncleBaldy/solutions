function solvePart1(input) {
	let [dirs, nodes] = input.split('\n\n');
	let map = {};

	for (let node of nodes.split('\n')) {
		let [nodeId, L, R] = node.split(/\W+/);
		map[nodeId] = { L, R };
	}

	let totalSteps = 0;
	let currentNode = 'AAA';

	while (currentNode != 'ZZZ') {
		let dir = dirs[totalSteps % dirs.length];
		currentNode = map[currentNode][dir];
		totalSteps++;
	}

	return totalSteps;
}

function solvePart2(input) {
	let [dirs, nodes] = input.split('\n\n');
	let map = {};
	let ghosts = [];

	for (let node of nodes.split('\n')) {
		let [nodeId, L, R] = node.split(/\W+/);
		map[nodeId] = { L, R };
		if (nodeId[2] == 'A') {
			ghosts.push({ node: nodeId });
		}
	}

	let lastGhost = ghosts[0];
	let totalSteps = 0;
	let ready = 0;

	while (ready < ghosts.length) {
		let dir = dirs[totalSteps % dirs.length];
		totalSteps++;

		for (let ghost of ghosts) {
			ghost.node = map[ghost.node][dir];

			if (ghost.node[2] == 'Z') {
				if (!ghost.baseStep) {
					ghost.baseStep = totalSteps;
				}
				else if (!ghost.cycleLength) {
					ghost.cycleLength = totalSteps - ghost.baseStep;
					lastGhost = ghost;
					ready++;
				}
			}
		}
	}

	while (ghosts.some(ghost => (totalSteps - ghost.baseStep) % ghost.cycleLength)) {
		totalSteps += lastGhost.cycleLength;
	}

	return totalSteps;
}

export const Part1 = { solve: solvePart1 };
export const Part2 = { solve: solvePart2 };
