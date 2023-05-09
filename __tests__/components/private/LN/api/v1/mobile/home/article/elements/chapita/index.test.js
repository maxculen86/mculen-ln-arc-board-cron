import { getBadgebyConfig } from '../../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/elements/chapita/index';

describe('exclusive subscriber', () => {
    it('should return badgeStyle="exclusive-ln" badge="Exclusivo suscriptores" chapita="Exclusivo suscriptores when article is closed and article in XL"', () => {
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
                sectionAliasMobile: 'some-section'
            }
        };
        const fieldsBadge = getBadgebyConfig(article);
        expect(fieldsBadge.badgeStyle).toBe('exclusive-ln');
        expect(fieldsBadge.badge).toBe('Exclusivo suscriptores');
        expect(fieldsBadge.chapita).toBe('Exclusivo suscriptores');
    });
    it('should return badgeStyle="exclusive-ln" badge="Exclusivo suscriptores" chapita="Exclusivo suscriptores when article is closed and article in L"', () => {
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
                sectionAliasMobile: 'some-section'
            }
        };
        const fieldsBadge = getBadgebyConfig(article);
        expect(fieldsBadge.badgeStyle).toBe('exclusive-ln');
        expect(fieldsBadge.badge).toBe('Exclusivo suscriptores');
        expect(fieldsBadge.chapita).toBe('Exclusivo suscriptores');
    });
    it('should return badgeStyle=null badge=null chapita=null when article is closed and article in M"', () => {
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
                sectionAliasMobile: 'some-section'
            }
        };
        const fieldsBadge = getBadgebyConfig(article);
        expect(fieldsBadge.badgeStyle).toBeNull();
        expect(fieldsBadge.badge).toBeNull();
        expect(fieldsBadge.chapita).toBeNull();
    });
    it('should return badgeStyle=null badge=null chapita=null when article is closed and article is in sectionAliasMobile="sub-exclusive size=M"', () => {
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
                sectionAliasMobile: 'sub-exclusive'
            }
        };
        const fieldsBadge = getBadgebyConfig(article);
        expect(fieldsBadge.badgeStyle).toBeNull();
        expect(fieldsBadge.badge).toBeNull();
        expect(fieldsBadge.chapita).toBeNull();
    });
    it('should return badgeStyle=null badge=null chapita=null when article is closed and article is in sectionAliasMobile="sub-exclusive size=L"', () => {
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
                sectionAliasMobile: 'sub-exclusive'
            }
        };
        const fieldsBadge = getBadgebyConfig(article);
        expect(fieldsBadge.badgeStyle).toBeNull();
        expect(fieldsBadge.badge).toBeNull();
        expect(fieldsBadge.chapita).toBeNull();
    });
    it('should return badgeStyle=null badge=null chapita=null when article is closed and article is in sectionAliasMobile="sub-exclusive size=XL"', () => {
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
                sectionAliasMobile: 'sub-exclusive'
            }
        };
        const fieldsBadge = getBadgebyConfig(article);
        expect(fieldsBadge.badgeStyle).toBeNull();
        expect(fieldsBadge.badge).toBeNull();
        expect(fieldsBadge.chapita).toBeNull();
    });
});
describe('CONTENT LAB', () => {
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
describe('live', () => {
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
describe('all chapitas not included: Live, Exclusivo suscriptor, content lab', () => {
    it('should show chapita for article size "L" with defined text and badgeStyle "default"', () => {
        const article = {
            additionalProperties: {
                diseno: {
                    size: 'L'
                }, chapitaStyle: 'default'
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

    it('should show chapita for article size "XL" with defined text and badgeStyle "default"', () => {
        const article = {
            additionalProperties: {
                diseno: {
                    size: 'XL'
                },
                chapitaStyle: 'default',
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
                },chapitaStyle: 'default'
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
});
