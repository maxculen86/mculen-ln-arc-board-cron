import Consumer from 'fusion:consumer';
import pageSportsBuilderSections from '../config/LN-Home_Sports-PageBuilder.config.json';
import getPageElements from '../../private/LN/api/global/page';

const LNSportsHome = props => {
    const propsHome = {
        children: props.children,
        renderables: props.renderables,
        arcSite: props.arcSite,
        layout: 'LN-Home_Sports'
    };
    return getPageElements(propsHome);
};

LNSportsHome.sections = pageSportsBuilderSections;

export default Consumer(LNSportsHome);
