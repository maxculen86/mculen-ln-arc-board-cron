import React from 'react';
import Share from '../../../../../../components/features/LN-nota/share/amp';
import { render } from '@testing-library/react';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

Context.useAppContext = jest.fn(() => ({
    outputType: 'amp',
    arcSite: 'la-nacion-ar',
    globalContent: {
        _id: 'L47IICAOMVFW5MV343TJIHS4RY',
        headlines: {
            basic: 'title',
            mobile: 'mobileTitle'
        },
        comments: {
            display_comments: true
        },
        first_publish_date: 'firstPublishDate',
        subtype: ''
    },
    requestUri: '/economia/dolar-hoy/'
}));

jest.mock('fusion:properties', () => () => ({
    default: props => {
        const mockAvailableProps = { arcSite: 'la-nacion-ar' };

        return props.children(mockAvailableProps);
    }
}));

describe('Share - AMP', () => {
    test('Matches snapshot AMP - Should show 4 tags amp-social-share', () => {
        const { container } = render(<Share />);

        expect(
            document.querySelectorAll('amp-social-share').length
        ).toStrictEqual(4);
        expect(container).toMatchSnapshot();
    });
});
