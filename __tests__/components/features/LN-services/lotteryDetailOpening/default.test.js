import React from 'react';
import Context from 'fusion:context';
import LotteryDetailOpening from '../../../../../components/features/LN-services/lotteryDetailOpening/default';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import brincoExample from '../../../../../__mocks__/data/lottery/lotteryDetail/brincoExample.json';
import telekinoExample from '../../../../../__mocks__/data/lottery/lotteryDetail/telekinoExample.json';
import quinielaNacionalExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quinielaNacionalExample.json';
import quinielaProvinciaExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quinielaProvinciaExample.json';
import quinielaCordobaExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quinielaCordobaExample.json';
import quinielaSantaFeExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quinielaSantaFeExample.json';
import quinielaUruguayaExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quinielaUruguayaExample.json';
import quini6Example from '../../../../../__mocks__/data/lottery/lotteryDetail/quini6Example.json';
import lotoExample from '../../../../../__mocks__/data/lottery/lotteryDetail/lotoExample.json';
import loto5Example from '../../../../../__mocks__/data/lottery/lotteryDetail/loto5Example.json';
import quiniPoceadaExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quiniPoceadaExample.json';
import quiniPlusExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quiniPlusExample.json';

import quinielaNacionalHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quinielaNacionalHtml.json';
import quinielaProvinciaHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quinielaProvinciaHtml.json';
import quinielaCordobaHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quinielaCordobaHtml.json';
import quinielaSantaFeHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quinielaSantaFeHtml.json';
import quinielaUruguayaHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quinielaUruguayaHtml.json';
import quini6Html from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quini6Html.json';
import telekinoHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/telekinoHtml.json';

jest.mock(
    '../../../../../components/private/common/staticValidation.jsx',
    () => 'mock-static-validation'
);

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

describe('Features - LN-servicios - LN Loteria Detalle =>', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: {
            dataService: {
                lotteryDetail: brincoExample
            }
        }
    }));
    it('should be wrapped by StaticValidation component', () => {
        render(<LotteryDetailOpening id="QWERTYUIOP" />);
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-validation'
            )
        ).toBeVisible();
    });
    it('should return a lottery detail', () => {
        const { container } = render(<LotteryDetailOpening id="QWERTYUIOP" />);
        const StaticValidation = container.querySelector(
            'mock-static-validation'
        );
        expect(
            StaticValidation.getElementsByClassName('lottery-detail-box').length
        ).toBe(1);
        expect(StaticValidation.firstChild.textContent).toContain(
            'Últimos resultados'
        );
    });
    it('should test lottery cards', () => {
        Object.keys(lotteriesDetailsHTML).forEach(lottery => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {
                    dataService: {
                        lotteryDetail: lotteriesDetailsHTML[lottery].data
                    }
                }
            }));
            render(<LotteryDetailOpening id="QWERTYUIOP" />);
            expect(
                screen
                    .getAllByTestId(`${lottery}-test`)
                    .map(html => html.outerHTML)
            ).toStrictEqual(lotteriesDetailsHTML[lottery].html);
        });
    });
});

