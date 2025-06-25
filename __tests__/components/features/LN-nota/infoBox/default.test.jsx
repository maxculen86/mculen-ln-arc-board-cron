import React from 'react';
import { render } from '@testing-library/react';
import Context from 'fusion:context';
import InfoBoxFeature from '../../../../../components/features/LN-nota/infoBox/default';
import { VIOLENCE_TAGS } from '../../../../../components/features/LN-nota/infoBox/constants/tags';
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

    it('Should render if path has /deportes in it', () => {
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

    it('Should not render if path does not contain /deportes or /juegos and has no violence-related tags', () => {
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

    it('Should render if article has a violence-related tag', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: {
                    tags: [{ slug: VIOLENCE_TAGS[0] }],
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

    it('Should not call getZocaloProps if article has a violence-related tag', () => {
        jest.spyOn(helper, 'getZocaloProps');

        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: {
                    tags: [{ slug: VIOLENCE_TAGS[1] }],
                    primary_section: { path: '/mundo' }
                }
            }
        }));

        render(
            <InfoBoxFeature
                contextPath="/pf"
                deployment={x => x}
                customFields={baseCustomFields}
            />
        );

        expect(helper.getZocaloProps).not.toHaveBeenCalled();
    });

    it('Should render if customFields has a tagList and override the link', () => {
        const getViolenceTagsSpy = jest.spyOn(
            helper,
            'getViolenceTagsZocaloProps'
        );

        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: {
                    tags: [{ slug: 'not-violent' }],
                    primary_section: { path: '/mundo' }
                }
            }
        }));

        const customFields = {
            tagList: [{ value: 'anything' }],
            link: 'https://custom-link.com'
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
});
