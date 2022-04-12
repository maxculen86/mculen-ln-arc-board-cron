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
            '<div class="main-result --brinco" data-testid="Brinco-test"><div class="--flex"><div class="--twoxs --font-bold ball --large --">05</div><div class="--twoxs --font-bold ball --large --">08</div><div class="--twoxs --font-bold ball --large --">10</div><div class="--twoxs --font-bold ball --large --">30</div><div class="--twoxs --font-bold ball --large --">36</div><div class="--twoxs --font-bold ball --large --">39</div></div></div>'
        ],
        data: brincoExample
    },
    Telekino: {
        html: [
            '<div class="main-result --telekino" data-testid="Telekino-test"><div class="box-result --grid-5-columns"><div class="--twoxs --font-bold ball --large --">01</div><div class="--twoxs --font-bold ball --large --">03</div><div class="--twoxs --font-bold ball --large --">05</div><div class="--twoxs --font-bold ball --large --">06</div><div class="--twoxs --font-bold ball --large --">08</div><div class="--twoxs --font-bold ball --large --">09</div><div class="--twoxs --font-bold ball --large --">10</div><div class="--twoxs --font-bold ball --large --">12</div><div class="--twoxs --font-bold ball --large --">15</div><div class="--twoxs --font-bold ball --large --">16</div><div class="--twoxs --font-bold ball --large --">18</div><div class="--twoxs --font-bold ball --large --">19</div><div class="--twoxs --font-bold ball --large --">20</div><div class="--twoxs --font-bold ball --large --">23</div><div class="--twoxs --font-bold ball --large --">24</div></div></div>',
            '<div class="main-result --telekino" data-testid="Telekino-test"><div class="box-result --grid-5-columns"><div class="--twoxs --font-bold ball --large --">02</div><div class="--twoxs --font-bold ball --large --">03</div><div class="--twoxs --font-bold ball --large --">06</div><div class="--twoxs --font-bold ball --large --">07</div><div class="--twoxs --font-bold ball --large --">11</div><div class="--twoxs --font-bold ball --large --">13</div><div class="--twoxs --font-bold ball --large --">14</div><div class="--twoxs --font-bold ball --large --">15</div><div class="--twoxs --font-bold ball --large --">16</div><div class="--twoxs --font-bold ball --large --">17</div><div class="--twoxs --font-bold ball --large --">19</div><div class="--twoxs --font-bold ball --large --">22</div><div class="--twoxs --font-bold ball --large --">23</div><div class="--twoxs --font-bold ball --large --">24</div><div class="--twoxs --font-bold ball --large --">25</div></div></div>'
        ],
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
            '<div class="main-result --loto-plus" data-testid="Loto-test"><div class="box-result --loto-plus"><div class="--twoxs --font-bold ball --large --">03</div><div class="--twoxs --font-bold ball --large --">04</div><div class="--twoxs --font-bold ball --large --">05</div><div class="--twoxs --font-bold ball --large --">07</div><div class="--twoxs --font-bold ball --large --">23</div><div class="--twoxs --font-bold ball --large --">38</div></div></div>',
            '<div class="main-result --loto-plus" data-testid="Loto-test"><div class="box-result --loto-plus"><div class="--twoxs --font-bold ball --large --">05</div><div class="--twoxs --font-bold ball --large --">09</div><div class="--twoxs --font-bold ball --large --">13</div><div class="--twoxs --font-bold ball --large --">14</div><div class="--twoxs --font-bold ball --large --">25</div><div class="--twoxs --font-bold ball --large --">35</div></div></div>',
            '<div class="main-result --loto-plus" data-testid="Loto-test"><div class="box-result --loto-plus"><div class="--twoxs --font-bold ball --large --">08</div><div class="--twoxs --font-bold ball --large --">12</div><div class="--twoxs --font-bold ball --large --">21</div><div class="--twoxs --font-bold ball --large --">27</div><div class="--twoxs --font-bold ball --large --">34</div><div class="--twoxs --font-bold ball --large --">40</div></div></div>'
        ],
        data: lotoExample
    },
    Loto_5: {
        html: [
            '<div class="main-result " data-testid="Loto_5-test"><div class="--loto-5"><div class="--twoxs --font-bold ball --large --">02</div><div class="--twoxs --font-bold ball --large --">14</div><div class="--twoxs --font-bold ball --large --">16</div><div class="--twoxs --font-bold ball --large --">30</div><div class="--twoxs --font-bold ball --large --">36</div></div></div>'
        ],
        data: loto5Example
    },
    Quiniela_Poceada: {
        html: [
            '<div class="main-result --quiniela-poceada" data-testid="Quiniela_Poceada-test"><div class="box-result --grid-5-columns"><div class="--twoxs --font-bold ball --large --">06</div><div class="--twoxs --font-bold ball --large --">07</div><div class="--twoxs --font-bold ball --large --">08</div><div class="--twoxs --font-bold ball --large --">18</div><div class="--twoxs --font-bold ball --large --">21</div><div class="--twoxs --font-bold ball --large --">02</div><div class="--twoxs --font-bold ball --large --">25</div><div class="--twoxs --font-bold ball --large --">31</div><div class="--twoxs --font-bold ball --large --">41</div><div class="--twoxs --font-bold ball --large --">46</div><div class="--twoxs --font-bold ball --large --">62</div><div class="--twoxs --font-bold ball --large --">63</div><div class="--twoxs --font-bold ball --large --">65</div><div class="--twoxs --font-bold ball --large --">66</div><div class="--twoxs --font-bold ball --large --">77</div><div class="--twoxs --font-bold ball --large --">83</div><div class="--twoxs --font-bold ball --large --">90</div><div class="--twoxs --font-bold ball --large --">91</div><div class="--twoxs --font-bold ball --large --">92</div><div class="--twoxs --font-bold ball --large --">99</div></div><span class="label-text  --font-bold --fourxs">Letras: OJTY</span></div>'
        ],
        data: quiniPoceadaExample
    },
    Quiniela_Plus: {
        html: [
            '<div class="main-result --quini-plus" data-testid="Quiniela_Plus-test"><div class="box-result --grid-5-columns"><div class="--twoxs --font-bold ball --large --">11</div><div class="--twoxs --font-bold ball --large --">17</div><div class="--twoxs --font-bold ball --large --">24</div><div class="--twoxs --font-bold ball --large --">26</div><div class="--twoxs --font-bold ball --large --">29</div><div class="--twoxs --font-bold ball --large --">44</div><div class="--twoxs --font-bold ball --large --">46</div><div class="--twoxs --font-bold ball --large --">49</div><div class="--twoxs --font-bold ball --large --">50</div><div class="--twoxs --font-bold ball --large --">52</div><div class="--twoxs --font-bold ball --large --">55</div><div class="--twoxs --font-bold ball --large --">60</div><div class="--twoxs --font-bold ball --large --">64</div><div class="--twoxs --font-bold ball --large --">68</div><div class="--twoxs --font-bold ball --large --">69</div><div class="--twoxs --font-bold ball --large --">73</div><div class="--twoxs --font-bold ball --large --">87</div><div class="--twoxs --font-bold ball --large --">89</div><div class="--twoxs --font-bold ball --large --">95</div><div class="--twoxs --font-bold ball --large --">99</div></div></div>'
        ],
        data: quiniPlusExample
    }
};
