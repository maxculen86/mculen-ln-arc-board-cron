import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import { render } from '@testing-library/react';
import ScriptManager, {
    ERRORS
} from '../../../../../components/private/common/scriptManager';
import renderables from '../../../../../__mocks__/data/renderables/data1';
import {
    getScriptsToLoad,
    shouldExcludeByLayout,
    VWO_ALLOWED_SECTIONS
} from '../../../../../components/private/LN/common/utils/scriptsHelper';

describe('ScriptManager', () => {
    it('should be a function', () => {
        expect(typeof ScriptManager).toEqual('function');
    });

    it('should require an array with at least one valid component', () => {
        expect(() => ScriptManager()).toThrowError(ERRORS.ARGUMENTS_COMPONENTS);
        expect(() => ScriptManager(1)).toThrowError(
            ERRORS.ARGUMENTS_COMPONENTS
        );
        expect(() => ScriptManager('string')).toThrowError(
            ERRORS.ARGUMENTS_COMPONENTS
        );
        expect(() => ScriptManager([1, 'string', {}, []])).toThrowError(
            ERRORS.ARGUMENTS_COMPONENTS
        );
        expect(() => ScriptManager({})).toThrowError(
            ERRORS.ARGUMENTS_COMPONENTS
        );
    });
});

describe('ScriptManager builder', () => {
    const LOCATION = 'OK';

    // eslint-disable-next-line react/prefer-stateless-function
    class NoSeIncluyeEnDicc extends Component {
        render() {
            return <script {...this.props}>NoSeIncluyeEnDicc</script>;
        }
    }

    // eslint-disable-next-line react/prefer-stateless-function
    class ScriptMock extends Component {
        render() {
            const { globalContent, ...rest } = this.props;
            return <script {...rest}>ScriptMock</script>;
        }
    }

    // eslint-disable-next-line react/prefer-stateless-function
    class OtroScriptMock extends Component {
        render() {
            const { globalContent, ...rest } = this.props;
            const { location } = rest;

            if (location !== LOCATION) return '';

            return <script {...rest}>OtroScriptMock</script>;
        }
    }

    // eslint-disable-next-line react/prefer-stateless-function
    class DontRenderOnPreviewMock extends Component {
        render() {
            const { location, globalContent, excludeInArcPreview, ...rest } =
                this.props;

            if (location !== 'not-arc-preview') return '';

            return <script {...rest}>DontRenderOnPreviewMock</script>;
        }
    }

    const components = { ScriptMock, OtroScriptMock, DontRenderOnPreviewMock };
    const rnd = Math.floor(Math.random() * 1000);
    const config = {
        ScriptMock: {
            location: ['foo'],
            props: { value: rnd }
        },
        OtroScriptMock: {
            location: ['OK', 'foo']
        },
        DontRenderOnPreviewMock: {
            location: ['not-arc-preview'],
            props: { excludeInArcPreview: true }
        }
    };

    const Script = ScriptManager(components, config, null, false);
    const InArcPreviewScript = ScriptManager(components, config, null, true);

    it('should throw when neither location nor name is provided', () => {
        const error = 'Debe especificar props: location o name';
        expect(() => render(<Script />)).toThrowError(error);
        expect(() => render(<Script foo="foo" />)).toThrowError(error);
    });

    it('should render components matching the given name', () => {
        render(<Script name="ScriptMock" />);
        const scriptMock = document.querySelector('script');
        expect(scriptMock).toBeInTheDocument();
        expect(scriptMock).toHaveAttribute('value', `${rnd}`);
        expect(scriptMock).toHaveTextContent('ScriptMock');
    });

    it('should not render components that do not match the given name', () => {
        const { container } = render(<Script name="otroName" />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should render components matching the given location', () => {
        render(<Script location={LOCATION} />);
        const otroScript = document.querySelector('script');
        expect(otroScript).toBeInTheDocument();
        expect(otroScript).toHaveAttribute('location', LOCATION);
        expect(otroScript).toHaveTextContent('OtroScriptMock');
    });
    describe('Arc preview exclusion', () => {
        it('Should not render "DontRenderOnPreviewMock" if isArcPreview prop in ScriptManager is true ', () => {
            render(<InArcPreviewScript location={'not-arc-preview'} />);
            const dontRenderOnPreviewMock = document.querySelector('script');
            expect(dontRenderOnPreviewMock).not.toBeInTheDocument();
        });

        it('Should render "DontRenderOnPreviewMock" if isArcPreview prop in ScriptManager is false ', () => {
            render(<Script location={'not-arc-preview'} />);
            const dontRenderOnPreviewMock = document.querySelector('script');
            expect(dontRenderOnPreviewMock).toBeInTheDocument();
            expect(dontRenderOnPreviewMock).toHaveTextContent(
                'DontRenderOnPreviewMock'
            );
        });
    });
});

describe('getScriptsToLoad', () => {
    const espectaculosStoryGlobalContent = {
        type: 'story',
        taxonomy: {
            primary_section: {
                _id: '/espectaculos'
            }
        }
    };

    const espectaculosSubsectionStoryGlobalContent = {
        type: 'story',
        taxonomy: {
            primary_section: {
                _id: '/espectaculos/cine'
            }
        }
    };

    const sociedadStoryGlobalContent = {
        type: 'story',
        taxonomy: {
            primary_section: {
                _id: '/sociedad'
            }
        }
    };

    it('should return a function', () => {
        expect(typeof getScriptsToLoad).toEqual('function');
    });

    it('should returns an object with the scripts to include', () => {
        const bannersDisabled = false;
        const result = getScriptsToLoad(bannersDisabled, renderables);
        expect(Object.keys(getScriptsToLoad(undefined))).toEqual([
            'Datadog',
            'AdblockDetector',
            'Permutive',
            'GTM',
            'Comscore',
            'ComscoreFoodit',
            'Microdata',
            'PostBid',
            'GooglePublisherTag',
            'GooglePublisherTagAcumulado',
            'SocialEmbeds',
            'OptaEmbed',
            'ScriptHtmlLibre',
            'Blockthrough',
            'AmazonPublisherServices',
            'ComscoreVideo',
            'DevReactTracker',
            'Marfeel',
            'Observable',
            'DataModal',
            'FooditEventsHelper',
            'EventsHelper',
            'TikTokPixel',
            'FacebookPixel',
            'GoogleOneTap'
        ]);
        expect(Object.keys(result)).toEqual([
            'Datadog',
            'AdblockDetector',
            'Permutive',
            'GTM',
            'Comscore',
            'ComscoreFoodit',
            'Microdata',
            'PostBid',
            'GooglePublisherTag',
            'GooglePublisherTagAcumulado',
            'LiftIgniter',
            'Petametrics',
            'SocialEmbeds',
            'OptaEmbed',
            'ScriptHtmlLibre',
            'Blockthrough',
            'AmazonPublisherServices',
            'ComscoreVideo',
            'DevReactTracker',
            'Marfeel',
            'Observable',
            'DataModal',
            'FooditEventsHelper',
            'EventsHelper',
            'TikTokPixel',
            'FacebookPixel',
            'GoogleOneTap'
        ]);
        expect(result.Datadog).toBeDefined();
    });

    it('should returns an object with the scripts to include when banners are disabled', () => {
        const bannersDisabled = true;
        const result = getScriptsToLoad(bannersDisabled, renderables);
        expect(Object.keys(result)).toEqual([
            'Datadog',
            'AdblockDetector',
            'Permutive',
            'GTM',
            'Comscore',
            'ComscoreFoodit',
            'Microdata',
            'PostBid',
            'GooglePublisherTagAcumulado',
            'LiftIgniter',
            'Petametrics',
            'SocialEmbeds',
            'OptaEmbed',
            'ScriptHtmlLibre',
            'Blockthrough',
            'AmazonPublisherServices',
            'ComscoreVideo',
            'DevReactTracker',
            'Marfeel',
            'Observable',
            'DataModal',
            'FooditEventsHelper',
            'EventsHelper',
            'TikTokPixel',
            'FacebookPixel',
            'GoogleOneTap',
            'MetaRobots'
        ]);
    });

    it('should include VwoScript for story content', () => {
        const bannersDisabled = false;
        const result = getScriptsToLoad(
            bannersDisabled,
            renderables,
            '',
            espectaculosStoryGlobalContent
        );
        expect(result.VwoScript).toBeDefined();
    });

    it('should include VwoScript for story content in espectaculos subsections', () => {
        const bannersDisabled = false;
        const result = getScriptsToLoad(
            bannersDisabled,
            renderables,
            '',
            espectaculosSubsectionStoryGlobalContent
        );
        expect(result.VwoScript).toBeDefined();
    });

    it('should exclude VwoScript for non-story content', () => {
        const bannersDisabled = false;
        const globalContent = { type: 'gallery' };
        const result = getScriptsToLoad(
            bannersDisabled,
            renderables,
            '',
            globalContent
        );
        expect(result.VwoScript).toBeUndefined();
    });

    it('should exclude VwoScript for story content outside espectaculos', () => {
        const bannersDisabled = false;
        const result = getScriptsToLoad(
            bannersDisabled,
            renderables,
            '',
            sociedadStoryGlobalContent
        );
        expect(result.VwoScript).toBeUndefined();
    });

    it('should include VwoScript for story content even when banners are disabled', () => {
        const bannersDisabled = true;
        const result = getScriptsToLoad(
            bannersDisabled,
            renderables,
            '',
            espectaculosStoryGlobalContent
        );
        expect(result.VwoScript).toBeDefined();
        expect(result.MetaRobots).toBeDefined();
    });

    it('should preserve existing baseline scripts when VwoScript is added for story', () => {
        const bannersDisabled = false;
        const result = getScriptsToLoad(
            bannersDisabled,
            renderables,
            '',
            espectaculosStoryGlobalContent
        );
        expect(Object.keys(result)).toEqual([
            'Datadog',
            'AdblockDetector',
            'Permutive',
            'GTM',
            'Comscore',
            'ComscoreFoodit',
            'Microdata',
            'PostBid',
            'GooglePublisherTag',
            'GooglePublisherTagAcumulado',
            'LiftIgniter',
            'Petametrics',
            'SocialEmbeds',
            'OptaEmbed',
            'ScriptHtmlLibre',
            'Blockthrough',
            'AmazonPublisherServices',
            'ComscoreVideo',
            'DevReactTracker',
            'Marfeel',
            'Observable',
            'DataModal',
            'FooditEventsHelper',
            'EventsHelper',
            'TikTokPixel',
            'FacebookPixel',
            'GoogleOneTap',
            'VwoScript'
        ]);
    });

    it('should include VwoScript for story content without branching by layout or site metadata', () => {
        const resultHome = getScriptsToLoad(
            false,
            renderables,
            'home',
            espectaculosStoryGlobalContent
        );
        const resultArticle = getScriptsToLoad(
            false,
            renderables,
            'article',
            espectaculosStoryGlobalContent
        );
        const resultError = getScriptsToLoad(
            false,
            renderables,
            'Error',
            espectaculosStoryGlobalContent
        );
        expect(resultHome.VwoScript).toBeDefined();
        expect(resultArticle.VwoScript).toBeDefined();
        expect(resultError.VwoScript).toBeDefined();
        expect(Object.keys(resultHome)).toEqual(Object.keys(resultArticle));
    });

    it('should use a hardcoded engineering-owned allowed-sections list for VWO eligibility', () => {
        expect(VWO_ALLOWED_SECTIONS).toEqual([
            { section: '/espectaculos', pageLayout: 'all', subtype: '' }
        ]);
    });
});

describe('shouldExcludeByLayout', () => {
    it('returns true if layout is included', () => {
        expect(
            shouldExcludeByLayout({ excludedLayouts: ['Error'] }, 'Error')
        ).toBe(true);
    });

    it('returns false if excludedLayouts missing', () => {
        expect(shouldExcludeByLayout({}, 'Error')).toBe(false);
    });

    it('returns false if layout not in list', () => {
        expect(
            shouldExcludeByLayout({ excludedLayouts: ['Error'] }, 'home')
        ).toBe(false);
    });
});
