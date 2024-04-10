const libraryDisplay = document.getElementById('library');
    const addBookForm = document.getElementById('add-book-form');
    const deleteButton = document.createElement('button');

    const dialog = document.querySelector("dialog");
    const showButton = document.querySelector("dialog + button");
    const cancelButton = document.getElementById('cancel');

    showButton.addEventListener("click", () => {
    dialog.showModal();
    });
    cancelButton.addEventListener("click", () => {
      dialog.close();
    });

    const myLibrary = [
      {
        title: 'Loving God',
        author: 'Charles W. Colson',
        pages: '320',
        read: 'Not yet read',
    },
    {
        title: 'Ordering Your Private World',
        author: 'Gordon MacDonald',
        pages: '256 pages',
        read: 'read',
    },
    ];

    class Book {
      constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
      }
    }

    function addBookToLibrary(event) {
      event.preventDefault(); // Prevent default form submission

      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const pages = document.getElementById('pages').value;
      const read = document.getElementById('read').value;

      const newBook = new Book(title, author, pages, read);
      console.log(title, author, pages, read);
      myLibrary.push(newBook);
      console.log(newBook);

      // Clear form inputs
      addBookForm.reset();

      // Update library display
      updateLibraryDisplay();

      dialog.close();
    }

    function updateLibraryDisplay() {
      libraryDisplay.innerHTML = '';
    
      myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
          <h3>${index + 1}</h3>
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p>Status: ${book.read === 'read' ? 'Read' : 'Not Read'}</p>
          <button class="toggle-read-btn" data-index="${index}">Toggle Read</button>
          <button class="delete-book-btn" data-index="${index}">Delete Book</button>
        `;
        libraryDisplay.appendChild(bookDiv);
      });
    
      // Add event listeners to the buttons
      document.querySelectorAll('.toggle-read-btn').forEach(btn => {
        btn.addEventListener('click', toggleReadStatus);
      });
    
      document.querySelectorAll('.delete-book-btn').forEach(btn => {
        btn.addEventListener('click', deleteBook);
      });
    }
    
    function toggleReadStatus(event) {
      const index = event.target.dataset.index;
      const book = myLibrary[index];
      book.read = book.read === 'read' ? 'not-read' : 'read';
      updateLibraryDisplay(); // Re-render the library display after updating status
    }
    
    function deleteBook(event) {
      const index = event.target.dataset.index;
      myLibrary.splice(index, 1);
      updateLibraryDisplay(); // Re-render the library display after deletion
    }
    
    addBookForm.addEventListener('submit', addBookToLibrary);

    // Initial display of books
    updateLibraryDisplay();