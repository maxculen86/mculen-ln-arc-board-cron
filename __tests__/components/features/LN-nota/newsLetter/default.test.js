import React from 'react';
import { useAppContext } from 'fusion:context';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsLetters from '../../../../../components/features/LN-nota/newsletter/default.jsx';

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../components/common/LazyLoad/LazyLoad', () => {
    return function LazyLoad({ children }) {
        return <>{children}</>;
    };
});

global.fetch = jest.fn();
fetch.mockResolvedValue({
    ok: true,
    status: 200,
    headers: {
        get: jest.fn()
    }
});

global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
};

global.IntersectionObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
    unobserve(element) {}
};
const props = {
    section: 'economia',
    version: 3,
    site: 'all',
    userIdToken: 'userId',
    userAccessToken: 'userAccessToken',
    useTestEnvironment: 'qa',
    onSubscription: jest.fn()
};
describe('components - features - LN-Nota - newsLetters', () => {
    useAppContext.mockReturnValue({
        globalContent: {}
    });
    test('Render and snapshot Test', async () => {
        const { container } = render(<NewsLetters {...props} />);
        expect(container).toMatchSnapshot();
    });
});
