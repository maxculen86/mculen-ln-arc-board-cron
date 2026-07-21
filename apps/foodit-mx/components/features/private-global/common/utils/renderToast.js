export default function renderToast(props) {
    if (window?.LN?.observable?.publish) {
        window.LN.observable.publish('addToast', props);
    }
}
