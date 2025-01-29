import BookGenerator from './class/BookGenerator';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export let db = {};

let bookGenerator = new BookGenerator()
bookGenerator.generate()

document.getElementById('form').addEventListener('change', (e) => {
    document.getElementById('faker-box').innerHTML = null;  
    bookGenerator = new BookGenerator()
    db = {};  
    bookGenerator.generate();
})

function assignNewSeed(seed){
    const seedInput = document.getElementById('seed');
    seedInput.value = seed;
    const event = new Event('change', { bubbles: true });
    seedInput.dispatchEvent(event);
}

document.getElementById('shuffle').addEventListener('click', function (e) {
    e.preventDefault();
    const randomSeed = Math.floor(Math.random() * 100000000);
    assignNewSeed(randomSeed);
});


const loadingTrigger = document.getElementById('loading-trigger');

const observer = new IntersectionObserver((entries) => {
    const trigger = entries[0];
    if (trigger.isIntersecting) {
        loadingTrigger.classList.remove('invisible')
        bookGenerator.add();
    }
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.7, 
});

observer.observe(loadingTrigger);

document.getElementById('likes').addEventListener('input', (e) => {
    console.log(e.target.value);
    const slider = document.getElementById('likes-slider-msg')
    slider.innerText = e.target.value;
}) 

// document.getElementById('switch-views').addEventListener('click', () => {

// })

document.getElementById('table-button').addEventListener('click', () => {
    switchViews('table');
})

document.getElementById('grid-button').addEventListener('click', () => {
    switchViews('grid');
})

function switchViews(view){
    document.getElementById('table-box').classList.add('hidden');
    document.getElementById('grid').classList.add('hidden');

    if (view === 'table') {
        document.getElementById('table-box').classList.remove('hidden');
    } else {
        document.getElementById('grid').classList.remove('hidden');
    }
}

function makeCard(book) {
    const div = document.createElement('div');
    const innderElements = `
        <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${book.title}</h5>
            </a>
            <p><span class="font-semibold">Author:</span> ${book.author}</p>
            <p><span class="font-semibold">Publisher:</span> ${book.publisher.name}, ${book.publishedYear}</p>
            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View
            </a>
    `
    div.innerHTML = innderElements;
    div.className = "max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700";
    return div;
}

export function populateGridView() {
    const grid = document.getElementById('grid');
    Object.keys(db).forEach(key => {
        const book = db[key];
        const card = makeCard(book);
        grid.appendChild(card);
    });
}

document.getElementById('download').addEventListener('click', function () {
    const rows = Object.entries(db).map(([bookId, book]) => {
        const firstReview = book.reviews.length > 0 ? book.reviews[0] : {};

        return {
            id: book.id,
            title: book.title,
            author: book.author,
            format: book.format,
            isbn: book.isbn,
            likes: book.likes,
            publishedYear: book.publishedYear,
            publisherName: book.publisher.name,
            publisherCountry: book.publisher.country,
            publisherEmail: book.publisher.email,
            reviewFullName: firstReview.fullName || "",
            reviewCompany: firstReview.company || "",
            reviewDate: firstReview.date ? new Date(firstReview.date).toISOString() : "",
            review: firstReview.review || ""
        };
    });


// Convert rows to CSV using PapaParse
const csv = Papa.unparse(rows);

// Create a Blob for CSV data and trigger download using FileSaver
const blob = new Blob([csv], { type: 'text/csv' });
saveAs(blob, 'books_data.csv');

}) 