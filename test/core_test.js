/**
 * Created by maximradko on 8/9/16.
 */
import {List, Map} from 'immutable';
import {expect} from 'chai';

import {
	setEntries,
	next,
	vote
} from '../src/core';

describe('core logic', () => {

	describe('setEntries', () => {

		it('add items to state', () => {
			const state = Map();
			const entries = List.of('Dark Knight', 'Watchmen');
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Dark Knight', 'Watchmen')
			}));
		});

		it('convert to immutable', () => {
			const state = Map();
			const entries = ['Trainspotting', '28 Days Later'];
			const nextState = setEntries(state, entries);
			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));
		});

	});

	describe('next', () => {

		it('get for voting next item', () => {
			const state = Map({
				entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List.of('Sunshine')
			}));
		});

	});

	describe('vote', () => {

		it('create voting result for choosing item', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 1
					})
				}),
				entries: List()
			}));
		});

		it('add to current result for choosing item', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 3,
						'28 Days Later': 2
					})
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				}),
				entries: List()
			}));
		});

	});
	
});

