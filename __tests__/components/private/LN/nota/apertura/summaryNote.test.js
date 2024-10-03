import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SummaryNote from '../../../../../../components/private/LN/common/summaryNote';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        __esModule: true,
        addEventToDataLayerV2: jest.fn()
    })
);

describe('SummaryNote =>', () => {
    const Paragraphs = [
        '<span>Real </span><i><em>Madrid</em></i><span> fue eliminado de la Champions League luego de sufrir una paliza por 5 a 1 ante Manchester City en las semifinales.</span>',
        '<span>La prensa deportiva </span><b><strong>española</strong></b><span> reflejó la dolenicia de los hinchas: Marca tituló \'Palizas de las que duelen\', mientras AS optó por "Para llorar". </span>',
        '<s><span>Karim</span></s><span> Benzema fue el blanco preferido de las críticas entre los hinchas del Real Madrid, quienes exigieron su salida del club.</span>',
        '<span>El delantero francés fue el ganador del último Balón de Oro en octubre de 2022, título otorgado por su rol fundamental en la victoria de Real Madrid ante ese torneo el año pasado.</span>'
    ];
    it("When the component doesn't receive paragraphs, it should render a empty fragment.", () => {
        const { container } = render(<SummaryNote paragraphs={[]} />);
        expect(!container.hasChildNodes());
    });
    it('When the component receives paragraphs, it should render the same quantity of them in a list.', () => {
        render(<SummaryNote paragraphs={Paragraphs} />);
        const list = document.querySelectorAll('li');
        expect(Paragraphs.length).toEqual(list.length);
    });
    it('Should match the snapshot', () => {
        const { container } = render(<SummaryNote paragraphs={Paragraphs} />);
        expect(container).toMatchSnapshot();
    });
    it('calls addEventToDataLayerV2 when collapsed is true', () => {
        render(<SummaryNote paragraphs={Paragraphs} />);

        fireEvent.click(screen.getByText('Ver más'));
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            action: 'IA',
            category: 'nota_ln9',
            label: 'resumen_nota'
        });
    });
});
