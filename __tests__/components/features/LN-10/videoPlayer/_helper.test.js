import { productClickFromClientVideoJW } from '../../../../../components/features/LN-10/videoPlayer/_helper';

describe('Components - features - LN-10 - videoPlayer', () => {
    describe('productClickFromClientVideoJW', () => {
        let mockElement;
        let dataLayerPushSpy;

        beforeEach(() => {
            window.dataLayer = [];
            dataLayerPushSpy = jest.spyOn(window.dataLayer, 'push');

            mockElement = document.createElement('article');
            mockElement.dataset.id = 'm7XSUv1X';
            mockElement.dataset.pos = '01';
            mockElement.dataset.source = 'video';

            const block = document.createElement('div');
            block.dataset.blockName = 'h_tema-03';
            block.dataset.diagramacionId = 'bn_player_3_grid';
            block.dataset.chainPosition = '0103';
            block.dataset.isSubscriptor = true;
            block.dataset.roof = 'Actualidad';
            block.setAttribute('data-is-block', '');
            block.appendChild(mockElement);

            const section = document.createElement('section');
            section.dataset.section = 'breaking1';
            section.setAttribute('data-section', '');
            section.appendChild(block);

            document.body.appendChild(section);
        });

        afterEach(() => {
            document.body.innerHTML = '';
            jest.restoreAllMocks();
        });

        it('pushes the correct item to dataLayer when item_id exists', () => {
            productClickFromClientVideoJW(
                mockElement,
                'El juego ideal para esta Navidad en familia'
            );

            expect(window.dataLayer).toHaveLength(1);
            expect(window.dataLayer[0]).toEqual({
                event: 'productClickScore',
                item: {
                    item_list_id: '010301',
                    item_id: 'm7XSUv1X',
                    item_variant: 'video',
                    item_brand: 'excSuscriptor_bn_player_3_grid',
                    item_list_name: 'h_tema-03',
                    item_name: 'El juego ideal para esta Navidad en familia',
                    item_category: 'Actualidad',
                    price: 1,
                    index: 1,
                    quantity: 1
                }
            });
        });

        it('does not push to dataLayer if item_id is missing', () => {
            delete mockElement.dataset.id;

            productClickFromClientVideoJW(mockElement, 'Video sin ID');

            expect(window.dataLayer).toHaveLength(0);
        });
    });
});
