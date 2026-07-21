import { useCallback, useRef } from 'react';

const usePrint = () => {
    const printRef = useRef(null);

    const waitForImagesToLoad = doc => {
        const images = Array.from(doc.images);
        if (images.length === 0) return Promise.resolve();

        return Promise.all(
            images.map(image => {
                if (image.complete) return Promise.resolve();

                return new Promise(resolve => {
                    const img = image;
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            })
        );
    };

    const handlePrint = useCallback(() => {
        if (!printRef.current) return;

        const isSafariMobile =
            /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;

        const printContent = printRef.current.innerHTML;

        const inlineStyles = Array.from(document.head.querySelectorAll('style'))
            .map(s => s.outerHTML)
            .join('\n');

        const html = `
      <html>
        <head>
          <title>Imprimir</title>
          ${inlineStyles}
          <style>* { -webkit-print-color-adjust: exact !important; }</style>
        </head>
        <body><main>${printContent}</main></body>
      </html>
    `;

        if (isSafariMobile) {
            const newWindow = window.open('', '', 'width=800,height=600');
            if (!newWindow) return;

            newWindow.document.write(html);
            newWindow.document.close();

            waitForImagesToLoad(newWindow.document).then(() => {
                newWindow.onafterprint = () => newWindow.close();
                newWindow.focus();
                newWindow.print();
            });
        } else {
            const iframe = document.createElement('iframe');
            Object.assign(iframe.style, {
                position: 'fixed',
                right: 0,
                bottom: 0,
                width: '0',
                height: '0',
                border: '0'
            });
            document.body.appendChild(iframe);

            iframe.onload = () => {
                waitForImagesToLoad(iframe.contentDocument).then(() => {
                    iframe.contentWindow.onafterprint = () => {
                        document.body.removeChild(iframe);
                    };
                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                });
            };

            iframe.srcdoc = html;
        }
    }, []);

    return { printRef, handlePrint };
};

export default usePrint;
