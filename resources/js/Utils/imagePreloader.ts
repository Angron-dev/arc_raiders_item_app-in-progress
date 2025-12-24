export function preloadImages(urls: string[]): Promise<void> {
    return Promise.all(
        urls.map(
            (src) =>
                new Promise<void>((resolve) => {
                    if (!src) return resolve();

                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // nie blokuj na błędzie
                })
        )
    ).then(() => undefined);
}
