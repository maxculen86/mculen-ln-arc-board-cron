import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ModAutor from '../../../../components/private/common/mod-autor';

describe('ModAutor', () => {
    const props = {
        autor: [
            { name: 'Pepe', link: 'https://lanacion.com.ar' },
            { name: 'Paco', link: 'https://lanacion.com.ar' }
        ],
        foto: null,
        classCondition: '--autor',
        medio: null,
        amp: false
    };

    it('If no image must no render author image', () => {
        const { container } = render(<ModAutor {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('With image render the author image with fetchPriority high and loading eager', () => {
        const props2 = {
            autor: [{ name: 'Pepe', link: 'https://lanacion.com.ar' }],
            foto:
                'https://resizer.glanacion.com/resizer/V5K_reWbvEbIuJAS7PQaidnMVp8=/80x0/filters:format(webp):quality(80)/s3.amazonaws.com/arc-authors/lanacionar/2281458.png',
            classCondition: '--autor',
            medio: null,
            amp: false
        };
        const { container } = render(<ModAutor {...props2} />);
        const img = container.getElementsByTagName('img');
        expect(container).toMatchSnapshot();
        expect(img[0].getAttribute('loading')).toBe('eager');
        expect(img[0].getAttribute('fetchPriority')).toBe('high');
    });
});
