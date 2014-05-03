"use strict";

var Maybe = function() {
	var _data = {
		something : null,
		nothing : true,
		set : false,
	}

	this.maybe = function(b, fab) {
		/* maybe :: b -> (a -> b) -> b */
		if(_data.set == false) { throw Error('Maybe object has not been initialized'); }
		if(this.isNothing()) {
			return b;
		}

		return fab(this.fromJust());
	}

	this.isNothing = function() {
		if(_data.set == false) { throw Error('Maybe object has not been initialized'); }
		return _data.nothing == true;
	}

	this.isJust = function() {
		if(_data.set == false) throw Error('Maybe object has not been initialized');
		return _data.nothing == false;
	}

	this.fromJust = function() {
		if(_data.set == false) throw Error('Maybe object has not been initialized');
		if(_data.nothing == true) {
			throw Error('fromJust on Nothing')
		}
		return _data.something;
	}

	this.fromMaybe = function(a) {
		if(_data.set == false) throw Error('Maybe object has not been initialized');
		if(this.isNothing()) {
			return a;
		}
		return this.fromJust();
	}

	this.setNothing = function() {
		if(_data.set == true) throw Error('Maybe object has already been initialized');
		_data.something = null;
		_data.nothing = true;
		_data.set = true;
		return this;
	}

	this.setJust = function(data) {
		if(_data.set == true) throw Error('Maybe object has already been initialized');
		_data.something = data;
		_data.nothing = false;
		_data.set = true;
		return this;
	}
}



var Nothing = function() {
	var obj = new Maybe().setNothing();
	this.maybe = obj.maybe;
	this.isNothing = obj.isNothing;
	this.isJust = obj.isJust;
	this.fromJust = obj.fromJust;
	this.fromMaybe = obj.fromMaybe;
}

var Just = function(data) {
	var obj = new Maybe().setJust(data);
	this.maybe = obj.maybe;
	this.isNothing = obj.isNothing;
	this.isJust = obj.isJust;
	this.fromJust = obj.fromJust;
	this.fromMaybe = obj.fromMaybe;
}

module.exports = {
	Maybe : Maybe,
	Nothing : Nothing,
	Just : Just
}