const lotteriesDetailsHTML = {
    Brinco: {
        html: [
            '<div class="main-result" data-testid="Brinco-test"><div class="box-result --brinco"><div class="--twoxs --font-bold ball">05</div><div class="--twoxs --font-bold ball">08</div><div class="--twoxs --font-bold ball">10</div><div class="--twoxs --font-bold ball">30</div><div class="--twoxs --font-bold ball">36</div><div class="--twoxs --font-bold ball">39</div></div></div>'
        ],
        data: brincoExample
    },
    Telekino: {
        html: telekinoHtml,
        data: telekinoExample
    },
    Quiniela_Nacional: {
        html: quinielaNacionalHtml,
        data: quinielaNacionalExample
    },
    Quiniela_Provincia: {
        html: quinielaProvinciaHtml,
        data: quinielaProvinciaExample
    },
    Quiniela_de_Cordoba: {
        html: quinielaCordobaHtml,
        data: quinielaCordobaExample
    },
    Quiniela_de_Santa_Fe: {
        html: quinielaSantaFeHtml,
        data: quinielaSantaFeExample
    },
    Quiniela_Uruguaya: {
        html: quinielaUruguayaHtml,
        data: quinielaUruguayaExample
    },
    Quini_6: {
        html: quini6Html,
        data: quini6Example
    },
    Loto: {
        html: [
            '<div class="main-result" data-testid="Loto-test"><div class="box-result --loto-plus-detail"><div class="--twoxs --font-bold ball">03</div><div class="--twoxs --font-bold ball">04</div><div class="--twoxs --font-bold ball">05</div><div class="--twoxs --font-bold ball">07</div><div class="--twoxs --font-bold ball">23</div><div class="--twoxs --font-bold ball">38</div></div></div>',
            '<div class="main-result" data-testid="Loto-test"><div class="box-result --loto-plus-detail"><div class="--twoxs --font-bold ball">05</div><div class="--twoxs --font-bold ball">09</div><div class="--twoxs --font-bold ball">13</div><div class="--twoxs --font-bold ball">14</div><div class="--twoxs --font-bold ball">25</div><div class="--twoxs --font-bold ball">35</div></div></div>',
            '<div class="main-result" data-testid="Loto-test"><div class="box-result --loto-plus-detail"><div class="--twoxs --font-bold ball">08</div><div class="--twoxs --font-bold ball">12</div><div class="--twoxs --font-bold ball">21</div><div class="--twoxs --font-bold ball">27</div><div class="--twoxs --font-bold ball">34</div><div class="--twoxs --font-bold ball">40</div></div></div>'
        ],
        data: lotoExample
    },
    Loto_5: {
        html: [
            '<div class="main-result" data-testid="Loto_5-test"><div class="box-result --loto-5"><div class="--twoxs --font-bold ball">02</div><div class="--twoxs --font-bold ball">14</div><div class="--twoxs --font-bold ball">16</div><div class="--twoxs --font-bold ball">30</div><div class="--twoxs --font-bold ball">36</div></div></div>'
        ],
        data: loto5Example
    },
    Quiniela_Poceada: {
        html: [
            '<div class="main-result" data-testid="Quiniela_Poceada-test"><div class="box-result --grid-5-columns"><div class="--twoxs --font-bold ball">06</div><div class="--twoxs --font-bold ball">07</div><div class="--twoxs --font-bold ball">08</div><div class="--twoxs --font-bold ball">18</div><div class="--twoxs --font-bold ball">21</div><div class="--twoxs --font-bold ball">02</div><div class="--twoxs --font-bold ball">25</div><div class="--twoxs --font-bold ball">31</div><div class="--twoxs --font-bold ball">41</div><div class="--twoxs --font-bold ball">46</div><div class="--twoxs --font-bold ball">62</div><div class="--twoxs --font-bold ball">63</div><div class="--twoxs --font-bold ball">65</div><div class="--twoxs --font-bold ball">66</div><div class="--twoxs --font-bold ball">77</div><div class="--twoxs --font-bold ball">83</div><div class="--twoxs --font-bold ball">90</div><div class="--twoxs --font-bold ball">91</div><div class="--twoxs --font-bold ball">92</div><div class="--twoxs --font-bold ball">99</div></div><span class="label-text  --font-bold --fourxs">Letras: OJTY</span></div>'
        ],
        data: quiniPoceadaExample
    },
    Quiniela_Plus: {
        html: [
            '<div class="main-result" data-testid="Quiniela_Plus-test"><div class="box-result --grid-5-columns"><div class="--twoxs --font-bold ball">11</div><div class="--twoxs --font-bold ball">17</div><div class="--twoxs --font-bold ball">24</div><div class="--twoxs --font-bold ball">26</div><div class="--twoxs --font-bold ball">29</div><div class="--twoxs --font-bold ball">44</div><div class="--twoxs --font-bold ball">46</div><div class="--twoxs --font-bold ball">49</div><div class="--twoxs --font-bold ball">50</div><div class="--twoxs --font-bold ball">52</div><div class="--twoxs --font-bold ball">55</div><div class="--twoxs --font-bold ball">60</div><div class="--twoxs --font-bold ball">64</div><div class="--twoxs --font-bold ball">68</div><div class="--twoxs --font-bold ball">69</div><div class="--twoxs --font-bold ball">73</div><div class="--twoxs --font-bold ball">87</div><div class="--twoxs --font-bold ball">89</div><div class="--twoxs --font-bold ball">95</div><div class="--twoxs --font-bold ball">99</div></div></div>'
        ],
        data: quiniPlusExample
    }
};
