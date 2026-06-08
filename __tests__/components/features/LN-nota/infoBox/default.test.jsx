import React from 'react';
import { render } from '@testing-library/react';
import Context from 'fusion:context';
import InfoBoxFeature from '../../../../../components/features/LN-nota/infoBox/default';
import * as helper from '../../../../../components/features/LN-nota/infoBox/helper';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('InfoBoxFeature', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const baseCustomFields = {
        tagList: [],
        link: ''
    };

    it('Should render if primary_section path has /deportes', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: {
                    tags: [],
                    primary_section: { path: '/deportes' }
                }
            }
        }));

        const { container } = render(
            <InfoBoxFeature
                contextPath="/pf"
                deployment={x => x}
                customFields={baseCustomFields}
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('Should not render if tag slugs do not match tagList and no valid path', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: {
                    tags: [{ slug: 'politica' }],
                    primary_section: { path: '/mundo' }
                }
            }
        }));

        const { container } = render(
            <InfoBoxFeature
                contextPath="/pf"
                deployment={x => x}
                customFields={baseCustomFields}
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('Should render if any tag slug matches tagList', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: {
                    tags: [{ slug: 'violencia-de-genero-tid47009' }],
                    primary_section: { path: '/mundo' }
                }
            }
        }));

        const customFields = {
            'tagList-Violencia-de-genero': ['violencia-de-genero-tid47009'],
            'link-Violencia-de-genero': ''
        };

        const { container } = render(
            <InfoBoxFeature
                contextPath="/pf"
                deployment={x => x}
                customFields={customFields}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('Should not call getZocaloProps if tagList matches tag slug', () => {
        jest.spyOn(helper, 'getZocaloProps');

        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: {
                    tags: [{ slug: 'seguridad' }],
                    primary_section: { path: '/mundo' }
                }
            }
        }));

        const customFields = {
            'tagList-Abuso': ['seguridad'],
            'link-Abuso': ''
        };

        render(
            <InfoBoxFeature
                contextPath="/pf"
                deployment={x => x}
                customFields={customFields}
            />
        );

        expect(helper.getZocaloProps).not.toHaveBeenCalled();
    });

    it('Should override the link if tagList matches tag slug and link is present', () => {
        const getViolenceTagsSpy = jest.spyOn(
            helper,
            'getViolenceTagsZocaloProps'
        );

        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: {
                    tags: [{ slug: 'salud' }],
                    primary_section: { path: '/mundo' }
                }
            }
        }));

        const customFields = {
            'tagList-Suicidio': ['salud'],
            'link-Suicidio': 'https://custom-link.com'
        };

        const { container } = render(
            <InfoBoxFeature
                contextPath="/pf"
                deployment={x => x}
                customFields={customFields}
            />
        );

        expect(container).toMatchSnapshot();
        expect(getViolenceTagsSpy).toHaveBeenCalled();
    });

    it('Should render video component when zocalo config contains media with video type', () => {
        Context.useAppContext = jest.fn(() => ({
            contextPath: '/pf',
            deployment: x => x,
            globalContent: {
                taxonomy: {
                    tags: [],
                    primary_section: { path: '/juegos' }
                }
            }
        }));

        const { container } = render(
            <InfoBoxFeature
                contextPath="/pf"
                deployment={x => x}
                customFields={{}}
            />
        );

        const videoElement = container.querySelector('video');
        expect(videoElement).toBeInTheDocument();
        const sourceElement = videoElement.querySelector('source');
        expect(sourceElement).toHaveAttribute(
            'src',
            'https://cdn.jwplayer.com/videos/7HwyZ6xk.mp4'
        );
    });

    it('Should not render video component when media type is invalid', () => {
        Context.useAppContext = jest.fn(() => ({
            contextPath: '/pf',
            deployment: x => x,
            globalContent: {
                taxonomy: {
                    tags: [],
                    primary_section: { path: '/recetas' }
                }
            }
        }));

        const { container } = render(
            <InfoBoxFeature
                contextPath="/pf"
                deployment={x => x}
                customFields={{}}
            />
        );

        // recetas config (foodit) doesn't have media property, so no video should render
        const videoElement = container.querySelector('video');
        expect(videoElement).not.toBeInTheDocument();
    });
});
