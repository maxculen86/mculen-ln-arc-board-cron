import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import ModAutor from '../../../../components/private/common/mod-autor';

describe('ModAutor', () => {
    const props = {
        autor: [
            { name: 'Pepe', link: 'https://lanacion.com.ar' },
            { name: 'Paco', link: 'https://lanacion.com.ar' }
        ],
        foto: null,
        classCondition: '--autor',
        medio: null
    };

    it('If no image must no render author image', () => {
        const { container } = render(<ModAutor {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('With image, and subtype is diferent from storyTelling or fotoAl100 render the author image with fetchPriority high and loading eager', () => {
        const props2 = {
            autor: [{ name: 'Pepe', link: 'https://lanacion.com.ar' }],
            foto:
                'https://resizer.glanacion.com/resizer/V5K_reWbvEbIuJAS7PQaidnMVp8=/80x0/filters:format(webp):quality(80)/s3.amazonaws.com/arc-authors/lanacionar/2281458.png',
            classCondition: '--autor',
            medio: null,
            subtype: '1'
        };
        const { container } = render(<ModAutor {...props2} />);
        const img = container.getElementsByTagName('img');
        expect(container).toMatchSnapshot();
        expect(img[0].getAttribute('loading')).toBe('eager');
        expect(img[0].getAttribute('fetchPriority')).toBe('high');
    });
    it('If its storyTelling or fotoAl100 render the author image with fetchPriority low and loading low', () => {
        const props3 = {
            autor: [{ name: 'Pepe', link: 'https://lanacion.com.ar' }],
            foto:
                'https://resizer.glanacion.com/resizer/V5K_reWbvEbIuJAS7PQaidnMVp8=/80x0/filters:format(webp):quality(80)/s3.amazonaws.com/arc-authors/lanacionar/2281458.png',
            classCondition: '--autor',
            medio: null,
            subtype: '4'
        };
        const { container } = render(<ModAutor {...props3} />);
        const img = container.getElementsByTagName('img');
        expect(container).toMatchSnapshot();
        expect(img[0].getAttribute('loading')).toBe('lazy');
        expect(img[0].getAttribute('fetchPriority')).toBe('low');
    });
});
