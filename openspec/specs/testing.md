# Testing Patterns - Jest

## Test Structure

### Location
- **Content sources:** `__tests__/content/sources/{name}.test.js`
- **Components:** `{componentDir}/__tests__/{name}.test.js` or `{componentDir}/{name}.test.js`
- **Hooks:** `{componentDir}/hooks/__tests__/{hookName}.test.js`
- **Utils:** `{utilDir}/__tests__/{name}.test.js`

### File Naming
- Pattern: `{ComponentName}.test.js` or `{functionName}.test.js`
- Use `.test.js` extension (not `.spec.js`)

## Running Tests

```bash
npm run test              # Run all tests with coverage
npm run test -- --watch   # Watch mode
npm run test -- MyComponent.test.js  # Single file
```

**Coverage Requirements:**
- Run automatically with `npm run test`
- Reports in `coverage/` directory
- LCOV report: `coverage/lcov.info`

## Global Setup (`setupTests.js`)

Already configured:
```javascript
// Mocked globally
- IconSprite component
- DS Common Icon
- ResizeObserver
- TextEncoder/TextDecoder
```

## Content Source Tests

### Standard Pattern

```javascript
import logger from '../../../components/private/common/utils/logger';
import fetchModule from '../../../content/sources/{name}Source';
import transformData from '../../../content/sources/utils/{name}Source/_helper';

// Mock dependencies
jest.mock('../../../components/private/common/utils/logger');
jest.mock('../../../content/sources/utils/{name}Source/_helper');
jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.example.com',
    ARC_ACCESS_TOKEN: 'test-token'
}));

describe('{name}Source', () => {
    const originalFetch = global.fetch;
    const { fetch } = fetchModule;

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    afterAll(() => {
        global.fetch = originalFetch;
    });

    it('should fetch data successfully', async () => {
        const mockResponse = { data: 'test' };
        const mockQuery = { 'arc-site': 'ln', id: '123' };

        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
            ok: true
        });

        transformData.mockResolvedValue(mockResponse);

        const result = await fetch(mockQuery);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('api.example.com'),
            expect.objectContaining({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer test-token'
                },
                signal: expect.any(Object) // AbortController signal
            })
        );
        expect(result).toEqual(mockResponse);
    });

    it('should handle errors gracefully', async () => {
        const mockQuery = { 'arc-site': 'ln', id: '123' };
        const mockError = new Error('Network error');

        global.fetch.mockRejectedValue(mockError);

        const result = await fetch(mockQuery);

        expect(logger.push).toHaveBeenCalledWith(
            mockError,
            expect.objectContaining({
                source: expect.stringContaining('content/sources')
            })
        );
        expect(result).toEqual({});
    });

    it('should handle timeout (AbortError)', async () => {
        const mockQuery = { 'arc-site': 'ln' };
        const abortError = new Error('Timeout');
        abortError.name = 'AbortError';

        global.fetch.mockRejectedValue(abortError);

        const result = await fetch(mockQuery);

        expect(logger.push).toHaveBeenCalledWith(
            'Request timed out',
            expect.any(Object),
            'ln'
        );
        expect(result).toEqual({});
    });
});
```

### Testing Transform Functions

```javascript
describe('transform helper', () => {
    it('should filter unpublished items', async () => {
        const mockData = {
            basic: [
                { id: '1', revision: { published: true } },
                { id: '2', revision: { published: false } },
                { id: '3', revision: { published: true } }
            ]
        };

        const result = await transform(mockData, { limit: 10 });

        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('1');
        expect(result[1].id).toBe('3');
    });

    it('should apply limit', async () => {
        const mockData = {
            basic: Array(10).fill(null).map((_, i) => ({
                id: `${i}`,
                revision: { published: true }
            }))
        };

        const result = await transform(mockData, { limit: 3 });

        expect(result).toHaveLength(3);
    });
});
```

## Component Tests

### React Component Pattern

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyComponent from '../index';

