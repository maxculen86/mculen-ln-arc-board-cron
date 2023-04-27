import Anticipo from '../../../../../components/features/LN-common/LN10_anticipo/json';

describe('components - features - LN-common - LN10_Anticipo - json.js', () => {
    const props = {
        customFields: {
            hide: false,
            title: 'Probamos la nueva home',
            textBadge: 'Ultimo MOmento',
            video:
                '<iframe width="560" height="150" src="https://www.youtube.com/embed/0ib0IQf3_8M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
        }
    };
    describe('Check props', () => {
        it('When is Ok', () => {
            const objAnticipo = Anticipo(props);
            expect(objAnticipo).toMatchObject({
                information: {
                    hideCaja: false,
                    title: 'Probamos la nueva home',
                    url: undefined,
                    textBadge: 'Ultimo MOmento',
                    lead: undefined,
                    video:
                        '<iframe width="560" height="150" src="https://www.youtube.com/embed/0ib0IQf3_8M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                }
            });
        });

        it('When title no exist', () => {
            const newProps = Object.assign({}, props);
            const customFields = Object.assign({}, props.customFields);
            customFields.title = null;
            newProps.customFields = customFields;

            const objAnticipo = Anticipo(newProps);
            expect(objAnticipo).toBeNull();
        });
    });
});
