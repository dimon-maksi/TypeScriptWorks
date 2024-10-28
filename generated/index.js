var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    // Example book data
    const books = [
        {
            id: 1,
            title: "To Kill a Mockingbird",
            description: "A novel about the serious issues of rape and racial inequality.",
            author: "Harper Lee",
            language: "English",
            pages: 281,
        },
        {
            id: 2,
            title: "1984",
            description: "A dystopian novel set in a totalitarian society ruled by Big Brother.",
            author: "George Orwell",
            language: "English",
            pages: 328,
        },
        {
            id: 3,
            title: "The Great Gatsby",
            description: "A critique of the American Dream set in the Jazz Age.",
            author: "F. Scott Fitzgerald",
            language: "English",
            pages: 180,
        },
        {
            id: 4,
            title: "Pride and Prejudice",
            description: "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
            author: "Jane Austen",
            language: "English",
            pages: 279,
        },
        {
            id: 5,
            title: "The Catcher in the Rye",
            description: "A story about teenage alienation and loss.",
            author: "J.D. Salinger",
            language: "English",
            pages: 214,
        },
        {
            id: 6,
            title: "Moby-Dick",
            description: "The quest for vengeance against the white whale, Moby Dick.",
            author: "Herman Melville",
            language: "English",
            pages: 585,
        },
        {
            id: 7,
            title: "War and Peace",
            description: "A historical novel that intertwines the lives of several families during the Napoleonic Wars.",
            author: "Leo Tolstoy",
            language: "Russian",
            pages: 1225,
        },
        {
            id: 8,
            title: "Brave New World",
            description: "A dystopian novel exploring the implications of genetic engineering and social conditioning.",
            author: "Aldous Huxley",
            language: "English",
            pages: 268,
        },
        {
            id: 9,
            title: "The Hobbit",
            description: "A fantasy novel about the adventures of Bilbo Baggins.",
            author: "J.R.R. Tolkien",
            language: "English",
            pages: 310,
        },
        {
            id: 10,
            title: "The Alchemist",
            description: "A novel about a shepherd's journey to realize his personal legend.",
            author: "Paulo Coelho",
            language: "Portuguese",
            pages: 208,
        },
    ];
    const bookGallery = document.getElementById("book-gallery");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const bookTitle = document.getElementById("book-title");
    const bookDescription = document.getElementById("book-description");
    const bookAuthor = document.getElementById("book-author");
    const moreInfoBtn = document.getElementById("more-info-btn");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalAuthor = document.getElementById("modal-author");
    const modalLanguage = document.getElementById("modal-language");
    const modalPages = document.getElementById("modal-pages");
    const themeToggleBtn = document.getElementById("theme-toggle");
    let currentBook = books[0];
    // Function to fetch book covers
    const fetchBookCover = (book) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(book.title)}`);
            const data = yield response.json();
            if (data.items && data.items.length > 0) {
                // Return the first cover image found
                return (((_a = data.items[0].volumeInfo.imageLinks) === null || _a === void 0 ? void 0 : _a.thumbnail) ||
                    "https://via.placeholder.com/150x200");
            }
        }
        catch (error) {
            console.error("Error fetching book cover:", error);
        }
        return "https://via.placeholder.com/150x200"; // Fallback image
    });
    // Function to display books
    const displayBooks = (filteredBooks) => __awaiter(this, void 0, void 0, function* () {
        bookGallery.innerHTML = ""; // Clear previous books
        const coverPromises = filteredBooks.map((book) => __awaiter(this, void 0, void 0, function* () {
            const bookCoverUrl = yield fetchBookCover(book);
            return Object.assign(Object.assign({}, book), { coverUrl: bookCoverUrl });
        }));
        const booksWithCovers = yield Promise.all(coverPromises);
        booksWithCovers.forEach((book) => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("col-3", "mb-3");
            bookDiv.innerHTML = `
          <img src="${book.coverUrl}" alt="${book.title}" class="book-image" data-title="${book.title}" />
          <h5 class="text-center mt-2">${book.title}</h5>
        `;
            bookGallery.appendChild(bookDiv);
        });
    });
    // Initial display of all books
    displayBooks(books);
    // Search functionality
    searchButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchTerm));
        yield displayBooks(filteredBooks);
        // Reset search input if no books found
        if (filteredBooks.length === 0) {
            alert("No books found!");
            searchInput.value = "";
            yield displayBooks(books); // Optionally reset to show all books
        }
    }));
    // Optional: Add event listener for Enter key
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchButton.click();
        }
    });
    // Event delegation for book images
    bookGallery.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("book-image")) {
            const bookTitle = target.getAttribute("data-title");
            const book = books.find((b) => b.title === bookTitle);
            if (book) {
                displayBookDescription(book);
            }
        }
    });
    // Display book description
    const displayBookDescription = (book) => {
        bookTitle.textContent = book.title;
        bookDescription.textContent = book.description;
        bookAuthor.textContent = book.author;
        currentBook = book;
    };
    // Open modal with full book details
    moreInfoBtn.addEventListener("click", () => {
        modalTitle.textContent = currentBook.title;
        modalDescription.textContent = currentBook.description;
        modalAuthor.textContent = currentBook.author;
        modalLanguage.textContent = currentBook.language;
        modalPages.textContent = currentBook.pages.toString();
        const modal = new bootstrap.Modal(document.getElementById("bookModal"));
        modal.show();
    });
    // Theme toggle functionality
    const toggleTheme = () => {
        if (document.body.classList.contains("dark-theme")) {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
            themeToggleBtn.textContent = "Switch to Dark Theme";
            localStorage.setItem("theme", "light-theme");
        }
        else {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            themeToggleBtn.textContent = "Switch to Light Theme";
            localStorage.setItem("theme", "dark-theme");
        }
    };
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeToggleBtn.textContent =
            savedTheme === "dark-theme"
                ? "Switch to Light Theme"
                : "Switch to Dark Theme";
    }
    // Event listener for theme toggle button
    themeToggleBtn.addEventListener("click", toggleTheme);
});
