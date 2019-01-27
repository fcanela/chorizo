# Chorizo

Chorizo is an opinionated contextual logger

## Usage

```
const logger = require('chorizo').for('test-example');

logger.fatal('An unkown exception ocurred.');
logger.error('Something controlled happened.');
logger.warn('This was unexpected.');
logger.info('Everything ok. Just reporting.');
logger.debug('Useful when everything is on fire');
```

`info`, `warn` and `debug` outputs to `stdout`. `fatal` and `error` accepts a string or error object and outputs to `stderr`.
