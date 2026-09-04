import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getIconSources,
  getReadableIconUrl,
  isReadableIconProxy,
  shouldUseDarkIconBackground,
} from '../src/icon-tone.js';

const sampleSize = 8;

function makePixels(background = [0, 0, 0, 0], inset = null) {
  const pixels = new Uint8ClampedArray(sampleSize * sampleSize * 4);
  for (let y = 0; y < sampleSize; y += 1) {
    for (let x = 0; x < sampleSize; x += 1) {
      const color = inset && x >= 3 && x <= 4 && y >= 3 && y <= 4 ? inset : background;
      pixels.set(color, (y * sampleSize + x) * 4);
    }
  }
  return pixels;
}

test('uses a dark background for a white icon on transparency', () => {
  assert.equal(shouldUseDarkIconBackground(makePixels([255, 255, 255, 0], [255, 255, 255, 255]), sampleSize), true);
});

test('keeps a light background for a dark icon', () => {
  assert.equal(shouldUseDarkIconBackground(makePixels([0, 0, 0, 0], [20, 24, 22, 255]), sampleSize), false);
});

test('uses a dark background for a pale colored icon', () => {
  assert.equal(shouldUseDarkIconBackground(makePixels([0, 0, 0, 0], [205, 244, 247, 255]), sampleSize), true);
});

test('does not mistake a white canvas with a dark mark for a white icon', () => {
  assert.equal(shouldUseDarkIconBackground(makePixels([255, 255, 255, 255], [20, 24, 22, 255]), sampleSize), false);
});

test('keeps the default background when an image has no visible pixels', () => {
  assert.equal(shouldUseDarkIconBackground(makePixels(), sampleSize), false);
});

test('does not proxy URLs that rely on query parameters or authentication', () => {
  const queryUrl = 'https://example.com/icon?project=a';
  const authenticatedUrl = 'https://token@example.com/icon.png';
  assert.equal(getReadableIconUrl(queryUrl, 'http://localhost:5173'), queryUrl);
  assert.equal(getReadableIconUrl(authenticatedUrl, 'http://localhost:5173'), authenticatedUrl);
});

test('orders proxied and original icon fallbacks without duplicates', () => {
  const primary = 'https://icons.example.com/app.png';
  const fallback = 'https://example.com/favicon.ico';
  const sources = getIconSources(primary, fallback, 'http://localhost:5173');
  assert.equal(sources.length, 4);
  assert.equal(isReadableIconProxy(sources[0]), true);
  assert.equal(sources[1], primary);
  assert.equal(isReadableIconProxy(sources[2]), true);
  assert.equal(sources[3], fallback);
});

test('recognizes only the configured proxy hostname', () => {
  assert.equal(isReadableIconProxy('https://images.weserv.nl/?url=example.com'), true);
  assert.equal(isReadableIconProxy('https://example.com/images.weserv.nl/icon.png'), false);
});
