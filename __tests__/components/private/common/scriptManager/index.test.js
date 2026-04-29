import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import { render } from '@testing-library/react';
import ScriptManager, {
    ERRORS
} from '../../../../../components/private/common/scriptManager';
import renderables from '../../../../../__mocks__/data/renderables/data1';
import {
    getScriptsToLoad,
    shouldExcludeByLayout
} from '../../../../../components/private/LN/common/utils/scriptsHelper';

describe('ScriptManager ...', () => {
    it('... es una function', () => {
        expect(typeof ScriptManager).toEqual('function');
    });

    it('... que requiere un array con al menos un componente', () => {
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

describe('ScriptManager genera un builder', () => {
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
            return <script {...this.props}>ScriptMock</script>;
        }
    }

    // eslint-disable-next-line react/prefer-stateless-function
    class OtroScriptMock extends Component {
        render() {
            const { location } = this.props;

            if (location !== LOCATION) return '';

            return <script {...this.props}>OtroScriptMock</script>;
        }
    }

    // eslint-disable-next-line react/prefer-stateless-function
    class DontRenderOnPreviewMock extends Component {
        render() {
            const { location } = this.props;

            if (location !== 'not-arc-preview') return '';

            return <script {...this.props}>DontRenderOnPreviewMock</script>;
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

    it('al que debe indicarse nombre o posicion', () => {
        const error = 'Debe especificar props: location o name';
        expect(() => render(<Script />)).toThrowError(error);
        expect(() => render(<Script foo="foo" />)).toThrowError(error);
    });

    it('el que hace el render de los componente que coinciden con el nombre', () => {
        render(<Script name="ScriptMock" />);
        const scriptMock = document.querySelector('script');
        expect(scriptMock).toBeInTheDocument();
        expect(scriptMock).toHaveAttribute('value', `${rnd}`);
        expect(scriptMock).toHaveTextContent('ScriptMock');
    });

    it('el que NO hace el render de los componente que NO coinciden con el nombre', () => {
        const { container } = render(<Script name="otroName" />);
        expect(container).toBeEmptyDOMElement();
    });

    it('el que hace el render de los componente que coinciden con la ubicación', () => {
        render(<Script location={LOCATION} />);
        const otroScript = document.querySelector('script');
        expect(otroScript).toBeInTheDocument();
        expect(otroScript).toHaveAttribute('location', LOCATION);
        expect(otroScript).toHaveTextContent('OtroScriptMock');
    });
    describe('diferencia carga de script que deben ser exlcuidos desde el preview de Arc', () => {
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
