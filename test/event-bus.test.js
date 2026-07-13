import assert from 'node:assert/strict';
import test from 'node:test';
import { EventBus } from '../assets/js/core/event-bus.js';

test('event bus delivers payloads and supports unsubscribe', () => {
  const events = new EventBus();
  const received = [];
  const unsubscribe = events.on('lesson', payload => received.push(payload));
  events.emit('lesson', 1);
  unsubscribe();
  events.emit('lesson', 2);
  assert.deepEqual(received, [1]);
});

test('event bus ignores events without listeners', () => {
  const events = new EventBus();
  assert.doesNotThrow(() => events.emit('missing', { value: 1 }));
});

test('one failing listener does not prevent the next listener', () => {
  const originalError = console.error;
  const errors = [];
  console.error = (...args) => errors.push(args);
  try {
    const events = new EventBus();
    let reachedSecondListener = false;
    events.on('save', () => { throw new Error('failed'); });
    events.on('save', () => { reachedSecondListener = true; });
    events.emit('save');
    assert.equal(reachedSecondListener, true);
    assert.equal(errors.length, 1);
  } finally {
    console.error = originalError;
  }
});
