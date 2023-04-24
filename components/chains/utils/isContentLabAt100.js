import getChildrenBySection from './getChildrenBySection';
import checkChildInSection from './checkChildBySection';
import { LAYOUTS } from './common/_helpers-WebApi';
import sectionValidation from '../../layouts/config/LN10-Home.config.json';

const isContentLabAt100 = (chainId, layout, renderables = []) => {
    if (layout === LAYOUTS.CONTENT_LAB) {
        const content = getChildrenBySection({
            renderables,
            section: {
                title: 'Content',
                validation: sectionValidation
            }
        });

        return checkChildInSection(chainId, content);
    }

    return false;
};

export default isContentLabAt100;
