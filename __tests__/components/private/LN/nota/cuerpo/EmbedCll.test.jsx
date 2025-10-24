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
        const groupsTableWidgetUrl =
            'https://widget-canchallena.clanacion.com.ar/futbol/primera-b-metropolitana-2025/grupos/widget/';
        const testData = {
            embed: {
                config: {
                    widgetUrl: groupsTableWidgetUrl,
                    embedType: 'isGroupTable'
                }
            },
            _id: '12345'
        };
        const { container } = render(<EmbedCll data={testData} />);
        const htmlContent = container.querySelector('.com-embed.--html');
        expect(htmlContent).toBeInTheDocument();

        const wrapperDiv = htmlContent.querySelector('div.p-overflow_max767');
        expect(wrapperDiv).toBeInTheDocument();
        expect(wrapperDiv.className).toMatch(/p-overflow_max767/);

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', iframeTitle);
        expect(
            iframe.getAttribute('src').startsWith(groupsTableWidgetUrl)
        ).toBeTruthy();

        const parentDiv = iframe.closest('div.com-anexo');
        expect(parentDiv).toBeInTheDocument();
        expect(parentDiv).toHaveClass('pym');
    });

    it('should generate correct content when embedType is "isStandingsTable"', () => {
        const standingsTableWidgetUrl =
            'https://widget-canchallena.clanacion.com.ar/futbol/primera-b-metropolitana-2025/tabla-de-posiciones/widget/';
        const testData = {
            embed: {
                config: {
                    widgetUrl: standingsTableWidgetUrl,
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
        expect(wrapperDiv.className).toMatch(/p-overflow_max767/);

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', iframeTitle);
        expect(
            iframe.getAttribute('src').startsWith(standingsTableWidgetUrl)
        ).toBeTruthy();

        const parentDiv = iframe.closest('div.com-anexo');
        expect(parentDiv).toBeInTheDocument();
        expect(parentDiv).toHaveClass('pym');
    });

    it('should generate correct content when embedType is "isMatchDetail"', () => {
        const matchDetailWidgetUrl =
            'https://widget-canchallena.clanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppxmz3f8/widget/';
        const testData = {
            embed: {
                config: {
                    widgetUrl: matchDetailWidgetUrl,
                    embedType: 'isMatchDetail'
                }
            },
            _id: '11223'
        };
        const { container } = render(<EmbedCll data={testData} />);
        const htmlContent = container.querySelector('.com-embed.--html');
        expect(htmlContent).toBeInTheDocument();

        const wrapperDiv = htmlContent.querySelector('div.p-overflow_max767');
        expect(wrapperDiv).toBeInTheDocument();

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', iframeTitle);
        expect(
            iframe.getAttribute('src').startsWith(matchDetailWidgetUrl)
        ).toBeTruthy();
        const parentDiv = iframe.closest('div.com-anexo');
        expect(parentDiv).toBeInTheDocument();
        expect(parentDiv).toHaveClass('pym');
    });

    it('should generate correct content when embedType is "isAnnualTable"', () => {
        const annualTableWidgetUrl =
            'https://widget-canchallena.clanacion.com.ar/futbol/tabla-anual/2025/widget/';
        const testData = {
            embed: {
                config: {
                    widgetUrl: annualTableWidgetUrl,
                    embedType: 'isAnnualTable'
                }
            },
            _id: '99999'
        };
        const { container } = render(<EmbedCll data={testData} />);

        const htmlContent = container.querySelector('.com-embed.--html');
        expect(htmlContent).toBeInTheDocument();

        const wrapperDiv = htmlContent.querySelector('div.p-overflow_max767');
        expect(wrapperDiv).toBeInTheDocument();
        expect(wrapperDiv.className).toMatch(/p-overflow_max767/);

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', iframeTitle);
        expect(
            iframe.getAttribute('src').startsWith(annualTableWidgetUrl)
        ).toBeTruthy();

        const parentDiv = iframe.closest('div.com-anexo');
        expect(parentDiv).toBeInTheDocument();
        expect(parentDiv).toHaveClass('pym');
    });

    it('should generate correct content when embedType is "isAverageTable"', () => {
        const averageTableWidgetUrl =
            'https://widget-canchallena.clanacion.com.ar/futbol/promedios/2024/widget/';
        const testData = {
            embed: {
                config: {
                    widgetUrl: averageTableWidgetUrl,
                    embedType: 'isAverageTable'
                }
            },
            _id: '88888'
        };
        const { container } = render(<EmbedCll data={testData} />);

        const htmlContent = container.querySelector('.com-embed.--html');
        expect(htmlContent).toBeInTheDocument();

        const wrapperDiv = htmlContent.querySelector('div.p-overflow_max767');
        expect(wrapperDiv).toBeInTheDocument();
        expect(wrapperDiv.className).toMatch(/p-overflow_max767/);

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', iframeTitle);
        expect(
            iframe.getAttribute('src').startsWith(averageTableWidgetUrl)
        ).toBeTruthy();

        const parentDiv = iframe.closest('div.com-anexo');
        expect(parentDiv).toBeInTheDocument();
        expect(parentDiv).toHaveClass('pym');
    });
});
