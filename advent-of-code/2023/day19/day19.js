function parseRule(str) {
	let [condition, next] = str.split(':');
	let category = 'x';
	let op = '>';
	let limit = 0;

	if (next) {
		category = condition[0];
		op = condition[1];
		limit = condition.substr(2) - 0;
	}
	else next = condition;

	return { category, op, limit, next };
}

function parseWorkflow(str) {
	let [name, rules] = str.split(/[{}]/);
	rules = rules.split(',').map(parseRule);

	return { name, rules };
}

function parsePart(str) {
	let ratings = str.replaceAll(/([xmas])=/g, '"$1":');
	return JSON.parse(ratings);
}

function solvePart1(input) {
	let [workflows, parts] = input.split('\n\n');
	let flows = {};

	workflows.split('\n').map(parseWorkflow).forEach(flow => {
		flows[flow.name] = flow;
	});

	parts = parts.split('\n').map(parsePart);

	function accepts(flowName, part) {
		if (flowName == 'A') return true;
		if (flowName == 'R') return false;
		let flow = flows[flowName];
		for (let rule of flow.rules) {
			if (rule.op == '>' && part[rule.category] > rule.limit
			|| rule.op == '<' && part[rule.category] < rule.limit) {
				return accepts(rule.next, part);
			}
		}
	}

	let acceptedParts = parts.filter(part => accepts('in', part));

	return acceptedParts.reduce((sum, part) => sum + part.x + part.m + part.a + part.s, 0);
}

function solvePart2(input) {
	let [workflows, parts] = input.split('\n\n');
	let flows = {};

	workflows.split('\n').map(parseWorkflow).forEach(flow => {
		flows[flow.name] = flow;
	});

	function countCombos(flowName, combo) {
		if (flowName == 'R') return 0;
		if (flowName == 'A') {
			let x = 0, m = 0, a = 0, s = 0;
			for (let rating = 1; rating <= 4000; rating++) {
				if (combo.x[rating]) x++;
				if (combo.m[rating]) m++;
				if (combo.a[rating]) a++;
				if (combo.s[rating]) s++;
			}
			return x * m * a * s;
		}
		let flow = flows[flowName];
		let total = 0;
		for (let rule of flow.rules) {
			let cc = structuredClone(combo);
			for (let rating = 1; rating <= 4000; rating++) {
				if (rule.op == '<' && rating < rule.limit
				|| rule.op == '>' && rating > rule.limit) {
					combo[rule.category][rating] = false;
				}
				else {
					cc[rule.category][rating] = false;
				}
			}
			total += countCombos(rule.next, cc);
		}
		return total;
	}

	let combo = {
		x: Array(4001).fill(true),
		m: Array(4001).fill(true),
		a: Array(4001).fill(true),
		s: Array(4001).fill(true)
	};

	return countCombos('in', combo);
}
