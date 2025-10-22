import React from 'react';
import { render } from '@testing-library/react';
import EmbedCll from '../../../../../../components/private/LN/nota/cuerpo/EmbedCll';

const iframeTitle = 'Embebido canchallena';

describe('EmbedCll Component', () => {
    it('should render nothing when embedType is not defined', () => {
        const { container } = render(
            <EmbedCll data={{ embed: { config: { embedType: '' } } }} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render nothing when embedType is invalid', () => {
        const { container } = render(
            <EmbedCll
                data={{ embed: { config: { embedType: 'invalidType' } } }}
            />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render nothing when widgetUrl is empty', () => {
        const { container } = render(
            <EmbedCll data={{ embed: { config: { widgetUrl: '' } } }} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should generate correct content when embedType is "isGroupTable"', () => {
        const groupsTable =
            'https://widget-canchallena.clanacion.com.ar/futbol/primera-b-metropolitana-2025/grupos/widget/';
        const testData = {
            embed: {
                config: { widgetUrl: groupsTable, embedType: 'isGroupTable' }
            },
            _id: '12345'
        };
        const { container } = render(<EmbedCll data={testData} />);
        const htmlContent = container.querySelector('.com-embed.--html');
        expect(htmlContent).toBeInTheDocument();

        const wrapperDiv = htmlContent.querySelector('div.p-overflow_max767');
        expect(wrapperDiv).toBeInTheDocument();
        expect(wrapperDiv.className).not.toMatch(/h-303/);

        const innerDiv = wrapperDiv.querySelector('div');
        expect(innerDiv).toBeInTheDocument();
        expect(innerDiv.className.trim()).toBe('');

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', iframeTitle);
        expect(iframe.getAttribute('src')).toMatch(
            /^https:\/\/widget-canchallena\.clanacion\.com\.ar\/futbol\/primera-b-metropolitana-2025\/grupos\/widget\//
        );

        const parentDiv = iframe.closest('div.com-anexo');
        expect(parentDiv).toBeInTheDocument();
        expect(parentDiv).toHaveClass('pym');
    });

    it('should generate correct content when embedType is "isStandingsTable"', () => {
        const standingsTable =
            'https://widget-canchallena.clanacion.com.ar/futbol/primera-b-metropolitana-2025/tabla-de-posiciones/widget/';
        const testData = {
            embed: {
                config: {
                    widgetUrl: standingsTable,
                    embedType: 'isStandingsTable'
                }
            },
            _id: '67890'
        };
        const { container } = render(<EmbedCll data={testData} />);
        const htmlContent = container.querySelector('.com-embed.--html');
        expect(htmlContent).toBeInTheDocument();

        const wrapperDiv = htmlContent.querySelector('div.p-overflow_max767');
        expect(wrapperDiv).toBeInTheDocument();
        expect(wrapperDiv.className).not.toMatch(/h-303/);

        const innerDiv = wrapperDiv.querySelector('div');
        expect(innerDiv).toBeInTheDocument();
        expect(innerDiv.className.trim()).toBe('');

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', iframeTitle);
        expect(iframe.getAttribute('src')).toMatch(
            /^https:\/\/widget-canchallena\.clanacion\.com\.ar\/futbol\/primera-b-metropolitana-2025\/tabla-de-posiciones\/widget\//
        );

        const parentDiv = iframe.closest('div.com-anexo');
        expect(parentDiv).toBeInTheDocument();
        expect(parentDiv).toHaveClass('pym');
    });

    it('should generate correct content when embedType is "isMatchDetail"', () => {
        const matchDetail =
            'https://widget-canchallena.clanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppxmz3f8/widget/';
        const testData = {
            embed: {
                config: { widgetUrl: matchDetail, embedType: 'isMatchDetail' }
            },
            _id: '11223'
        };
        const { container } = render(<EmbedCll data={testData} />);
        const htmlContent = container.querySelector('.com-embed.--html');
        expect(htmlContent).toBeInTheDocument();

        const wrapperDiv = htmlContent.querySelector('div.p-overflow_max767');
        expect(wrapperDiv).toBeInTheDocument();

        const innerDiv = wrapperDiv.querySelector('div.h-100');
        expect(innerDiv).not.toBeInTheDocument();

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', iframeTitle);
        expect(iframe).toHaveAttribute(
            'src',
            'https://widget-canchallena.clanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppxmz3f8/widget/?initialWidth=0&childId=anexo-11223-0-1&parentTitle=&parentUrl=http%3A%2F%2Flocalhost%2F'
        );
        const parentDiv = iframe.closest('div.com-anexo');
        expect(parentDiv).toBeInTheDocument();
        expect(parentDiv).toHaveClass('pym');
    });

    it('should generate correct content when embedType is "isAnnualTable"', () => {
        const annualTable =
            'https://widget-canchallena.clanacion.com.ar/futbol/tabla-anual/2025/widget/';
        const testData = {
            embed: {
                config: { widgetUrl: annualTable, embedType: 'isAnnualTable' }
            },
            _id: '99999'
        };
        const { container } = render(<EmbedCll data={testData} />);

        const htmlContent = container.querySelector('.com-embed.--html');
        expect(htmlContent).toBeInTheDocument();

        const wrapperDiv = htmlContent.querySelector('div.p-overflow_max767');
        expect(wrapperDiv).toBeInTheDocument();
        expect(wrapperDiv.className).not.toMatch(/h-303/);

        const innerDiv = wrapperDiv.querySelector('div');
        expect(innerDiv).toBeInTheDocument();
        expect(innerDiv.className.trim()).toBe('');

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', iframeTitle);
        expect(iframe.getAttribute('src')).toMatch(
            /^https:\/\/widget-canchallena\.clanacion\.com\.ar\/futbol\/tabla-anual\/2025\/widget\//
        );

        const parentDiv = iframe.closest('div.com-anexo');
        expect(parentDiv).toBeInTheDocument();
        expect(parentDiv).toHaveClass('pym');
    });

    it('should generate correct content when embedType is "isAverageTable"', () => {
        const averageTable =
            'https://widget-canchallena.clanacion.com.ar/futbol/promedios/2024/widget/';
        const testData = {
            embed: {
                config: { widgetUrl: averageTable, embedType: 'isAverageTable' }
            },
            _id: '88888'
        };
        const { container } = render(<EmbedCll data={testData} />);

        const htmlContent = container.querySelector('.com-embed.--html');
        expect(htmlContent).toBeInTheDocument();

        const wrapperDiv = htmlContent.querySelector('div.p-overflow_max767');
        expect(wrapperDiv).toBeInTheDocument();
        expect(wrapperDiv.className).not.toMatch(/h-303/);

        const innerDiv = wrapperDiv.querySelector('div');
        expect(innerDiv).toBeInTheDocument();
        expect(innerDiv.className.trim()).toBe('');

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', iframeTitle);
        expect(iframe.getAttribute('src')).toMatch(
            /^https:\/\/widget-canchallena\.clanacion\.com\.ar\/futbol\/promedios\/2024\/widget\//
        );

        const parentDiv = iframe.closest('div.com-anexo');
        expect(parentDiv).toBeInTheDocument();
        expect(parentDiv).toHaveClass('pym');
    });
});
