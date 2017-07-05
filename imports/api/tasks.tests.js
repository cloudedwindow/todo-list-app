/* esLint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks} from './tasks.js';

if (Meteor.isServer) {
	describe('Tasks', () => {
		describe('methods', () => {
			const userId = Random.id();
			let taskId;
			
			beforeEach(() => {
				Tasks.remove({});
				taskId = Tasks.insert({
					text: 'test task',
					createdAt: new Date(),
					owner: userId,
					username: 'tmeasday',
				});
			});
			
			it('can delete owned task', () => {
				// Find internal implementation of each task method
				const deleteTask = Meteor.server.method_handlers['tasks.remove'];
				
				// Set up fake method invocation
				const invocation = { userId };
				
				// Run method with 'this; set to fake invocation
				deleteTask.apply(invocation, [taskId]);
				
				// Verify method does what is expected
				assert.equal(Tasks.find().count(), 0);
			});
		});
	});
}