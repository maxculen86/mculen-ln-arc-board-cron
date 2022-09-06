import React from 'react';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';
import '@testing-library/jest-dom';
import PowerUpLiveBlog from '../../../../../../components/private/LN/nota/cuerpo/powerUpLiveBlog';

jest.mock(
    '../../../../../../components/private/common/staticValidation',
    () => 'mock-static-validation'
);
jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
const globalContent = {
    outputType: 'default'
};

const data = {
    embed: {
        config: {
            date: '2022-07-12',
            time: '02:27:14',
            title:
                'Dos combatientes de EE.UU desaparecidos en Ucrania: se teme que los hayan capturado',
            typeList: 'liveblog'
        }
    },
    subtype: 'custom-liveblog'
};
describe('Components - private - LN - nota - cuerpo. Liveblog powerUp test', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent
    }));
    it('Should return the correct render with the given data. Static validator must be visible', () => {
        const { container } = render(<PowerUpLiveBlog data={data} />);

        expect(container).toMatchSnapshot();
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-validation'
            )
        ).toBeVisible();
    });
    it('Should return an empty element if no data is passed', () => {
        const { container } = render(<PowerUpLiveBlog />);
        expect(container).toBeEmptyDOMElement();
    });
    it('Should return an empty element if time or title arent in data', () => {
        const incompleteData = {
            embed: {
                config: {
                    date: '2022-07-12',
                    time: '',
                    title:
                        'Dos combatientes de EE.UU desaparecidos en Ucrania: se teme que los hayan capturado',
                    typeList: 'liveblog'
                }
            }
        };
        const { container } = render(<PowerUpLiveBlog data={incompleteData} />);
        expect(container).toBeEmptyDOMElement();
    });
});
