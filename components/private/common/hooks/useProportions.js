import { getAspectRatio } from '../../../../content/sources/utils/getRatio';
import { STORYTELLING } from '../utils/subtypes/subtypeHelper';

const setProportion = (device, isAmp) =>
    ['mobile', 'tablet'].includes(device) || isAmp ? '2:3' : '3:2';

const useProportions = ({
    resizedUrls = [],
    device = 'desktop',
    isAmp,
    subtype
}) =>
    subtype === STORYTELLING || !subtype
        ? resizedUrls.filter(({ option }) => {
              const imageRatio = getAspectRatio(option.width, option.height);
              const proportion = setProportion(device, isAmp);

              return imageRatio === proportion;
          })
        : resizedUrls.filter(x => x.option.width !== 1276);

export default useProportions;
