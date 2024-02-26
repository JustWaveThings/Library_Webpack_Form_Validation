/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
import './style.css';

import drompDownMe from 'carlosfrontend-dropdown-generator';

/* const myLibrary = [];

// take two

const formContainer = document.querySelector('.form-container');

const form = document.createElement('form');
form.id = 'book-add';
form.name = 'book-add';

formContainer.appendChild(form);

const fieldset = document.createElement('fieldset');
fieldset.id = 'book-add-fieldset';
fieldset.name = 'book-add-fieldset';

const legend = document.createElement('legend');
legend.textContent = 'Add New Book';
fieldset.appendChild(legend);

// Section generator function
function createBookSection(labelName, inputType, inputId, inputPlaceholder, inputRequired = true) {
  const section = document.createElement('div');
  section.classList.add('form-control');
  fieldset.appendChild(section);

  const label = document.createElement('label');
  label.textContent = labelName;
  label.setAttribute('for', inputId);
  section.appendChild(label);

  const input = document.createElement(inputType);
  input.id = inputId;
  input.name = inputId;
  input.placeholder = inputPlaceholder;
  input.required = inputRequired;
  if (inputId === 'number') {
    input.min = 1;
    input.max = 5000;
    input.type = 'number';
  }
  if (inputId === 'title' || inputId === 'author') {
    input.type = 'text';
    input.minLength = 2;
    input.maxLength = 40;
  }
  section.appendChild(input);
}

createBookSection('*Title:', 'input', 'title', 'Enter title');
createBookSection('*Author:', 'input', 'author', 'Enter author');
createBookSection('*Pages:', 'input', 'number', 'Enter pages');

const formBtn = document.createElement('button');
formBtn.type = 'submit';
formBtn.id = 'btn';
formBtn.name = 'btn';
formBtn.textContent = 'Add Book';
fieldset.appendChild(formBtn);

form.appendChild(fieldset);

// script the validation
const formTitleCheckValid = document.getElementById('title');
const formAuthorCheckValid = document.getElementById('author');
const formPagesCheckValid = document.getElementById('number');

const Book = class {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
};

Book.prototype.bookIndex = function (length = 5) {
  this.index = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    this.index += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return this.index;
};

Book.prototype.addBookToLibrary = function () {
  this.bookIndex();
  myLibrary.push(this);
};

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 450, 'unread');
const book2 = new Book('Catch-22', 'Joseph Heller', 400, 'unread');
const book3 = new Book('Heart of Darkness', 'Joseph Conrad', 300, 'unread');
const book4 = new Book('Botany of Desire', 'Michael Pollan', 250, 'unread');

book1.addBookToLibrary();
book2.addBookToLibrary();
book3.addBookToLibrary();
book4.addBookToLibrary();

function addBook(event) {
  event.preventDefault();
  const sample = new Book(formTitle.value, formAuthor.value, formPages.value, formRead.value);
  sample.addBookToLibrary();
  emptyBookshelf();
  drawLibrary();
  clearForm();
}

function clearForm() {
  document.getElementById('book-add').reset();
}

const container = document.querySelector('#proj-cont');
function emptyBookshelf(parent = container) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function deleteBook(event) {
  const bookToBeDeletedIndex = event.currentTarget.dataset.indexValue;
  const foundIndex = myLibrary.findIndex(x => x.index === bookToBeDeletedIndex);
  myLibrary.splice(foundIndex, 1);
  emptyBookshelf();
  drawLibrary();
}

function setReadStatus(event) {
  const bookToChange = event.currentTarget.dataset.indexValue;
  const foundIndex = myLibrary.findIndex(x => x.index === bookToChange);
  if (myLibrary[foundIndex].readStatus === 'unread') {
    myLibrary[foundIndex].readStatus = 'read';
  }
  if (myLibrary[foundIndex].readStatus !== 'unread') {
    myLibrary[foundIndex].readStatus = 'unread';
  }
}

function drawLibrary() {
  let i = 0;
  do {
    displayBooksInArray(myLibrary[i]);
    i++;
  } while (i <= myLibrary.length - 1);

  function displayBooksInArray() {
    const bookContainer = document.createElement('li');
    bookContainer.classList.add('proj-item');

    const titleLabel = document.createElement('h4');
    titleLabel.classList.add('item-desc', 'book-title');
    titleLabel.textContent = 'Title:';

    const titleValue = document.createElement('h5');
    titleValue.classList.add('item-book-title');
    titleValue.id = 'title-cont';
    titleValue.textContent = myLibrary[i].title;

    const authorLabel = document.createElement('h4');
    authorLabel.classList.add('item-desc', 'author');
    authorLabel.textContent = 'Author:';

    const authorValue = document.createElement('h5');
    authorValue.classList.add('item-author');
    authorValue.id = 'author-cont';
    authorValue.textContent = myLibrary[i].author;

    const pagesLabel = document.createElement('h4');
    pagesLabel.classList.add('item-desc', 'pages');
    pagesLabel.textContent = 'Pages:';

    const pagesValue = document.createElement('h5');
    pagesValue.classList.add('item-pages');
    pagesValue.id = 'pages-cont';
    pagesValue.textContent = myLibrary[i].pages;

    const readLabel = document.createElement('h4');
    readLabel.classList.add('item-desc', 'read-toggle');
    readLabel.textContent = 'Read?:';

    const readValue = document.createElement('input');
    readValue.setAttribute('class', 'checkbox');
    readValue.id = 'checkbox';
    readValue.setAttribute('type', 'checkbox');
    readValue.setAttribute('name', 'checkbox');
    console.log(`On redraw/reload, for book ${i} the read status is: ${myLibrary[i].readStatus}`);
    if (myLibrary[i].readStatus === 'read') {
      readValue.checked = true;
    }
    readValue.dataset.indexValue = myLibrary[i].index;
    readValue.addEventListener('pointerup', event => {
      setReadStatus(event);
    });

    const deleteIcon = document.createElement('input');
    deleteIcon.setAttribute('type', 'button');
    deleteIcon.setAttribute('name', 'delete');
    deleteIcon.setAttribute('id', 'delete');
    deleteIcon.style.backgroundColor = 'red';
    deleteIcon.style.opacity = '0.3';

    deleteIcon.classList.add('delete');
    deleteIcon.textContent = 'Delete';
    deleteIcon.dataset.indexValue = myLibrary[i].index;
    deleteIcon.addEventListener('click', event => {
      deleteBook(event);
    });

    container.appendChild(bookContainer);
    bookContainer.appendChild(titleLabel);
    bookContainer.appendChild(titleValue);
    bookContainer.appendChild(authorLabel);
    bookContainer.appendChild(authorValue);
    bookContainer.appendChild(pagesLabel);
    bookContainer.appendChild(pagesValue);
    bookContainer.appendChild(readLabel);
    bookContainer.appendChild(readValue);
    bookContainer.appendChild(deleteIcon);
  }
}

const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const formPages = document.getElementById('pages');
const formRead = document.getElementById('readStatus');
const formButton = document.querySelector('#btn');
 drawLibrary();
*/
drompDownMe();
