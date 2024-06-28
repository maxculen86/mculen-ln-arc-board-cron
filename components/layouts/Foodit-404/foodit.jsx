import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import EmptyState from '../../features/foodit-global/common/emptyState/foodit';

const Foodit404 = () => {
    return (
        <BaseLayout>
            <EmptyState variant="404" direction="column" />
        </BaseLayout>
    );
};

Foodit404.sections = ['Cuerpo'];

export default Foodit404;
