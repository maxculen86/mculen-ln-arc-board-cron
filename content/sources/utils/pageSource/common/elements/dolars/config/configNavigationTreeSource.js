import navigationTreeSource from '../../../../../../navigationTreeSource';

export const getNavigationTreeSource = async query => {
    return navigationTreeSource.fetch(query);
};