describe('MyComponent', () => {
    it('should render correctly', () => {
        const props = {
            title: 'Test Title',
            content: 'Test Content'
        };

        render(<MyComponent {...props} />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should handle missing props', () => {
        render(<MyComponent />);

        expect(screen.queryByText('Test')).not.toBeInTheDocument();
    });
});
```

### Fusion Consumer Component

```javascript
import Consumer from 'fusion:consumer';

// Mock fusion:consumer
jest.mock('fusion:consumer', () => jest.fn(component => component));

describe('MyFusionComponent', () => {
    it('should work with Consumer HOC', () => {
        const props = {
            customFields: { config: 'value' },
            content: { data: 'test' }
        };

        render(<MyComponent {...props} />);

        expect(Consumer).toHaveBeenCalled();
    });
});
```

## Hook Tests

```javascript
import { renderHook, act } from '@testing-library/react';
import useMyHook from '../useMyHook';

describe('useMyHook', () => {
    it('should return initial state', () => {
        const { result } = renderHook(() => useMyHook());

        expect(result.current.value).toBe(initialValue);
    });

    it('should update state on action', () => {
        const { result } = renderHook(() => useMyHook());

        act(() => {
            result.current.updateValue('new value');
        });

        expect(result.current.value).toBe('new value');
    });
});
```

## Common Mocks

### Fusion Environment
```javascript
jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.test.com',
    ARC_ACCESS_TOKEN: 'test-token',
    FUSION_ENV: 'test'
}));
```

### Logger
```javascript
jest.mock('../../utils/logger', () => ({
    push: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
}));
```

### Global fetch
```javascript
beforeEach(() => {
    global.fetch = jest.fn();
});

afterAll(() => {
    global.fetch = originalFetch;
});

// Mock successful response
global.fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ data: 'test' })
});

// Mock error
global.fetch.mockRejectedValue(new Error('Network error'));
```

### Image Utils
```javascript
jest.mock('../../../utils/image/resizer/addResizerUrls', () => ({
    addResizedUrls: jest.fn(item => item)
}));

jest.mock('../utils/signingServiceSource/getImagesAuth', () => ({
    getAllImagesAuth: jest.fn(async item => item)
}));
```

### Common Utils
```javascript
jest.mock('../../../utils/get', () =>
    jest.fn((obj, path, defaultValue) => {
        // Simple path getter implementation
        return obj?.[path] ?? defaultValue;
    })
);
```

## Test Coverage Best Practices

### Must Cover
1. ✅ Happy path (successful execution)
2. ✅ Error handling
3. ✅ Edge cases (empty data, null, undefined)
4. ✅ Timeout scenarios (for async operations)
5. ✅ Authorization (with/without token)

### Should Cover
- Different arc-site values (ln, foodit)
- Pagination (limit, offset)
- Filtering logic (published/unpublished)
- Image processing
- Data transformation

### Don't Over-Test
- External library internals
- CSS styling (unless critical)
- Simple getters/setters

## Debugging Tests

```bash
# Debug single test
node --inspect-brk node_modules/.bin/jest --runInBand MyComponent.test.js

# Verbose output
npm run test -- --verbose

# Show console logs
npm run test -- --silent=false
```

## CI/CD Integration

Tests run on:
- Pre-commit (via husky)
- Azure Pipeline (see `azure-pipeline.yml`)
- Coverage report sent to SonarQube

**Coverage thresholds:** Check `package.json` jest config

## Quick Reference

```javascript
// Common matchers
expect(value).toBe(expected)                    // Strict equality
expect(value).toEqual(expected)                 // Deep equality
expect(value).toHaveLength(number)              // Array/string length
expect(element).toBeInTheDocument()             // DOM presence
expect(fn).toHaveBeenCalled()                   // Function called
expect(fn).toHaveBeenCalledWith(args)           // Function called with
expect(async).resolves.toBe(value)              // Promise resolves
expect(async).rejects.toThrow(error)            // Promise rejects

// Async testing
await waitFor(() => expect(element).toBeInTheDocument())
await act(async () => { /* state updates */ })
```
