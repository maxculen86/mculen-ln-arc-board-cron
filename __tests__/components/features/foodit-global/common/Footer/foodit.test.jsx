import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterFoodit from '../../../../../../components/features/foodit-global/common/Footer/foodit';

const deployment = deploymentValue => deploymentValue;
describe('Components - Features - foodit-global - Common - FooterFoodit', () => {
    const props = {
        contextPath: '/pf',
        deployment,
        layout: 'Foodit-home',
        siteProperties: {
            layoutsName: {
                Foodit404: 'Foodit404',
                FooditHome: 'Foodit-home'
            }
        }
    };

    beforeEach(() => {
        render(<FooterFoodit {...props} />);
    });
    it('should contain eight links', () => {
        const { length } = screen.getAllByRole('link');
        expect(length).toEqual(9);
    });
    it('should contain five icons', () => {
        const { length } = document.querySelectorAll('.icon');
        expect(length).toEqual(5);
    });
    it('should match snapshot', () => {
        const { container } = render(<FooterFoodit {...props} />);
        expect(container).toMatchSnapshot();
    });
});
