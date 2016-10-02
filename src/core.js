/**
 * Created by maximradko on 8/9/16.
 */
import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export const setEntries = (state, entries) => {
	return state.set('entries', List(entries));
};

export const next = (state) => {
	const entries = state.get('entries')
		.concat(getWinners(state.get('vote')));
	
	if(entries.size === 1) {
		return state.remove('vote')
			.remove('entries')
			.set('winner', entries.first())
	} else {
		return state.merge({
			vote: Map({ pair: entries.take(2) }),
			entries: entries.skip(2)
		});
	}
};

export const vote = (state, entry) => {
	return state.updateIn(
		['vote', 'tally', entry],
		0,
		tally => tally + 1
	);
};

export const getWinners = (vote) => {
	if(!vote) return [];
	const [a, b] = vote.get('pair');
	const aVoteResult = vote.getIn(['tally', a], 0);
	const bVoteResult = vote.getIn(['tally', b], 0);

	if (aVoteResult > bVoteResult) return [a];
	else if (bVoteResult > aVoteResult) return [b];
	else return [a, b];
};
