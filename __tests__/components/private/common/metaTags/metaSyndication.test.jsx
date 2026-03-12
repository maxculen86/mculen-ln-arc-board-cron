import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MetaSyndication from '../../../../../components/private/common/syndication';

describe('LN - Common - MetaSyndication', () => {
    it('MetaSyndication nota snapshot', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            outputType: 'default',
            type: 'story',
            subtype: '1',
            syndication: {
                external_distribution: false,
                search: false
            }
        };

        const { container } = render(
            <MetaSyndication
                arcSite={props.arcSite}
                subtype={props.subtype}
                syndication={props.syndication}
                type={props.type}
                outputType={props.outputType}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('Renders only over story templates', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            outputType: 'default',
            type: 'no-story',
            subtype: '1',
            syndication: {
                external_distribution: false,
                search: false
            }
        };

        const { container } = render(
            <MetaSyndication
                arcSite={props.arcSite}
                subtype={props.subtype}
                syndication={props.syndication}
                type={props.type}
                outputType={props.outputType}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('Does not render in recipes template', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            outputType: 'default',
            type: 'story',
            subtype: '7',
            syndication: {
                external_distribution: false,
                search: false
            }
        };

        render(
            <MetaSyndication
                arcSite={props.arcSite}
                subtype={props.subtype}
                syndication={props.syndication}
                type={props.type}
                outputType={props.outputType}
            />
        );

        expect(
            document.head.querySelector('meta[name="robots"]')
        ).not.toHaveAttribute('content', 'noindex, follow');
    });
});
