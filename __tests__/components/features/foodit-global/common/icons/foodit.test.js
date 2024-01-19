jest.unmock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite'
);
import React from 'react';
import { render } from '@testing-library/react';
import IconSprite from '../../../../../../components/features/private-global/common/iconSprite/IconSprite';
import '@testing-library/jest-dom';
import Context from 'fusion:context';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('Components - Features - foodit-global - Common - icons', () => {
    beforeAll(() => {
        const contextPath = '/pf';
        const deployment = deploymentValue => deploymentValue;
        const arcSite = 'foodit';
        Context.useAppContext = jest.fn(() => ({
            deployment,
            contextPath,
            arcSite
        }));
    });
    it('should render the correct icon href default', () => {
        const expected =
            '/pf/resources/images/foodit-sprite-default.svg#some-name';
        const { container } = render(<IconSprite name="some-name" />);
        const tag = container.getElementsByTagName('use')[0];
        expect(tag).toHaveAttribute('href', expected);
    });

    it('should render the correct icon href critical', () => {
        const expected =
            '/pf/resources/images/foodit-sprite-critical.svg#some-name';
        const { container } = render(<IconSprite name="some-name" critical />);
        const tag = container.getElementsByTagName('use')[0];
        expect(tag).toHaveAttribute('href', expected);
    });

    it('should match snapshot', () => {
        const { container } = render(<IconSprite name="some-name" critical />);
        expect(container).toMatchSnapshot();
    });
});
