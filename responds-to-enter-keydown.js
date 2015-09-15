import Ember from 'ember';

var ENTER_CODE = 13;
var listeners = [];

// Calls handler on each View which RespondsToEnterKeydown in LIFO order.
Ember.$(window).on('keydown', this, function (e) {
  if (e.which !== ENTER_CODE) return;
  listeners.some(listener => listener.enterKeydown());
});

export default Ember.Mixin.create({

  // @return {boolean} stopPropagation
  enterKeydown: Ember.$.noop,

  didInsertElement: function () {
    this._super();
    listeners.unshift(this);
  },

  willClearRender: function () {
    this._super();
    listeners = listeners.filter(listener => listener !== this);
  }

});
