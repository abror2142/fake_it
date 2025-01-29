import Book from "./Book";
import Review from "./Review";
import Publisher from "./Publisher";
import Worker from 'worker-loader!../worker.js'; 
import Form from "./Form";
import { populateGridView } from "../script";
import { fakerDE, fakerEN, fakerFR } from '@faker-js/faker';
import RandomImage from "./RandomImage";
import { db } from "../script";

class BookGenerator {
    constructor () {
        this.form = new Form();
        this.faker = this.getFaker();
        console.log(this.faker.person.fullName());
        this.randomFaker = new Math.seedrandom();
        this.id = 1;
        this.completedTasks = 0;
    }

    constructBook () {
        this.faker.seed(this.form.getSeed()+this.id);
        const book = new Book(
            this.id,
            this.getBookTitle(),
            this.getBookAuthor(),
            this.faker.commerce.isbn(),
            this.faker.book.format(), 
            this.getPublisher(),
            this.faker.number.int({ min: 1990, max: 2024 }),
            this.calculateProbability(this.form.getLikes()),
            this.generateReviews(this.form.getReviews())
        )
        this.id++;
        
        this.fetchBookImage(book);

        return book;
    }

    getPublisherEmail(name) {
        const cleanedName = RandomImage.getCleanedWords(name)
        const word1 = cleanedName.at(0) || "";
        const word2 = cleanedName.at(1) || "";
        return this.faker.internet.email({ firstName: word1, lastName: word2, allowSpecialCharacters: false })
    }

    getPublisher() {
        const publisherName =  this.faker.book.publisher()
        const publisher = new Publisher(
            publisherName,
            this.faker.location.country(),
            this.getPublisherEmail(publisherName)
        )
        return publisher;
    }

    getBookTitle() {
        if(this.faker == fakerDE || this.faker == fakerFR)
            return this.faker.word.words({ count: { min: 2, max: 3 } })
        return this.faker.book.title()
    }

    getBookAuthor() {
        if(this.faker == fakerDE || this.faker == fakerFR)
            return this.faker.person.fullName();
        return this.faker.book.author()
    }
    
    generateReviews(probabilityValue) {
        const probability = this.calculateProbability(probabilityValue);
        let reviews = [];
        for (let i = 0; i < probability; i++) {
            const review = new Review(
                this.faker.company.buzzPhrase(),
                this.faker.person.fullName(),
                this.faker.company.name(),
                this.faker.date.between({ from: '2000-01-01', to: Date.now() })
            );
            reviews.push(review);
        }
        return reviews;
    }
    
    calculateProbability(probability) {
        const pattern = this.form.getSeed() + this.id;
        const rand = new Math.seedrandom(this.form.getSeed() + this.id);
        const times = (n, fn) => {
            if (n < 0) throw new Error("The first argument cannot be negative.");
            return (arg) => {
                for (let i = Math.floor(n); i--;) arg = fn(arg);
                if (rand() < n % 1) arg = fn(arg);
                return arg;
            };
        };
        const reviews = times(probability, x => x + 1);
        return reviews(0); 
    }

    fetchBookImage(book) {
        const worker = new Worker(); // Create a new worker
        worker.postMessage({ title: book.title, id: book.id });

        worker.onmessage = (e) => {
            
            book.image = e.data.imageUrl;

            const id = e.data.id
            db[id] = book; // Saved;
            const spinner = document.getElementById(`spinner-${id}`);
        
            spinner.classList.add("hidden");
            const check = document.getElementById(`check-${id}`);
            check.classList.remove('hidden');

            const imageDiv = document.getElementById(`image-div-${id}`)
            imageDiv.classList.remove('hidden')
            const image = document.getElementById(`image-${id}`)
            image.src = e.data.imageUrl
            const imageLoader = document.getElementById(`image-loader-${id}`);
            imageLoader.classList.add('hidden')

            this.completedTasks++;
            console.log(this.completedTasks, this.form.getQuantity())
            if(this.completedTasks == this.form.getQuantity()) {
                this.unblockDownloadButton();
                populateGridView();
                this.unblockGridButton();
            }
        };

        worker.onerror = function(error) {
            console.error('Error in worker:', error);
        };
    }

    appendToTable (tableRow) {
        const tableBody = document.getElementById('faker-box');
        tableBody.appendChild(tableRow);
    }

    generate(num=this.form.getQuantity()) {
        this.blockDownloadButton()
        this.blockGridButton()
        this.faker.seed(this.seed) 
        for (let i = 0; i < num; i++) {
            const book = this.constructBook()
            const tableRowHeader = book.getTableRowHeader()
            this.appendToTable(tableRowHeader)
            const tableRowData = book.getTableRowData()
            this.appendToTable(tableRowData)
        }
    }

    add() {
        const newQ = parseInt(this.form.getQuantity()) + 10;
        this.form.setQuantity(newQ);
        this.generate(10);
    }

    getFaker() {
        const lang = this.form.getLanguage();
        const faker = lang === 'fr' ? fakerFR : lang === 'de' ? fakerDE : fakerEN;
        return faker;
    }

    blockDownloadButton(){
        console.log("Blocking")
        const btn = document.getElementById('download')
        btn.disabled = true
        const btnText = document.getElementById('downloadBtnText');
        btnText.innerText = "Loading..."
        const spinner = document.getElementById('download-spinner') 
        spinner.classList.remove('hidden')
    }

    blockGridButton(){
        const btn = document.getElementById('grid')
        btn.disabled = true
        const spinner = document.getElementById('grid-spinner') 
        spinner.classList.remove('hidden')
        const icon = document.getElementById('grid-icon') 
        icon.classList.add('hidden')
    }
    
    unblockGridButton(){
        const btn = document.getElementById('grid')
        btn.disabled = false
        const spinner = document.getElementById('grid-spinner') 
        spinner.classList.add('hidden')
        const icon = document.getElementById('grid-icon') 
        icon.classList.remove('hidden')
    }
    
    unblockDownloadButton(){
        console.log("Unblocking")
        const btn = document.getElementById('download')
        btn.disabled = false
        const btnText = document.getElementById('downloadBtnText');
        btnText.innerText = "Download"
        const spinner = document.getElementById('download-spinner')
        spinner.classList.add('hidden')
        console.log(btn, btnText)
    }
}

export default BookGenerator;