import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Context from 'fusion:context';
import IconsReferences from '../../../../../../components/private/LN/services/weather/IconsReferences';
import weatherHome from '../../../../../../__mocks__/data/weather/weatherHome.json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
            }
            fetchContent(param) {}
        };
    };
});

jest.mock(
    '../../../../../../components/private/common/staticValidation',
    () => 'mock-static-validation'
);

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

describe('Components - private - services - weather - IconsReferences =>', () => {
    it('Test when id props is invalid ', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                dataService: weatherHome
            }
        }));
        const modHeaderSectionClass = 'mod-headersection  --line';
        const expectedClass = 'content-icon';
        const { container } = render(<IconsReferences />);
        expect(container).toMatchSnapshot();
        expect(
            container.getElementsByClassName(modHeaderSectionClass).length
        ).toBe(1);
        expect(
            container.innerHTML.includes(
                '<h3 class="com-title --l">Referencias del clima</h3>'
            )
        ).toBe(true);
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
        expect(
            container.innerHTML.includes('<div class="icon-references')
        ).toBe(true);
        expect(container.getElementsByClassName('icon-references').length).toBe(
            1
        );
        expect(container.innerHTML.includes('<div class="card-icon')).toBe(
            true
        );
        expect(container.getElementsByClassName('card-icon').length).toBe(12);
        expect(container.innerHTML.includes('<i class="com-icon')).toBe(true);
        expect(container.getElementsByClassName('com-icon').length).toBe(12);
        expect(
            container.innerHTML.includes('<span class="com-text --2xs')
        ).toBe(true);
        expect(container.getElementsByClassName('com-text --2xs').length).toBe(
            12
        );
    });
});
