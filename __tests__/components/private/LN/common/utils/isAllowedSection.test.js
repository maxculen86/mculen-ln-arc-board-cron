import isAllowedSection from '../../../../../../components/private/LN/common/utils/isAllowedSection';

describe('Component - private - commom - utils - isAllowedSection', () => {
    const allowList = [
        { section: '/lifestyle', pageLayout: 'LN-nota-foto-al-100' },
        { section: '/revista-living', pageLayout: 'LN-Acumulado' },
        { section: '/politica', pageLayout: 'LN-nota-noticia' },
        { section: '/economia' },
        { pageLayout: 'LN-Home_Sports' },
        { subtype: '4' }
    ];

    describe('Cases in Acu: Should return true when the data in the globalContent matches something in the enabled list.', () => {
        test('Should return true for revista-living in acu', () => {
            const layout = 'LN-Acumulado';
            const globalContent = {
                _id: '/revista-living'
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: allowList,
                    layout
                })
            ).toBeTruthy();
        });

        test('should return true for "politica" in Note', () => {
            const layout = 'LN-nota-noticia';
            const globalContent = {
                _id: '/politica'
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: allowList,
                    layout
                })
            ).toBeTruthy();
        });

        test('should return true for "lifetyle" in Note photo to 100', () => {
            const layout = 'LN-nota-foto-al-100';
            const globalContent = {
                _id: '/lifestyle'
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: allowList,
                    layout
                })
            ).toBeTruthy();
        });

        test('should only validate for the section when the page layout is not defined in the allowed list.', () => {
            const layout = 'LN-nota-foto-al-100';
            const globalContent = {
                _id: '/economia'
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: allowList,
                    layout
                })
            ).toBeTruthy();
        });

        test('should return false when the data in the globalContent does not match any element in the enabled list.', () => {
            const layout = 'LN-nota-noticia';
            const globalContent = {
                _id: '/deportes'
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: allowList,
                    layout
                })
            ).toBeFalsy();
        });

        test('Should return false the useAppContext does not return data', () => {
            expect(
                isAllowedSection({
                    globalContent: {},
                    listOfAllowedSection: allowList,
                    layout: 'LN-Acumulado'
                })
            ).toBeFalsy();
        });
    });

    describe('Cases in note', () => {
        test('Should return true for revista-living in note', () => {
            const layout = 'LN-nota-noticia';
            const globalContent = {
                taxonomy: {
                    primary_section: {
                        _id: '/politica'
                    }
                }
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: allowList,
                    layout
                })
            ).toBeTruthy();
        });

        test('should return true for "lifetyle" in Note photo to 100', () => {
            const layout = 'LN-nota-foto-al-100';
            const globalContent = {
                taxonomy: {
                    primary_section: {
                        _id: '/lifestyle'
                    }
                }
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: allowList,
                    layout
                })
            ).toBeTruthy();
        });

        test('If the section and the layout are not defined in the list. Must evaluate to the enabled subtype and return true', () => {
            const globalContent = {
                taxonomy: {
                    primary_section: {
                        _id: '/deportes'
                    }
                },
                subtype: '4'
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: allowList,
                    layout: undefined,
                    noteType: '4'
                })
            ).toBeTruthy();
        });

        test('Should return false when the subtype is disabled', () => {
            const globalContent = {
                taxonomy: {
                    primary_section: {
                        _id: '/deportes'
                    }
                },
                subtype: '3'
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: allowList,
                    layout: undefined,
                    noteType: '3'
                })
            ).toBeFalsy();
        });

        test('should return false when the section note is not enable in the list', () => {
            const layout = 'LN-nota-foto-al-100';
            const globalContent = {
                taxonomy: {
                    primary_section: {
                        _id: '/espectaculos'
                    }
                }
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: allowList,
                    layout
                })
            ).toBeFalsy();
        });

        test('should return falsy when the allowedList is not defined', () => {
            const globalContent = {
                taxonomy: {
                    primary_section: {
                        _id: '/espectaculos'
                    }
                }
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: undefined,
                    layout: 'LN-Acumulado'
                })
            ).toBeFalsy();
        });

        test('should return falsy when the elements in allowedList is not defined', () => {
            expect(isAllowedSection({})).toBeFalsy();
            expect(isAllowedSection()).toBeFalsy();
        });

        test('should return falsy when the section and layout in allowedList is not defined', () => {
            const globalContent = {
                taxonomy: {
                    primary_section: {
                        _id: '/deportes'
                    }
                }
            };

            expect(
                isAllowedSection({
                    globalContent,
                    listOfAllowedSection: allowList,
                    layout: undefined
                })
            ).toBeFalsy();
        });
    });
});
