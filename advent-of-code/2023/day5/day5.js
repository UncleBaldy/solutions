function solvePart1(input) {
	let [seedSection, ...mappingSections] = input.split('\n\n');
	let [_title, ...seeds] = seedSection.split(' ');
	let source = seeds.map(seed => seed - 0);

	for (let section of mappingSections) {
		let mapped = {};
		let[_header, ...mappings] = section.split('\n');
		for (let mapping of mappings) {
			let [dest, src, range] = mapping.split(' ').map(x => x - 0);
			for (let i = 0; i < source.length; i++) {
				if (mapped[i]) continue;
				if (src <= source[i] && source[i] < src + range) {
					let delta = source[i] - src;
					source[i] = dest + delta;
					mapped[i] = true;
				}
			}
		}
	}

	return Math.min(...source);
}

function solvePart2(input) {
	let [seedSection, ...mappingSections] = input.split('\n\n');
	let [_title, ...seeds] = seedSection.split(' ');
	let ranges = [];

	for (let i = 0; i < seeds.length; i += 2) {
		let min = seeds[i] - 0;
		let max = min + (seeds[i+1] - 1);
		ranges.push({ min, max });
	}

	for (let section of mappingSections) {
		let[_header, ...mappings] = section.split('\n');
		let targets = [];
		for (let mapping of mappings) {
			let [dest, min, range] = mapping.split(' ').map(x => x - 0);
			let max = min + range - 1;
			let delta = dest - min;
			targets.push({ min, max, delta });
		}

		let newRanges = [];
		for (let i = 0; i < ranges.length; i++) {
			let range = ranges[i];
			let assigned = false;
			for (let target of targets) {

				// no overlap
				if (range.max < target.min || target.max < range.min) continue;

				assigned = true;

				// complete containment
				if (target.min <= range.min && range.max <= target.max) {
					newRanges.push({
						min: range.min + target.delta,
						max: range.max + target.delta
					});
					break;
				}

				// add new interval before target
				if (range.min < target.min) {
					ranges.push({ min: range.min, max: target.min - 1 });
				}

				// add new interval after target
				if (range.max > target.max) {
					ranges.push({ min: target.max + 1, max: range.max });
				}

				newRanges.push({
					min: Math.max(range.min, target.min) + target.delta,
					max: Math.min(range.max, target.max) + target.delta
				});
			}

			if (!assigned) {
				newRanges.push(range);
			}
		}

		ranges = newRanges;
	}

	let lowest = ranges[0].min;
	for (let range of ranges) {
		if (range.min < lowest) lowest = range.min;
	}

	return lowest;
}

export const Part1 = { solve: solvePart1 };
export const Part2 = { solve: solvePart2 };
