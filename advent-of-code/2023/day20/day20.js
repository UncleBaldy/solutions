const LOW = 0, HIGH = 1;
const BROADCASTER = 'b';
const FLIP_FLOP = '%';
const CONJUNCTION = '&';

function parseModule(str) {
	let [moduleName, ...destinations] = str.split(/[-> ,]+/);
	return {
		name: moduleName[0] == 'b' ? moduleName : moduleName.substr(1),
		type: moduleName[0],
		destinations,
		on: false,
		inputs: {}
	};
}

function solvePart1(input) {
	let lines = input.split('\n');
	let modules = {};
	let totalLow = 0;
	let totalHigh = 0;

	for (let module of lines.map(parseModule)) {
		modules[module.name] = module;
	}

	// default all conjunction module inputs to LOW
	for (let name in modules) {
		let inputModule = modules[name];
		for (let destination of inputModule.destinations) {
			if (destination in modules) {
				let module = modules[destination];
				if (module.type == CONJUNCTION) {
					module.inputs[name] = LOW;
				}
			}
		}
	}

	function pushButton() {
		let pulses = [['button', LOW, 'broadcaster']];

		for (let i = 0; i < pulses.length; i++) {
			let [from, pulse, to] = pulses[i];
			let module = modules[to];

			if (pulse == LOW) totalLow++;
			else totalHigh++;

			if (!(to in modules)) continue;

			if (module.type == BROADCASTER) {
				for (let destination of module.destinations) {
					pulses.push([to, pulse, destination]);
				}
			}
			else if (module.type == FLIP_FLOP) {
				if (pulse == LOW) {
					module.on = !module.on;
					let output = module.on ? HIGH : LOW;
					for (let destination of module.destinations) {
						pulses.push([to, output, destination]);
					}
				}
			}
			else { // CONJUNCTION
				module.inputs[from] = pulse;
				let output = Object.values(module.inputs).every(pulse => pulse == HIGH) ? LOW : HIGH;
				for (let destination of module.destinations) {
					pulses.push([to, output, destination]);
				}
			}
		}
	}

	for (let i = 0; i < 1000; i++) {
		pushButton();
	}

	return totalLow * totalHigh;
}

function solvePart2(input) {
	let lines = input.split('\n');
	let modules = {};
	let totalPushes = 0;

	for (let module of lines.map(parseModule)) {
		modules[module.name] = module;
	}

	// default all conjunction module inputs to LOW
	for (let name in modules) {
		let inputModule = modules[name];
		for (let destination of inputModule.destinations) {
			if (destination in modules) {
				let module = modules[destination];
				if (module.type == CONJUNCTION) {
					module.inputs[name] = LOW;
				}
			}
		}
	}

	let rxInputModule = Object.values(modules).find(module => module.destinations.includes('rx'));
	let cycles = {};

	function pushButton() {
		let pulses = [['button', LOW, 'broadcaster']];

		for (let i = 0; i < pulses.length; i++) {
			let [from, pulse, to] = pulses[i];
			let module = modules[to];

			if (!(to in modules)) continue;

			if (module.type == BROADCASTER) {
				for (let destination of module.destinations) {
					pulses.push([to, pulse, destination]);
				}
			}
			else if (module.type == FLIP_FLOP) {
				if (pulse == LOW) {
					module.on = !module.on;
					let output = module.on ? HIGH : LOW;
					for (let destination of module.destinations) {
						pulses.push([to, output, destination]);
					}
				}
			}
			else { // CONJUNCTION
				module.inputs[from] = pulse;
				let output = Object.values(module.inputs).every(pulse => pulse == HIGH) ? LOW : HIGH;
				for (let destination of module.destinations) {
					pulses.push([to, output, destination]);
				}

				if (module == rxInputModule && pulse == HIGH) {
					if (!cycles[from]) {
						cycles[from] = { last: totalPushes };
					}
					else if (!cycles[from].length) {
						cycles[from].length = totalPushes - cycles[from].last;
					}
				}
			}
		}
	}

	for (let i = 0; i < 1000000; i++) {
		totalPushes++;
		pushButton();
	}

	return Object.values(cycles).reduce((product, cycle) => product * cycle.length, 1);
}
