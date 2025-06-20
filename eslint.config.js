import ashNazg from 'eslint-config-ash-nazg';

const rules = {
    '@stylistic/indent': ['error', 4, {SwitchCase: 0}],
    '@stylistic/dot-location': ['error', 'property'],
    'consistent-this': ['error', 'me'],
    // We use `instanceof` otherwise prohibited by `eslint-config-ash-nazg`,
    //  with `Symbol.hasInstance`
    'no-restricted-syntax': 0,

    // Disable until find time to address
    '@brettz9/no-use-ignored-vars': 0,
    '@stylistic/max-len': 0,
    '@stylistic/brace-style': 0,
    'unicorn/prefer-top-level-await': 0,
    'default-case': 0,
    'no-console': 0,
    'no-shadow': 0,
    'no-sync': 0,
    'prefer-named-capture-group': 0,

    'n/prefer-promises/fs': 0,
    'promise/prefer-await-to-callbacks': 0,
    'promise/prefer-await-to-then': 0,
    'unicorn/no-unsafe-regex': 0,
    'unicorn/no-this-assignment': 0,
    'unicorn/prefer-spread': 0,

    'jsdoc/require-throws': 'error',
    'jsdoc/require-returns': ['error', {
        forceRequireReturn: true,
        forceReturnsWithAsync: true
    }],

    'jsdoc/require-jsdoc': ['warn', {
        contexts: [
            'Program > VariableDeclaration > ' +
            'Program > VariableDeclaration > ' +
            'VariableDeclarator > ArrowFunctionExpression',
            'VariableDeclarator > FunctionExpression',
            'ExportNamedDeclaration > VariableDeclaration > ' +
            'VariableDeclarator > ArrowFunctionExpression',
            'ExportNamedDeclaration > VariableDeclaration > ' +
            'VariableDeclarator > FunctionExpression',
            'ExportDefaultDeclaration > ArrowFunctionExpression',
            'ExportDefaultDeclaration > FunctionExpression',

            'Program > ExpressionStatement > ' +
            'AssignmentExpression > FunctionExpression',

            'ClassDeclaration',
            'ClassExpression',
            'FunctionDeclaration', // Default is true
            'MethodDefinition'
        ]
    }]
};

export default [
    {
        ignores: [
            'dist',
            'src/unicode-regex.js',
            'examples',
            'ignore',
            'coverage',
            '.nyc_output',
            'tests-polyfill',
            'web-platform-tests',
            'test-support/**/*.js',
            '!test-support/webworker/*.js',
            '!test-support/*.js',
            'test-support/latest-erring-bundled.js'
        ]
    },
    // We should do polyglot (default) but do `browser` to catch escompat issues,
    //  but this also adds more globals
    // ...ashNazg(['sauron', 'browser']),
    ...ashNazg(['sauron']),
    {
        settings: {
            polyfills: [
                'Array.filter',
                'Array.isArray',
                'Array.every',
                'Array.forEach',
                'Array.includes',
                'Array.map',
                'Array.reduce',
                'ArrayBuffer',
                'console',
                'document.body',
                'document.head',
                'document.querySelector',
                'document.querySelectorAll',
                'Error',
                'IDBKeyRange',
                'indexedDB',
                'Intl',
                'JSON',
                'location.origin',
                'location.search',
                'Number.isFinite',
                'Number.isInteger',
                'Number.isNaN',
                'Number.parseFloat',
                'Number.parseInt',
                'Object.create',
                'Object.defineProperty',
                'Object.defineProperties',
                'Object.getOwnPropertyDescriptor',
                'Object.entries',
                'Object.hasOwn',
                'Object.keys',
                'Object.setPrototypeOf',
                'Object.values',
                'Promise',
                'Set',
                'String.fromCodePoint',
                'String.padStart',
                'String.raw',
                'String.repeat',
                'Symbol.hasInstance',
                'Symbol.iterator',
                'Symbol.toStringTag',
                'Uint8Array',
                'URL'
            ]
        },
        rules: {
            // Let Babel handle
            'escompat/no-object-rest-spread': 'off',
            'escompat/no-exponentiation-operator': 'off',
            'escompat/no-top-level-await': 'off'
        }
    },
    ...ashNazg(['sauron', 'node']).map((cfg) => {
        return {
            ...cfg,
            files: ['src/node*']
        };
    }),
    // Our Markdown rules (and used for JSDoc examples as well, by way of
    //   our use of `matchingFileName` in conjunction with
    //   `jsdoc/check-examples` within `ash-nazg`)
    {
        files: ['**/*.md/*.js'],
        rules: {
            'unicorn/prefer-global-this': 'off', // Older browsers
            'import/no-commonjs': 'off',
            'eol-last': ['off'],
            'no-console': ['off'],
            'no-undef': ['off'],
            'no-unused-vars': ['warn', {varsIgnorePattern: 'setGlobalVars'}],
            'padded-blocks': ['off'],
            'import/unambiguous': ['off'],
            'import/no-unresolved': ['off'],
            'n/no-missing-require': ['off'],
            'n/no-missing-import': ['off'],
            'n/no-unsupported-features/es-syntax': 'off'
        }
    },
    // @core-js-bundle can provide
    {
        files: ['src/**'],
        rules: {
            'n/no-unsupported-features/es-builtins': 'off',
            'n/no-unsupported-features/es-syntax': 'off'
        }
    },
    ...ashNazg(['sauron', 'browser']).map((cfg) => {
        return {
            ...cfg,
            files: [
                'src/browser*'
            ]
        };
    }),
    // May need to support a lower browser version for test/development files, but
    //   not a lower Node version
    ...ashNazg(['sauron', 'node']).map((cfg) => {
        return {
            ...cfg,
            files: ['test-support/**', 'tests-mocha/**']
        };
    }),
    {
        files: ['test-support/**', 'tests-mocha/**'],
        settings: {
            polyfills: [
                'ErrorEvent',
                'navigator'
            ]
        },
        rules: {
            // See about reenabling
            'vars-on-top': 0,

            strict: 0, // ['error', 'function'],
            'no-process-exit': 0,
            // We want console in tests!
            'no-console': 'off',
            'import/unambiguous': 'off',
            'object-shorthand': ['off'],
            'prefer-destructuring': ['off'],
            'require-unicode-regexp': ['off'],
            'n/no-unsupported-features/es-syntax': 'off',
            'n/no-unsupported-features/es-builtins': ['off'],
            'n/no-unsupported-features/node-builtins': ['off'],
            'unicorn/prefer-add-event-listener': ['off'],
            'unicorn/no-instanceof-array': ['off'],
            ...rules
        }
    },
    {
        rules
    }
];
