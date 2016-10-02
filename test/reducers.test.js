/**
 * Created by maximradko on 10/2/16.
 */
import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducers';

describe('reducer', () => {

	it('has an initial state', () => {
		const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
		const nextState = reducer(undefined, action);
		expect(nextState).to.equal(fromJS({
			entries: ['Trainspotting']
		}));
	});

	it('all scenary', () => {
		const actions = [
			{type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
			{type: 'NEXT'},
			{type: 'VOTE', entry: 'Trainspotting'},
			{type: 'VOTE', entry: '28 Days Later'},
			{type: 'VOTE', entry: 'Trainspotting'},
			{type: 'NEXT'}
		];
		const finalState = actions.reduce(reducer, Map());

		expect(finalState).to.equal(fromJS({
			winner: 'Trainspotting'
		}));
	});

	describe('setEntries', () => {

		it('should handle SET_ENTRIES', () => {
			const initialState = Map();
			const action = {
				type: 'SET_ENTRIES',
				entries: ['Trainspotting']
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.equal(fromJS({
				entries: ['Trainspotting']
			}));
		});

		describe('next', () => {
			it('should be handle NEXT', () => {
				const initialState = fromJS({
					entries: ['Trainspotting', '28 Days Later']
				});
				const action = {type: 'NEXT'};
				const nextState = reducer(initialState, action);

				expect(nextState).to.equal(fromJS({
					vote: {
						pair: ['Trainspotting', '28 Days Later']
					},
					entries: []
				}));
			});
		});
		
		describe('vote', () => {
			
			it('should handle VOTE', () => {
				const initialState = fromJS({
					vote: {
						pair: ['Trainspotting', '28 Days Later']
					},
					entries: []
				});
				const action = {type: 'VOTE', entry: 'Trainspotting'};
				const nextState = reducer(initialState, action);

				expect(nextState).to.equal(fromJS({
					vote: {
						pair: ['Trainspotting', '28 Days Later'],
						tally: {Trainspotting: 1}
					},
					entries: []
				}));
			});
		});

	});
	
	

});