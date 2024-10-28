declare var bootstrap: any; // Add this line at the top of your TypeScript file

document.addEventListener("DOMContentLoaded", () => {
    // Define Book interface
    interface Book {
      id: number;
      title: string;
      description: string;
      author: string;
      language: string;
      pages: number;
      coverUrl?: string; // Optional property for cover URL
    }
  
    // Example book data
    const books: Book[] = [
      {
        id: 1,
        title: "To Kill a Mockingbird",
        description:
          "A novel about the serious issues of rape and racial inequality.",
        author: "Harper Lee",
        language: "English",
        pages: 281,
      },
      {
        id: 2,
        title: "1984",
        description:
          "A dystopian novel set in a totalitarian society ruled by Big Brother.",
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
        description:
          "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
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
        description:
          "The quest for vengeance against the white whale, Moby Dick.",
        author: "Herman Melville",
        language: "English",
        pages: 585,
      },
      {
        id: 7,
        title: "War and Peace",
        description:
          "A historical novel that intertwines the lives of several families during the Napoleonic Wars.",
        author: "Leo Tolstoy",
        language: "Russian",
        pages: 1225,
      },
      {
        id: 8,
        title: "Brave New World",
        description:
          "A dystopian novel exploring the implications of genetic engineering and social conditioning.",
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
        description:
          "A novel about a shepherd's journey to realize his personal legend.",
        author: "Paulo Coelho",
        language: "Portuguese",
        pages: 208,
      },
    ];
  
    const bookGallery = document.getElementById("book-gallery") as HTMLElement;
    const searchInput = document.getElementById("search-input") as HTMLInputElement;
    const searchButton = document.getElementById("search-button") as HTMLButtonElement;
    const bookTitle = document.getElementById("book-title") as HTMLElement;
    const bookDescription = document.getElementById("book-description") as HTMLElement;
    const bookAuthor = document.getElementById("book-author") as HTMLElement;
    const moreInfoBtn = document.getElementById("more-info-btn") as HTMLButtonElement;
    const modalTitle = document.getElementById("modal-title") as HTMLElement;
    const modalDescription = document.getElementById("modal-description") as HTMLElement;
    const modalAuthor = document.getElementById("modal-author") as HTMLElement;
    const modalLanguage = document.getElementById("modal-language") as HTMLElement;
    const modalPages = document.getElementById("modal-pages") as HTMLElement;
    const themeToggleBtn = document.getElementById("theme-toggle") as HTMLButtonElement;
  
    let currentBook: Book = books[0];
  
    // Function to fetch book covers
    const fetchBookCover = async (book: Book): Promise<string> => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            book.title
          )}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          // Return the first cover image found
          return (
            data.items[0].volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/150x200"
          );
        }
      } catch (error) {
        console.error("Error fetching book cover:", error);
      }
      return "https://via.placeholder.com/150x200"; // Fallback image
    };
  
    // Function to display books
    const displayBooks = async (filteredBooks: Book[]) => {
      bookGallery.innerHTML = ""; // Clear previous books
      const coverPromises = filteredBooks.map(async (book) => {
        const bookCoverUrl = await fetchBookCover(book);
        return { ...book, coverUrl: bookCoverUrl };
      });
  
      const booksWithCovers = await Promise.all(coverPromises);
  
      booksWithCovers.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("col-3", "mb-3");
        bookDiv.innerHTML = `
          <img src="${book.coverUrl}" alt="${book.title}" class="book-image" data-title="${book.title}" />
          <h5 class="text-center mt-2">${book.title}</h5>
        `;
        bookGallery.appendChild(bookDiv);
      });
    };
  
    // Initial display of all books
    displayBooks(books);
  
    // Search functionality
    searchButton.addEventListener("click", async () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm)
      );
      await displayBooks(filteredBooks);
  
      // Reset search input if no books found
      if (filteredBooks.length === 0) {
        alert("No books found!");
        searchInput.value = "";
        await displayBooks(books); // Optionally reset to show all books
      }
    });
  
    // Optional: Add event listener for Enter key
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchButton.click();
      }
    });
  
    // Event delegation for book images
    bookGallery.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("book-image")) {
        const bookTitle = target.getAttribute("data-title");
        const book = books.find((b) => b.title === bookTitle);
        if (book) {
          displayBookDescription(book);
        }
      }
    });
  
    // Display book description
    const displayBookDescription = (book: Book) => {
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

  
      const modal = new bootstrap.Modal(document.getElementById("bookModal") as HTMLElement);
      modal.show();
    });
  
    // Theme toggle functionality
    const toggleTheme = () => {
      if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        themeToggleBtn.textContent = "Switch to Dark Theme";
        localStorage.setItem("theme", "light-theme");
      } else {
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
  