import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import Image from '../../../../ui/ln/image/default';
import Icon from '../../../../ui/ln/icon/default';
import useTrustProjectData from '../../../../../private/common/hooks/useTrustProjectData';

/**
 * @typedef {import('@ln/ds-common-image').ImageProps} ImageProps
 */

/**
 * Sello "Conforme a The Trust Project". Recibe un objeto ImageProps con el
 * logo del sello.
 *
 * @param {ImageProps} props
 * @returns {React.ReactElement}
 */
function TheTrustProject({ className, height = 20, ...imageProps }) {
    const { link: trustProjectLink } = useTrustProjectData();

    return (
        <Link {...trustProjectLink}>
            <div className="w-full flex flex-row items-center gap-4 md:w-auto">
                <span className="text-small-lg font-normal text-base-default">
                    Conforme a
                </span>
                <div className="h-20">
                    <Image
                        height={height}
                        className={className}
                        hidePlaceholder
                        {...imageProps}
                    />
                </div>
                <Icon
                    name="arrow-right"
                    size={16}
                    fill="var(--color-secondary-default, #333)"
                />
            </div>
        </Link>
    );
}

TheTrustProject.displayName = 'ArticleFooterUi.TheTrustProject';

export default TheTrustProject;
