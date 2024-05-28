import React from 'react';
import { render } from '@testing-library/react';
import GooglePublisherTagAcumulado from '../../../../../components/private/common/scriptManager/googlePublisherTagAcumulado';

jest.mock('fusion:context', () => ({
    useAppContext: () => {
        return { contextPath: 'pf', deployment: () => {} };
    }
}));

describe('GooglePublisherTagAcumulado', () => {
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
        const { container } = render(
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
        expect(container.innerHTML).toEqual('');
    });

    it('Builds the json object as expected', () => {
        const { container } = render(
            <GooglePublisherTagAcumulado {...content} />
        );
        expect(container.querySelectorAll('script')).toHaveLength(2);
        expect(container.innerHTML).toMatch('ca_recetas');
        expect(container.innerHTML).toMatch('ca_deportes');
        expect(container.innerHTML).toMatch('ca_futbol');
        expect(container.innerHTML).toMatch('te_deportes-qatar');
        expect(container.innerHTML).toMatch('au_alberto-fernandez');
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
        expect(container.querySelectorAll('script')).toHaveLength(2);
        expect(container.innerHTML).toMatch('ca_deportes');
        expect(container.innerHTML).toMatch('ca_futbol');
    });

    const content3 = {
        globalContent: {}
    };

    it('Builds the json object without ancestors', () => {
        const { container } = render(
            <GooglePublisherTagAcumulado {...content3} />
        );
        expect(container.innerHTML).toBeDefined();
    });
});
