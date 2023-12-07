function isFiveKind(hand) {
	return hand[0] == hand[4];
}

function isFourKind(hand) {
	return hand[0] == hand[3] || hand[1] == hand[4];
}

function isFullHouse(hand) {
	return (hand[0] == hand[2] && hand[3] == hand[4])
	    || (hand[0] == hand[1] && hand[2] == hand[4]);
}

function isThreeKind(hand) {
	return hand[0] == hand[2] || hand[1] == hand[3] || hand[2] == hand[4];
}

function isTwoPair(hand) {
	return (hand[0] == hand[1] && hand[2] == hand[3])
	    || (hand[0] == hand[1] && hand[3] == hand[4])
	    || (hand[1] == hand[2] && hand[3] == hand[4]);
}

function isOnePair(hand) {
	return hand[0] == hand[1] || hand[1] == hand[2] || hand[2] == hand[3] || hand[3] == hand[4];
}

function getType(cards) {
	let hand = [...cards].sort();
	if (isFiveKind(hand)) return 0;
	if (isFourKind(hand)) return 1;
	if (isFullHouse(hand)) return 2;
	if (isThreeKind(hand)) return 3;
	if (isTwoPair(hand)) return 4;
	if (isOnePair(hand)) return 5;
	return 6;
}

function orderBy(labels) {
	return (hand1, hand2) => {
		if (hand1.type != hand2.type) return hand1.type - hand2.type;
		for (let i = 0; i < 5; i++) {
			if (hand1.cards[i] != hand2.cards[i]) return labels.indexOf(hand1.cards[i]) - labels.indexOf(hand2.cards[i]);
		}
		return 0;
	};
}

function parseHand(str) {
	let [cards, bid] = str.split(' ');
	return { cards, bid, type: getType(cards) };
}

function parseHandWithJokers(str) {
	let original = parseHand(str);
	let [best] = [...'23456789TQKA'].map(card => str.replaceAll('J', card))
	                                .map(parseHand)
	                                .sort(orderBy('AKQT98765432J'));
	best.cards = original.cards;
	return best;
}

function solvePart1(input) {
	let lines = input.split('\n');
	let hands = lines.map(parseHand);
	hands.sort(orderBy('AKQJT98765432'));

	let winnings = 0;
	let rank = hands.length;
	for (let hand of hands) {
		winnings += rank * hand.bid;
		rank--;
	}

	return winnings;
}

function solvePart2(input) {
	let lines = input.split('\n');
	let hands = lines.map(parseHandWithJokers);
	hands.sort(orderBy('AKQT98765432J'));

	let winnings = 0;
	let rank = hands.length;
	for (let hand of hands) {
		winnings += rank * hand.bid;
		rank--;
	}

	return winnings;
}

export const Part1 = { solve: solvePart1 };
export const Part2 = { solve: solvePart2 };
