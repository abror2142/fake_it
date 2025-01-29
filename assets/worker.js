import RandomImage from "./class/RandomImage";

onmessage = async function(e) {
    const title = e.data.title;
    const id = e.data.id;
    const randomImage = new RandomImage(title);
    try {
        const url = await randomImage.getRandomImage();
        postMessage({ imageUrl: url, id: id });
    } catch (error) {
        console.error('Error fetching book image:', error);
        postMessage({ imageUrl: '' }); // Send an empty string in case of error
    }
};
