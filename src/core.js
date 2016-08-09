/**
 * Created by maximradko on 8/9/16.
 */
import {List, Map} from 'immutable';

export const setEntries = (state, entries) => {
	return state.set('entries', List(entries));
};

export const next = (state) => {
	const entries = state.get('entries');
	return state.merge({
		vote: Map({ pair: entries.take(2) }),
		entries: entries.skip(2)
	});
};
export const vote = (state, entry) => {
	return state.updateIn(
		['vote', 'tally', entry],
		0,
		tally => tally + 1
	);
};

