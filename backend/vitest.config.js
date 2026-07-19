"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        environment: 'node',
        globals: true,
        // Only pick up TypeScript test files. This is critical: it prevents
        // vitest from loading the compiled .js files that sit in src/ alongside
        // the .ts source, which would create duplicate class instances and break
        // `instanceof` checks.
        include: ['src/**/*.test.ts'],
        exclude: ['**/node_modules/**', '**/dist/**'],
        setupFiles: ['./src/test/setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.ts'],
            exclude: ['src/**/*.test.ts', 'src/**/*.d.ts', 'src/index.ts'],
        },
    },
});
//# sourceMappingURL=vitest.config.js.map