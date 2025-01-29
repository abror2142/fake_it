class Form{
    constructor() {
        this.language = this.getLanguage(),
        this.likes = this.getLikes(),
        this.reviews = this.getReviews()
    }

    getSeed() {
        const seedInput = document.getElementById('seed');
        return seedInput.value;
    }

    getLikes() {
        const likesInput = document.getElementById('likes');
        return likesInput.value;
    }

    getLanguage() {
        const languageInput = document.getElementById('language');
        return languageInput.value;
    }

    getReviews() {
        const reviewInput = document.getElementById('reviews');
        return reviewInput.value;
    }

    getQuantity() {
        const quantityInput = document.getElementById('quantity');
        return quantityInput.value;
    }

    setQuantity(num, bubble=false) {
        const quantityInput = document.getElementById('quantity');
        quantityInput.value = num;
        if (bubble) {
            const event = new Event('change', { bubbles: true });
            seedInput.dispatchEvent(event);
        }
    }

    
}

export default Form;