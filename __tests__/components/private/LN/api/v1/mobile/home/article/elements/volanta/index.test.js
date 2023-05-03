import getFlyertext from '../../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/elements/volanta/index'

describe('volanta tests for texts afondo', () => {
    it('returns volanta in uppercase when lead is mixed case', () => {
        const article = {
            additionalProperties: {
              lead: 'Lead'
            },
            informationBox: {
                sectionAliasMobile: 'afondo'
              }
          };

        const flyertext = getFlyertext(article);
        expect(flyertext).toBe('LEAD');
      });
    
      it('returns volanta in uppercase when volanta.text is mixed case', () => {
        const article = {
            label: {
              volanta: {
                text: 'Volanta text'
              }
            },
            informationBox: {
              sectionAliasMobile: 'afondo'
            }
          };
		
        const flyertext = getFlyertext(article);
        expect(flyertext).toBe('VOLANTA TEXT');
      });
    
      it('returns an empty string if volanta.text is empty', () => {
        const article = {
            label: {
              volanta: {
                text: ''
              }
            },
            informationBox: {
              sectionAliasMobile: 'afondo'
            }
          };
          
        const flyertext = getFlyertext(article);
        expect(flyertext).toBe('');
      });
      it('returns an empty string if lead empty', () => {
        const article = {
            additionalProperties: {
              lead: ''
            },
            informationBox: {
                sectionAliasMobile: 'afondo'
              }
          };
          
        const flyertext = getFlyertext(article);
        expect(flyertext).toBe('');
      });

      it('returns an empty string if volanta.text is undefined', () => {
        const article = {
            label: {
              volanta: {
                text: undefined
              }
            },
            informationBox: {
              sectionAliasMobile: 'afondo'
            }
          };
          
        const flyertext = getFlyertext(article);
        expect(flyertext).toBe('');
      });
      it('returns an empty string if lead undefined', () => {
        const article = {
            additionalProperties: {
              lead: undefined
            },
            informationBox: {
                sectionAliasMobile: 'afondo'
              }
          };
          
        const flyertext = getFlyertext(article);
        expect(flyertext).toBe('');
      });
});
describe('volanta tests for texts', () => { 
    it('returns volanta in same case when lead is mixed case', () => {
        const article = {
            additionalProperties: {
              lead: 'Lead'
            }
          };

        const flyertext = getFlyertext(article);
        expect(flyertext).toBe('Lead');
      });
    
      it('returns volanta in same case when volanta.text is mixed case', () => {
        const article = {
            label: {
              volanta: {
                text: 'Volanta text'
              }
            }
          };
		
        const flyertext = getFlyertext(article);
        expect(flyertext).toBe('Volanta text');
      });
    
      it('returns null if volanta.text is empty', () => {
        const article = {
            label: {
              volanta: {
                text: ''
              }
            }
          };
          
        const flyertext = getFlyertext(article);
        expect(flyertext).toBe(null);
      });
      it('returns an empty string if lead empty', () => {
        const article = {
            additionalProperties: {
              lead: ''
            }
          };
          
        const flyertext = getFlyertext(article);
        expect(flyertext).toBe('');
      });

      it('returns null if volanta.text is undefined', () => {
        const article = {
            label: {
              volanta: {
                text: undefined
              }
            }
          };
          
        const flyertext = getFlyertext(article);
        expect(flyertext).toBe(null);
      });
      it('returns null string if lead undefined', () => {
        const article = {
            additionalProperties: {
              lead: undefined
            }
          };
          
        const flyertext = getFlyertext(article);
        expect(flyertext).toBe(null);
      });
 })