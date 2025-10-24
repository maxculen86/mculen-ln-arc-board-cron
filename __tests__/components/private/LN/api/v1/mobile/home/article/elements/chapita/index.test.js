import {
    getBadgebyConfig,
    getChapitaText,
    isClosedContent,
    isXLorLSize,
    isMLSize,
    isSubExclusive,
    isDefaultStyle
} from '../../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/elements/chapita/index';

describe('components - private - LN - api - v1 - mobile - home - article - elements - chapita', () => {
    describe('when article is exclusive subscriber', () => {
        test.each([
            [
                {
                    content_restrictions: { content_code: 'cerrada' },
                    additionalProperties: { diseno: { size: 'XL' } },
                    informationBox: { sectionAliasMobile: 'some-section' }
                },
                'exclusive-ln',
                'Suscriptores',
                'Suscriptores'
            ],
            [
                {
                    content_restrictions: { content_code: 'cerrada' },
                    additionalProperties: { diseno: { size: 'L' } },
                    informationBox: { sectionAliasMobile: 'some-section' }
                },
                'exclusive-ln',
                'Suscriptores',
                'Suscriptores'
            ],
            [
                {
                    content_restrictions: { content_code: 'cerrada' },
                    additionalProperties: { diseno: { size: 'M' } },
                    informationBox: { sectionAliasMobile: 'some-section' }
                },
                null,
                null,
                null
            ]
        ])(
            'should return badgeStyle="exclusive-ln" badge="Exclusivo suscriptores" chapita="Exclusivo suscriptores" when article is closed in any size',
            (article, expectedBadgeStyle, expectedBadge, expectedChapita) => {
                const fieldsBadge = getBadgebyConfig(article);
                expect(fieldsBadge.badgeStyle).toBe(expectedBadgeStyle);
                expect(fieldsBadge.badge).toBe(expectedBadge);
                expect(fieldsBadge.chapita).toBe(expectedChapita);
            }
        );
        test.each([
            [
                {
                    content_restrictions: { content_code: 'cerrada' },
                    additionalProperties: { diseno: { size: 'XL' } },
                    informationBox: { sectionAliasMobile: 'sub-exclusive' }
                },
                null,
                null,
                null
            ],
            [
                {
                    content_restrictions: { content_code: 'cerrada' },
                    additionalProperties: { diseno: { size: 'L' } },
                    informationBox: { sectionAliasMobile: 'sub-exclusive' }
                },
                null,
                null,
                null
            ],
            [
                {
                    content_restrictions: { content_code: 'cerrada' },
                    additionalProperties: { diseno: { size: 'M' } },
                    informationBox: { sectionAliasMobile: 'sub-exclusive' }
                },
                null,
                null,
                null
            ]
        ])(
            'should return badgeStyle=null badge=null chapita=null when article is closed and article is in sectionAliasMobile="sub-exclusive any size',
            (article, expectedBadgeStyle, expectedBadge, expectedChapita) => {
                const fieldsBadge = getBadgebyConfig(article);
                expect(fieldsBadge.badgeStyle).toBeNull();
                expect(fieldsBadge.badge).toBeNull();
                expect(fieldsBadge.chapita).toBeNull();
            }
        );
    });
    describe('when article is CONTENT LAB', () => {
        it('should return fieldsBadge with badgeStyle="default", badge="CONTENT LAB", and chapita="CONTENT LAB" size="M"', () => {
            const article = {
                owner: {
                    sponsored: true
                },
                additionalProperties: {
                    diseno: { size: 'M' }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBe('default');
            expect(fieldsBadge.badge).toBe('CONTENT LAB');
            expect(fieldsBadge.chapita).toBe('CONTENT LAB');
        });

        it('should return fieldsBadge with badgeStyle="default", badge="CONTENT LAB", and chapita="CONTENT LAB" size="L"', () => {
            const article = {
                owner: {
                    sponsored: true
                },
                additionalProperties: {
                    diseno: { size: 'L' }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBe('default');
            expect(fieldsBadge.badge).toBe('CONTENT LAB');
            expect(fieldsBadge.chapita).toBe('CONTENT LAB');
        });

        it('should return fieldsBadge with badgeStyle="default", badge="CONTENT LAB", and chapita="CONTENT LAB" size="XL"', () => {
            const article = {
                owner: {
                    sponsored: true
                },
                additionalProperties: {
                    diseno: { size: 'XL' }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBe('default');
            expect(fieldsBadge.badge).toBe('CONTENT LAB');
            expect(fieldsBadge.chapita).toBe('CONTENT LAB');
        });
    });
    describe('when variant is liveblog', () => {
        it('should return fieldsBadge with badgeStyle="live", badge="VIVO", and chapita="VIVO" size="M"', () => {
            const article = {
                additionalProperties: {
                    variant: 'liveblog',
                    diseno: {
                        size: 'M'
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBe('live');
            expect(fieldsBadge.badge).toBe('VIVO');
            expect(fieldsBadge.chapita).toBe('VIVO');
        });
        it('should return fieldsBadge with badgeStyle="live", badge="VIVO", and chapita="VIVO" size="L"', () => {
            const article = {
                additionalProperties: {
                    variant: 'liveblog',
                    diseno: {
                        size: 'L'
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBe('live');
            expect(fieldsBadge.badge).toBe('VIVO');
            expect(fieldsBadge.chapita).toBe('VIVO');
        });
        it('should return fieldsBadge with badgeStyle="live", badge="VIVO", and chapita="VIVO" size="XL"', () => {
            const article = {
                additionalProperties: {
                    variant: 'liveblog',
                    diseno: {
                        size: 'XL'
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBe('live');
            expect(fieldsBadge.badge).toBe('VIVO');
            expect(fieldsBadge.chapita).toBe('VIVO');
        });
    });
    describe('all chapitas, not included: Live, Exclusivo suscriptor, content lab', () => {
        it('should return badgeStyle = null for article size "M" with defined text and badgeStyle "positive"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'M'
                    },
                    chapitaStyle: 'positive'
                },
                label: {
                    chapita: {
                        text: 'Some Text'
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
        });
        it('should return badgeStyle = default for article size "L" with defined text and badgeStyle "positive"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'L'
                    },
                    chapitaStyle: 'positive'
                },
                label: {
                    chapita: {
                        text: 'Some Text'
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toEqual('default');
        });
        it('should return badgeStyle = default for article size "XL" with defined text and badgeStyle "positive"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'XL'
                    },
                    chapitaStyle: 'positive'
                },
                label: {
                    chapita: {
                        text: 'Some Text'
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toEqual('default');
        });
        it('should show chapita for article size "L" with defined text and badgeStyle "positive"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'L'
                    },
                    chapitaStyle: 'positive'
                },
                label: {
                    chapita: {
                        text: 'Some Text'
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.chapita).toEqual('SOME TEXT');
        });
        it('should show chapita for article size "L" with defined text and badgeStyle "negative"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'L'
                    },
                    chapitaStyle: 'negative'
                },
                label: {
                    chapita: {
                        text: 'Some Text'
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.chapita).toEqual('SOME TEXT');
        });
        it('should not show chapita for article size "M"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'M'
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });

        it('should show chapita for article size "XL" with defined text and badgeStyle "positive"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'XL'
                    },
                    chapitaStyle: 'positive'
                },
                label: {
                    chapita: {
                        text: 'Some Text'
                    }
                },
                informationBox: {
                    sectionAliasMobile: 'some alias mobile'
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.chapita).toEqual('SOME TEXT');
        });
        it('should show chapita for article size "XL" with defined text and badgeStyle "negative"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'XL'
                    },
                    chapitaStyle: 'positive'
                },
                label: {
                    chapita: {
                        text: 'Some Text'
                    }
                },
                informationBox: {
                    sectionAliasMobile: 'some alias mobile'
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.chapita).toEqual('SOME TEXT');
        });
        it('should not show chapita for article size "L" with empty space', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'L'
                    },
                    chapitaStyle: 'default'
                },
                label: {
                    chapita: {
                        text: ' '
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });

        it('should not show chapita for article size "XL" with empty space', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'XL'
                    },
                    chapitaStyle: 'default'
                },
                label: {
                    chapita: {
                        text: ' '
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
        it('should not show chapita for article size "L" with . (dot)', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'L'
                    },
                    chapitaStyle: 'default'
                },
                label: {
                    chapita: {
                        text: '.'
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
        it('should not show chapita for article size "XL" with . (dot)', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'XL'
                    },
                    chapitaStyle: 'default'
                },
                label: {
                    chapita: {
                        text: '.'
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
        it('should not show chapita for article sizes "XL" and "L" with badgeStyle "exclusive-ln"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'XL'
                    },
                    chapitaStyle: 'exclusive-ln'
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });

        it('should not show chapita for article sizes "XL" and "L" with badgeStyle "live"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'L'
                    },
                    chapitaStyle: 'live'
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
        it('should not show chapita for article sizes "M" without badgeStyle and badgetext = "something"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'M'
                    },
                    chapitaStyle: '',
                    label: {
                        chapita: {
                            text: 'Some Text'
                        }
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
        it('should not show chapita for article sizes "L" without badgeStyle and badgetext = "something"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'L'
                    },
                    chapitaStyle: '',
                    label: {
                        chapita: {
                            text: 'Some Text'
                        }
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
        it('should not show chapita for article sizes "XL" without badgeStyle and badgetext = "something"', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'XL'
                    },
                    chapitaStyle: '',
                    label: {
                        chapita: {
                            text: 'Some Text'
                        }
                    }
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
    });
    describe('afondo', () => {
        it('should return badgeStyle="null" badge="null" chapita="" size:XL closedContent', () => {
            const article = {
                content_restrictions: {
                    content_code: 'cerrada'
                },
                additionalProperties: {
                    diseno: {
                        size: 'XL'
                    }
                },
                informationBox: {
                    sectionAliasMobile: 'afondo'
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
        it('should return badgeStyle="null" badge="null" chapita="" size:XL', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'XL'
                    }
                },
                informationBox: {
                    sectionAliasMobile: 'afondo'
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
        it('should return badgeStyle="null" badge="null" chapita="" size:L closedContent', () => {
            const article = {
                content_restrictions: {
                    content_code: 'cerrada'
                },
                additionalProperties: {
                    diseno: {
                        size: 'L'
                    }
                },
                informationBox: {
                    sectionAliasMobile: 'afondo'
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
        it('should return badgeStyle="null" badge="null" chapita="" size:L', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'L'
                    }
                },
                informationBox: {
                    sectionAliasMobile: 'afondo'
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
        it('should return badgeStyle="null" badge="null" chapita="" size:M closedContent', () => {
            const article = {
                content_restrictions: {
                    content_code: 'cerrada'
                },
                additionalProperties: {
                    diseno: {
                        size: 'M'
                    }
                },
                informationBox: {
                    sectionAliasMobile: 'afondo'
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
        it('should return badgeStyle="null" badge="null" chapita="" size:M', () => {
            const article = {
                additionalProperties: {
                    diseno: {
                        size: 'M'
                    }
                },
                informationBox: {
                    sectionAliasMobile: 'afondo'
                }
            };
            const fieldsBadge = getBadgebyConfig(article);
            expect(fieldsBadge.badgeStyle).toBeNull();
            expect(fieldsBadge.badge).toBeNull();
            expect(fieldsBadge.chapita).toBeNull();
        });
    });
    describe('inner functions', () => {
        describe('ClosedContent', () => {
            it("should return true when contentCode is 'cerrada'", () => {
                const contentCode = 'cerrada';
                const result = isClosedContent(contentCode);
                expect(result).toBe(true);
            });

            it("should return false when contentCode is not 'cerrada'", () => {
                const contentCode = 'abierta';
                const result = isClosedContent(contentCode);
                expect(result).toBe(false);
            });

            it('should return false when contentCode is null', () => {
                const contentCode = null;
                const result = isClosedContent(contentCode);
                expect(result).toBe(false);
            });

            it('should return false when contentCode is undefined', () => {
                const contentCode = undefined;
                const result = isClosedContent(contentCode);
                expect(result).toBe(false);
            });

            it('should return false when contentCode is empty', () => {
                const contentCode = '';
                const result = isClosedContent(contentCode);
                expect(result).toBe(false);
            });

            it('should return false when contentCode is a number', () => {
                const contentCode = 123;
                const result = isClosedContent(contentCode);
                expect(result).toBe(false);
            });
        });
        describe('xl or l size', () => {
            it("should return true when size is 'XL'", () => {
                const size = 'XL';
                const result = isXLorLSize(size);
                expect(result).toBe(true);
            });

            it("should return true when size is 'L'", () => {
                const size = 'L';
                const result = isXLorLSize(size);
                expect(result).toBe(true);
            });

            it('should return false when size is null', () => {
                const size = null;
                const result = isXLorLSize(size);
                expect(result).toBe(false);
            });

            it("should return false when size is other than 'XL' or 'L'", () => {
                const size = 'M';
                const result = isXLorLSize(size);
                expect(result).toBe(false);
            });

            it('should return false when size is an empty string', () => {
                const size = '';
                const result = isXLorLSize(size);
                expect(result).toBe(false);
            });

            it('should return false when size is a number', () => {
                const size = 10;
                const result = isXLorLSize(size);
                expect(result).toBe(false);
            });
        });
        describe('m size', () => {
            it("should return true when size is 'M'", () => {
                const size = 'M';
                const result = isMLSize(size);
                expect(result).toBe(true);
            });

            it("should return false when size is not 'M'", () => {
                const size = 'L';
                const result = isMLSize(size);
                expect(result).toBe(false);
            });

            it('should return false when size is null', () => {
                const size = null;
                const result = isMLSize(size);
                expect(result).toBe(false);
            });

            it('should return false when size is undefined', () => {
                const size = undefined;
                const result = isMLSize(size);
                expect(result).toBe(false);
            });

            it('should return false when size is an empty string', () => {
                const size = '';
                const result = isMLSize(size);
                expect(result).toBe(false);
            });
        });
        describe('sub exclusive', () => {
            it("should return true when typeSeccion is 'sub-exclusive'", () => {
                const typeSeccion = 'sub-exclusive';
                const result = isSubExclusive(typeSeccion);
                expect(result).toBe(true);
            });

            it("should return false when typeSeccion is not 'sub-exclusive'", () => {
                const typeSeccion = 'regular';
                const result = isSubExclusive(typeSeccion);
                expect(result).toBe(false);
            });

            it('should return false when typeSeccion is null', () => {
                const typeSeccion = null;
                const result = isSubExclusive(typeSeccion);
                expect(result).toBe(false);
            });

            it('should return false when typeSeccion is undefined', () => {
                const typeSeccion = undefined;
                const result = isSubExclusive(typeSeccion);
                expect(result).toBe(false);
            });

            it('should return false when typeSeccion is an empty string', () => {
                const typeSeccion = '';
                const result = isSubExclusive(typeSeccion);
                expect(result).toBe(false);
            });

            it('should return false when typeSeccion is not a string', () => {
                const typeSeccion = 123;
                const result = isSubExclusive(typeSeccion);
                expect(result).toBe(false);
            });
        });
    });

    it('should prioritise badge from PageBuilder (additionalProperties) over Composer (label.chapita)', () => {
        const article = {
            additionalProperties: {
                diseno: { size: 'XL' },
                chapitaStyle: 'positive',
                chapita: 'PageBuilder Text'
            },
            label: {
                chapita: {
                    text: 'Composer Text'
                }
            },
            informationBox: { sectionAliasMobile: 'some alias mobile' }
        };

        const fieldsBadge = getBadgebyConfig(article);

        expect(fieldsBadge.chapita).toEqual('PAGEBUILDER TEXT');
        expect(fieldsBadge.badge).toEqual('PAGEBUILDER TEXT');
        expect(fieldsBadge.badgeStyle).toEqual('default');
    });

});
