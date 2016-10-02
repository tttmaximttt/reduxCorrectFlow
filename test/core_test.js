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

		it('should put winner of current voting in the ehd of list', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Transporting', '28 days later'),
					tally: Map({
						'Transporting': 4,
						'28 days later': 2
					}),
				}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions'),
				}),
				entries: List.of('127 Hours', 'Transporting')
			}));
		});
		
		it('if case of voting is draw, both item\'s should be put in the end of the list', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Transporting', '28 days later'),
					tally: Map({
						'Transporting': 4,
						'28 days later': 4
					})
				}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
			});

			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions'),
				}),
				entries: List.of('127 Hours', 'Transporting', '28 days later')
			}));
		});
		
		it('when in list last only one item, mark them like a winner', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Transporting', '28 days later'),
					tally: Map({
						'Transporting': 4,
						'28 days later': 2
					})
				}),
				entries: List.of()
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				winner: 'Transporting'
			}))
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

