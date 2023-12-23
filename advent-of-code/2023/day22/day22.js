function parseBlock(str) {
	let [x1, y1, z1, x2, y2, z2] = str.split(/\D/).map(Number);
	return {
		x1, y1, z1,
		x2, y2, z2,
		safe: true,
		above: [],
		below: []
	};
}

function byAltitude(block1, block2) {
	if (block1.z1 != block2.z1) return block1.z1 - block2.z1;
	if (block1.y1 != block2.y1) return block1.y1 - block2.y1;
	if (block1.x1 != block2.x1) return block1.x1 - block2.x1;
	return (block1.z2*1000000 + block1.y2*1000 + block1.x2) - (block2.z2*1000000 + block2.y2*1000 + block2.x2);
}

function solvePart1(input) {
	let lines = input.split('\n');
	let blocks = lines.map(parseBlock).sort(byAltitude);

	for (let i = 0; i < blocks.length; i++) {
		let falling = blocks[i];
		let maxZ = 0;
		for (let j = i-1; j >= 0; j--) {
			let resting = blocks[j];
			if (falling.x2 < resting.x1 || resting.x2 < falling.x1) continue;
			if (falling.y2 < resting.y1 || resting.y2 < falling.y1) continue;
			if (resting.z2 > maxZ) maxZ = resting.z2;
		}
		let dz = falling.z1 - (maxZ + 1);
		falling.z1 -= dz;
		falling.z2 -= dz;
	}

	for (let block of blocks) {
		for (let under of blocks) {
			if (under.z2 + 1 != block.z1) continue;
			if (block.x2 < under.x1 || under.x2 < block.x1) continue;
			if (block.y2 < under.y1 || under.y2 < block.y1) continue;
			block.below.push(under);
		}
		if (block.below.length == 1) {
			block.below[0].safe = false;
		}
	}

	return blocks.filter(block => block.safe).length;
}

function solvePart2(input) {
	let lines = input.split('\n');
	let blocks = lines.map(parseBlock).sort(byAltitude);

	for (let i = 0; i < blocks.length; i++) {
		let falling = blocks[i];
		let maxZ = 0;
		for (let j = i-1; j >= 0; j--) {
			let resting = blocks[j];
			if (falling.x2 < resting.x1 || resting.x2 < falling.x1) continue;
			if (falling.y2 < resting.y1 || resting.y2 < falling.y1) continue;
			if (resting.z2 > maxZ) maxZ = resting.z2;
		}
		let dz = falling.z1 - (maxZ + 1);
		falling.z1 -= dz;
		falling.z2 -= dz;
	}

	for (let block of blocks) {
		for (let under of blocks) {
			if (under.z2 + 1 != block.z1) continue;
			if (block.x2 < under.x1 || under.x2 < block.x1) continue;
			if (block.y2 < under.y1 || under.y2 < block.y1) continue;
			block.below.push(under);
			under.above.push(block);
		}
	}

	function disintegrate(block) {
		let total = 0;
		block.disintegrated = true;
		for (let brick of block.above) {
			if (brick.below.every(support => support.disintegrated)) {
				total += 1 + disintegrate(brick);
			}
		}
		return total;
	}

	let totalFallen = 0;

	for (let block of blocks) {
		blocks.forEach(brick => brick.disintegrated = false);
		totalFallen += disintegrate(block);
	}

	return totalFallen;
}
