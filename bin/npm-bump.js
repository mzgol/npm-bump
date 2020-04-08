#!/usr/bin/env node

'use strict';

/* eslint-disable no-process-exit */

const minimist = require('minimist');
const npmBump = require('../lib/cli');

const opts = minimist(process.argv.slice(2), {
    alias: {
        // Configuration
        r: 'remote',
        b: 'branch',
        p: 'prefix',
        t: 'type',

        // Miscellaneous
        h: 'help',
        v: 'version',
    },
    default: {
        remote: 'origin',
        branch: 'master',
    },
});

if (opts.help) {
    console.log(`
USAGE:
    npm-bump release-type [options]

where release-type can be major, minor, patch or a custom name 

Configuration:
    -r, --remote    The remote name to push to, origin by default
    -b, --branch    The branch name to push, master by default
    -p, --prefix    The branch name to push, master by default
    -t, --type      An alternative way to pass the release type (as described above) 

Miscellaneous:
    -h, --help      Display this help
    -v, --version   Display version info
`);
    process.exit(0);
}

if (opts.version) {
    console.log(`npm-bump ${require('../package.json').version}`);
    process.exit(0);
}

try {
    npmBump.custom({
        remote: opts.remote,
        branch: opts.branch,
        prefix: opts.prefix,
    })(opts.type || opts._[0]);
} catch (error) {
    if (error.name === 'UsageError') {
        console.error(error.message);
    } else {
        throw error;
    }
}
