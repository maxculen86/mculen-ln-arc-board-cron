import React from 'react';
import { render } from '@testing-library/react';
import GooglePublisherTagAcumulado from '../../../../../components/private/common/scriptManager/googlePublisherTagAcumulado';

jest.mock('fusion:context', () => ({
    useAppContext: () => {
        return { contextPath: 'pf', deployment: () => {} };
    }
}));

describe('GooglePublisherTagAcumulado', () => {
    afterEach(() => {
        document.head
            .querySelectorAll(
                'script[src*="gpt.js"], script#googlePublisherTag-metadata'
            )
            .forEach(s => s.remove());
    });

    const content = {
        globalContent: {
            Payload: {
                items: [
                    {
                        name: 'deportes',
                        organization: 'sandbox.lanacionar',
                        path: '/',
                        slug: 'deportes-qatar',
                        usage_counter: 0
                    }
                ],
                count: 1
            },
            slug: 'alberto-fernandez',
            name: 'recetas',
            ancestors: {
                default: ['/', '/deportes', '/deportes/futbol']
            },
            parent: {
                default: '/deportes/futbol'
            }
        }
    };

    it('Returns null when on stories', () => {
        render(
            <GooglePublisherTagAcumulado
                {...{
                    ...content,
                    ...{
                        globalContent: {
                            ...content.globalContent,
                            type: 'story'
                        }
                    }
                }}
            />
        );
        const googleScript = document.head.querySelector(
            '#googlePublisherTag-metadata'
        );
        expect(googleScript).toBeNull();
    });

    it('Builds the json object as expected', () => {
        const { container } = render(
            <GooglePublisherTagAcumulado {...content} />
        );

        const gptScript = document.head.querySelector('script[src*="gpt.js"]');
        const metadataScript = container.querySelector(
            '#googlePublisherTag-metadata'
        );

        expect(gptScript).toBeInTheDocument();
        expect(metadataScript).toBeInTheDocument();

        const containerHTML = container.innerHTML;
        expect(containerHTML).toMatch('ca_recetas');
        expect(containerHTML).toMatch('ca_deportes');
        expect(containerHTML).toMatch('ca_futbol');
        expect(containerHTML).toMatch('te_deportes-qatar');
        expect(containerHTML).toMatch('au_alberto-fernandez');
    });

    const content2 = {
        globalContent: {
            name: 'futbol',
            parent: {
                default: '/deportes'
            }
        }
    };

    it('Builds the json object without ancestors', () => {
        const { container } = render(
            <GooglePublisherTagAcumulado {...content2} />
        );

        const metadataScript = container.querySelector(
            '#googlePublisherTag-metadata'
        );
        expect(metadataScript).toBeInTheDocument();
        const containerHTML = container.innerHTML;
        expect(containerHTML).toMatch('ca_deportes');
        expect(containerHTML).toMatch('ca_futbol');
    });

    const content3 = {
        globalContent: {}
    };

    it('Builds the json object without ancestors', () => {
        render(<GooglePublisherTagAcumulado {...content3} />);
        expect(document.head.innerHTML).toBeDefined();
    });
});
