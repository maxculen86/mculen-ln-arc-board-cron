import { useDialog } from '../hooks/useDialog';
import { Text } from '@ln/common-ui-text';
import { Header } from './header';
import { Disclaimer } from './disclaimer';
import { Dialog as DialogLib } from '@ln/common-ui-dialog';

import '../../../../../resources/packages/css/@ln/common-ui-dialog/index.css';

export const Dialog = ({ glossaryData = [] }) => {
    const { key, value, isOpen, onClose } = useDialog(glossaryData);

    return (
        <DialogLib
            position="bottom"
            isOpen={isOpen}
            onClose={onClose}
            classnames={{
                base: 'w-100 rounded-4 p-16 flex flex-column gap-8'
            }}
            id="drawer-glossary"
        >
            <DialogLib.Header
                className="flex-column gap-16"
                closeButtonProps={{
                    className: 'as-flex-end'
                }}
            >
                <Header keyGlossary={key} isDialog />
            </DialogLib.Header>
            <DialogLib.Body>
                <Text as="p" className="text-16">
                    {value}
                </Text>
            </DialogLib.Body>
            <DialogLib.Footer>
                <Disclaimer />
            </DialogLib.Footer>
        </DialogLib>
    );
};
