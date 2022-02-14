import React from 'react';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import { render, mount, shallow } from 'enzyme';
import AnexoFeature from '../../../../../components/features/LN-common/anexo/default';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
Context.useAppContext = jest.fn(() => ({
    isAdmin: false
}));
jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('features - LN-common - anexo - default', () => {
    describe('With HTML anexo props', () => {
        const propsHtml = {
            collection: 'features',
            type: 'LN-common/anexo',
            id: 'f0fzNPnpdFcOa8T',
            name: null,
            customFields: {
                html: `<p>Mock HTML anexo</p>`,
                hideByHtml: false
            }
        };

        it('Should render HTML anexo correctly', () => {
            const component = mount(<AnexoFeature {...propsHtml} />);
            expect(component.html()).not.toBeNull();
            expect(component.find('div').hasClass('com-anexo')).toBeTruthy();
            expect(component.html()).toContain(propsHtml.customFields.html);
        });
        it('Should match HTML anexo snapshot', () => {
            const component = render(<AnexoFeature {...propsHtml} />);
            expect(component).toMatchSnapshot();
        });
        it('With hideByHtml true - Should return null', () => {
            propsHtml.customFields.hideByHtml = true;
            const component = render(<AnexoFeature {...propsHtml} />);
            expect(component.html()).toBeNull();
        });
    });
    describe('With anexo URL props', () => {
        const propsUrl = {
            collection: 'features',
            type: 'LN-common/anexo',
            id: 'f0f0raOK8mKx1sc',
            name: null,
            customFields: {
                url:
                    'https://especialess3.lanacion.com.ar/21/03/anexo-home-vacunas-test/',
                height: 300,
                hideByUrl: false,
                hideByHtml: true
            }
        };
        it('Should render iframe correctly', () => {
            const component = mount(<AnexoFeature {...propsUrl} />);
            expect(component.html()).not.toBeNull();
            expect(component.find('iframe')).toHaveLength(1);
            expect(component.find('iframe').props()['data-src']).toBe(
                propsUrl.customFields.url
            );
            expect(component.find('iframe').props().src).toBe(undefined);
            expect(
                component.find('div').hasClass('com-anexo skeleton-box')
            ).toBeTruthy();
        });
        it('Should match URL anexo snapshot', () => {
            const component = render(<AnexoFeature {...propsUrl} />);
            expect(component).toMatchSnapshot();
        });
        it('Should set src when isAdmin (PB) and NOT data-src', () => {
            Context.useAppContext = jest.fn(() => ({
                isAdmin: true
            }));
            const component = mount(<AnexoFeature {...propsUrl} />);
            expect(component.html()).not.toBeNull();
            expect(component.find('iframe')).toHaveLength(1);
            expect(component.find('iframe').props()['data-src']).toBe(
                undefined
            );
            expect(component.find('iframe').props().src).toBe(
                propsUrl.customFields.url
            );
        });

        it('With hideByUrl true - Should return null', () => {
            propsUrl.customFields.hideByUrl = true;
            const component = render(<AnexoFeature {...propsUrl} />);
            expect(component.html()).toBeNull();
        });
    });
    describe('Without right props', () => {
        it('Should return ErrorMessage', () => {
            const component = render(<AnexoFeature />);
            expect(component.html()).toContain(
                'Se requiere agregue la URL o HTML del anexo'
            );
        });
    });
});
