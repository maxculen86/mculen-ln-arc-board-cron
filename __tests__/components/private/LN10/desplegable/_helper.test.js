import { setDropdownData } from '../../../../../components/private/LN10/desplegable/_helper';
import menuData from '../../../../../__mocks__/data/menu/menu.json';

describe('private - common - LN10 - Desplegable - helper', () => {
    describe('setDropdownData helper', () => {
        test('should returns correct data length', () => {
            const dropdownData = setDropdownData(menuData);

            expect(dropdownData).toHaveLength(menuData.length);

            dropdownData.forEach((menu, index) => {
                const { childs: currentChilds } = menuData[index];
                expect(menu).toHaveLength(currentChilds.length);
            });
        });

        test('should returns objects with specific structure', () => {
            const dropdownData = setDropdownData(menuData);
            const REQUIRED_KEYS = ['name', 'href', 'title'];

            dropdownData.forEach((menu, index) => {
                const hasRequiredKeys = menu.every(currentMenu =>
                    Object.keys(currentMenu).includes(...REQUIRED_KEYS)
                );
                expect(hasRequiredKeys).toBeTruthy();
            });
        });

        test('should omits list key when does not have children', () => {
            const dropdownData = setDropdownData(menuData);

            dropdownData.forEach((menu, index) => {
                const { childs: currentChilds } = menuData[index];

                menu.forEach((currentMenu, deepIndex) => {
                    const { childs: children } = currentChilds[
                        deepIndex
                    ].childs[0];
                    const hasChildren = children.length !== 0;
                    expect(Object.keys(currentMenu).includes('list')).toEqual(
                        hasChildren
                    );
                });
            });
        });
    });
});
