var
	maybe = require('./index.js'),
	assert = require('assert'),
	vows = require('vows');

vows.describe('Data.Maybe-js::').addBatch({
	'm = maybe.Maybe().setNothing()': {
		topic: function() {
			var m = new maybe.Maybe();
			m.setNothing();
			return m;
		},
		'isNothing() should return true': function(topic) {
			assert.equal(topic.isNothing(), true);
		},
		'isJust() should return false': function(topic) {
			assert.equal(topic.isJust(), false);
		}
	},
	'm = maybe.Nothing()': {
		topic: function() {
			return new maybe.Nothing();
		},
		'isNothing() should return true': function(topic) {
			assert.equal(topic.isNothing(), true);
		},
		'isJust() should return false': function(topic) {
			assert.equal(topic.isJust(), false);
		}
	},
	'm = maybe.Maybe().setJust(99)': {
		topic: function() {
			var m = new maybe.Maybe().setJust(99);
			return m;
		},
		'isNothing() should return false': function(topic) {
			assert.equal(topic.isNothing(), false);
		},
		'isJust() should return true': function(topic) {
			assert.equal(topic.isJust(), true);
		},
		'fromJust() should return 99': function(topic) {
			assert.equal(topic.fromJust(), 99);
		}
	},
	'm = maybe.Just(99)': {
		topic: function() {
			return new maybe.Just(99);
		},
		'isNothing() should return false': function(topic) {
			assert.equal(topic.isNothing(), false);
		},
		'isJust() should return true': function(topic) {
			assert.equal(topic.isJust(), true);
		},
		'fromJust() should return 99': function(topic) {
			assert.equal(topic.fromJust(), 99);
		}
	},
	'uninitialization Error checks': {
		topic: function() {
			return new maybe.Maybe();
		},
		'isNothing()': {
			topic: function(topic) {
				return topic.isNothing();
			},
			'isNothing should throw Error': function(topic) {
				assert.throws(topic, Error);
			},
		},
		'isJust()': {
			topic: function(topic) {
				return topic.isJust();
			},
			'isJust should throw Error': function(topic) {
				assert.throws(topic, Error);
			},
		},
		'fromJust()': {
			topic: function(topic) {
				return topic.fromJust();
			},
			'fromJust should throw Error': function(topic) {
				assert.throws(topic, Error);
			},
		},
		'fromMaybe()': {
			topic: function(topic) {
				return topic.fromMaybe();
			},
			'fromMaybe should throw Error': function(topic) {
				assert.throws(topic, Error);
			}
		},
	},
	're-initialization Error checks': {
		topic: function() {
			return new maybe.Maybe().setNothing();
		},
		'setNothing()': {
			topic: function(topic) {
				return topic.setNothing();
			},
			'setNothing() on an already set maybe object should throw Error': function(topic) {
				assert.throws(topic, Error);
			},
		},
		'setJust()': {
			topic: function(topic) {
				return topic.setJust("hi");
			},
			'setJust() on an already set maybe object should throw Error': function(topic) {
				assert.throws(topic, Error);
			},
		},
	},
	'Just checks': {
		topic: function() {
			return new maybe.Just("hello");
		},
		'isJust()': function(topic) {
			assert.equal(topic.isJust(), true);
		},
		'fromJust() == "hello"': function(topic) {
			assert.equal(topic.fromJust(), "hello");
		}
	},
	'maybe() Nothing check': {
		topic: function() {
			return new maybe.Nothing().maybe(5, function(a){return a+1;});
		},
		'maybe(5, f(a+1)) should return 5': function(topic) {
			assert.equal(topic, 5);
		}
	},
	'maybe() Just check': {
		topic: function() {
			return new maybe.Just(100).maybe(5, function(a){return a+1;});
		},
		'maybe(5, f(a+1)) should return 101': function(topic) {
			assert.equal(topic, 101);
		},
	},
	'fromMaybe() Nothing check': {
		topic: function() {
			return new maybe.Nothing().fromMaybe(5);
		},
		'fromMaybe(5) should return 5': function(topic) {
			assert.equal(topic, 5);
		}
	},
	'fromMaybe() Just check': {
		topic: function() {
			return new maybe.Just(100).fromMaybe(5);
		},
		'fromMaybe(5) should return 100': function(topic) {
			assert.equal(topic, 100);
		}
	}
}).run();
