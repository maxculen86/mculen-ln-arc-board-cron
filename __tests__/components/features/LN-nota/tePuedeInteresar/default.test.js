import React from 'react';
import { render, screen } from '@testing-library/react';
import TePuedeInteresar from '../../../../../components/features/LN-nota/tePuedeInteresar/default';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import liftigniterResponse from '../../../../../__mocks__/data/tePuedeInteresar/liftigniterResponse.json';

const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
    value: {
        getRandomValues: arr => crypto.randomBytes(arr.length)
    }
});

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

Context.useAppContext = jest.fn(() => ({
    globalContent: {},
    requestUri: ''
}));

const props = {
    customFields: {},
    outputType: 'default',
    siteProperties: {}
};

describe('Tests when the section may interest you is visible.', () => {
    global.window.$p = jest.fn();

    let component;

    beforeEach(() => {
        const setIsReady = jest.fn().mockImplementation(x => x);
        React.useState = jest.fn().mockReturnValue([true, setIsReady]);
        useContent.mockImplementation(() => liftigniterResponse);
        component = render(<TePuedeInteresar {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
        component = null;
    });

    it('Matche Snapshot with the section visible', () => {
        const { container } = component;
        expect(container).toMatchSnapshot();
    });

    it('Should render all articles', () => {
        expect(component).toBeDefined();
        expect(screen.getAllByRole('article')).toHaveLength(2);
    });

    it('It should contain the header "You may be interested" ', () => {
        expect(screen.getByText('Te puede interesar')).toBeDefined();
    });

    it('should call the tracking function of liftigniter. ', () => {
        expect(window.$p).toHaveBeenCalled();
    });
});

describe('Tests when the section may interest you is not visible.', () => {
    useContent.mockImplementation(() => undefined);
    const { container } = render(<TePuedeInteresar {...props} />);

    it('should return a empty div', () => {
        expect(container).toMatchInlineSnapshot(`<div />`);
    });
});
