/**
 * Created by maximradko on 10/2/16.
 */
// import { combineReducers } from 'redux';
// import nextReducer from './next.reducer'
// import setEntriesReducer from './setEntries.reducer'
// import voteReducer from './vote.reducer'
//
// export default combineReducers({
// 	nextReducer,
// 	setEntriesReducer,
// 	voteReducer
// }); TODO for divided

import { next, setEntries, vote, INITIAL_STATE } from '../core';

export default function reducer(state = INITIAL_STATE, action) {

	switch (action.type) {

		case 'SET_ENTRIES':
			return setEntries(state, action.entries);
		case 'NEXT':
			return next(state);
		case 'VOTE':
			return vote(state, action.entry);
		default:
			return state;
	}

}
