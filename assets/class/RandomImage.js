import { colorNames } from "./Utils";


class RandomImage {
    constructor (text) {
        this.text = text
    }

    static getCleanedWords(text) {
        const words = text.split(/[,\.\!\?&\s]+/);
        const cleanedWords = words.filter((word) => {
            const isValidWord = /^[A-Za-z\s]+$/.test(word);
            const wordCount = word.trim().length;
            return isValidWord && wordCount > 3;
        });
        return cleanedWords;
    }

    getRandomPattern () {
        const cleanedWords = RandomImage.getCleanedWords(this.text);
        if (cleanedWords.length == 0) {
            return "random";
        }
        const randomIndex = Math.floor(Math.random() * cleanedWords.length);
        return cleanedWords[randomIndex].toLowerCase();
    }

    getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colorNames.length);
        return colorNames[randomIndex].toLowerCase();
    }

    async getRandomImage(attempts=10) {
        const pattern = this.getRandomPattern();
        const color = this.getRandomColor();
        const imageUrl = `https://loremflickr.com/json/g/200/320/${pattern},${color}`;
        const url = `http://localhost:8000/faker/image?url=${imageUrl}`
        const resp = await fetch(url);
        const json = await resp.json();
        if(json['rawFileUrl'] != null)
            return json['rawFileUrl'];
        if (attempts <= 0)
            return json['file'];
        return this.getRandomImage(attempts-1);
    }
}

export default RandomImage;