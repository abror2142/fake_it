class Book {
    constructor (id, title, author, isbn, format, publisher, publishedYear, likes, reviews) {
        this.id = id 
        this.title = title,
        this.author = author,
        this.isbn = isbn,
        this.format = format,
        this.publisher = publisher,
        this.publishedYear = publishedYear,
        this.likes = likes,
        this.reviews = reviews,
        this.image = null
    }


    getTableRowHeader() {
        let tableRowHeader = document.createElement("tr")
        const id = this.id;
        tableRowHeader.innerHTML = `
            <td class="w-4 p-4">
                <span id=\"icon-1\" class=\"text-slate-800 transition-transform duration-300\">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                </span>
            </td>
            <th class="px-4 py-2 text-center">${id}</th>
            <td class="px-4 py-2 text-nowrap">${this.isbn}</td>
            <td scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${this.styleText(this.title)}
            </td>
            <td class="px-4 py-2 text-nowrap">${this.styleText(this.author)}</td>
            <td class="px-4 py-2 text-nowrap">
                ${this.styleText(this.publisher.name + ', ' + this.publishedYear, 30)}
            </td>
            <td class="px-4 py-2 flex justify-center items-center">
                <div id="spinner-${id}" class="flex items-center">
                    <div role="status">
                        <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div id="check-${id}" class="hidden w-4 h-4 text-gray-200" >
                    <svg class="text-green-500" fill="green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                </div>
            </td>
        `
        tableRowHeader.id = id;
        tableRowHeader.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        tableRowHeader.onclick = function(e) {
            toggleAccordion(id)
        };        

        return tableRowHeader;
    }

    styleText(word, len=30){
        if(word.length > len){
            const arr = word.split(' ');
            const arr1 = arr.slice(0, arr.length/2);
            const arr2 = arr.slice(arr.length/2);
            return `
                <div>
                    <div>${arr1.join(' ')}</div>
                    <div>${arr2.join(' ')}</div>
                </div>
            `
        }
        return word
    }

    generateReviews() {
        let div = document.createElement('div');
        for (let i = 0; i < this.reviews.length; i++) {
            const review = this.reviews[i];
            let innerDiv = document.createElement('div');
            innerDiv.innerHTML = `
                <div class="py-2 px-4 bg-gray-100 rounded-xl">
                    <div class="text-gray-800 text-[16px]">
                        ${review.review.charAt(0).toUpperCase() + String(review.review).slice(1)+'!'}
                    </div>
                    <div class="flex justify-between items-center">
                        <div class=\"flex gap-2 items-center ml-5">
                            -
                            <div class="text-gray-800">
                                ${review.fullName},
                            </div>
                            
                            <div class="text-gray-500">
                                from ${review.company}
                            </div>
                        </div> 
                        ${new Date(review.date).toLocaleDateString("en-CA").replace(/-/g, ".")}
                    </div>
                </div>
            `
            div.appendChild(innerDiv);
            div.className = "flex flex-col gap-4"
        }
        return div;
    }

    getTableRowData() {
        let tableRowData = document.createElement('tr');
        const reviewDiv = this.generateReviews();
        tableRowData.innerHTML = `
            <td colspan="7" class="pb-5">
                <div class="flex gap-4">
                    <div class="flex flex-col items-center gap-2 my-4 mx-5">
                        <div role="status" id="image-loader-${this.id}" class="animate-pulse">
                            <div class="flex items-center justify-center w-[240px] h-[320px] bg-gray-300 rounded-sm dark:bg-gray-700">
                                <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div id="image-div-${this.id}" class="w-[240px] h-[320px] overflow-hidden hidden relative">
                            <img id="image-${this.id}" class="w-full h-full object-cover object-center" />
                            <div class="absolute inset-0 flex flex-col justify-between items-center p-4 bg-black/40 text-white">
                                <h2 class="text-[clamp(14px,4vw,40px)] text-center leading-tight font-bold line-clamp-2">
                                    ${this.title}
                                </h2>
                                <p class="text-[clamp(12px,3.5vw,30px)] text-center leading-tight line-clamp-2">
                                    ${this.author}
                                </p>
                            </div>
                        </div>

                        <div class="text-blue-600 flex gap-1 items-center px-2 py-1 bg-gray-100 rounded-lg max-w-min">
                            ${this.likes}
                            <i class="fa-solid fa-thumbs-up"></i>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full mr-5 mt-5">
                    <div class="max-w-min ">
                        <div class="flex flex-col gap-2 px-6">
                            <p class="text-4xl text-gray-900 font-semibold text-nowrap">${this.title}</p>
                            <p class="text-xl text-gray-400 self-end">${this.format}</p>
                        </div>
                        <table class="text-left rtl:text-right text-[16px] text-gray-500 dark:text-gray-400">
                            <tr>
                                <th class="flex gap-2 items-center pr-3 py-2">
                                    <i class="fa-solid fa-stapler"></i>
                                    Publisher:
                                </th>
                                <td class="px-3 py-2">${this.publisher.name}</td>
                            </tr>
                            <tr>
                                <th class="flex gap-2 items-center pr-3 py-2">
                                    <i class="fa-solid fa-envelope"></i>    
                                    Email:
                                </th>
                                <td class="px-3 py-2">${this.publisher.email.toLowerCase()}</td>
                            </tr>
                            <tr>
                                <th class="flex gap-2 items-center pr-3 py-2">
                                    <i class="fa-solid fa-flag"></i>
                                    Country:
                                </th>
                                <td class="px-3 py-2">${this.publisher.country}</td>
                            </tr>
                        </table>
                    </div>
                    
                    ${reviewDiv.outerHTML}
                    </div>
                </div>
            </td>
        `
        tableRowData.className = 'hidden transition-all duration-300 ease-in-out'
        tableRowData.id = `content-${this.id}`
        tableRowData.colspan = 3

        return tableRowData;
    }

    imageView(imageUrl) {
        
    }
}

export default Book;