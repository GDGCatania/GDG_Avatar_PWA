/* eslint-disable no-restricted-globals */
self.addEventListener("message", async event => {
    if (!event) return;

    let imageUrl = event.data.includes(self.location.origin) ? event.data : self.location.origin + "\\" + event.data;

    const response = await fetch(imageUrl)
    const blob = await response.blob()

    // @ts-ignore
    self.postMessage({
        imageURL: event.data,
        blob: blob,
    });
});