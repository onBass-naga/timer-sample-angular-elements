#!/bin/sh
ng build timer --prod --output-hashing=none && cat \
  dist/timer/runtime.js \
  dist/timer/polyfills.js \
  dist/timer/scripts.js \
  dist/timer/main.js \
  > preview2/timer.js
