const bookContainer = document.querySelectorAll(".books");
const bookCardTemplate = document.querySelector(".bookCardsTemplate");
const card = bookCardTemplate.content.cloneNode(true).children[0];
const cardISBN = card.querySelector(".ISBN");

const searchBar = document.querySelector(".searchBar");
const searchInput = document.querySelector(".searchBarInput");
const query = document.querySelector(".Query");
searchBar.setAttribute("isIntersecting", "true");
let books = [];
const booksQuery = [];
let notifications = [];
let itemsAddedToCart = 0;

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  if (value != "") {
    query.textContent = value;
  } else {
    query.textContent = "new books";
  }

  booksQuery.forEach((book) => {
    const isVisible =
      book.title.toLowerCase().includes(value) ||
      book.subtitle.toLowerCase().includes(value);
    book.element.classList.toggle("hide", !isVisible);
  });
});


async function fetchBooksCustomQuery(container, template , searchQuery, searchList){
 await fetch(`https://api.itbook.store/1.0/search/${searchQuery}`)
  .then((res) => res.json())
  .then((data) => {
     data.books.forEach((book) => {
      //console.log(book); // for testing purposes
      const card = template.content.cloneNode(true).children[0];
      const frontCover = card.querySelector(".frontCover");
      const title = card.querySelector(".bookTitle");
      const description = card.querySelector(".bookDescription");
      const subtitle = card.querySelector(".bookSubtitle");

      const price = card.querySelector(".Price");
      const link = card.querySelector(".linkDirectory");
      const ISBN = card.querySelector(".ISBN");
      const cart = card.querySelector(".Cart");
      const favorite = card.querySelector(".Favorite");
      frontCover.src = book.image;
      card.style = `background-image: url(${book.image});`;
      title.textContent = book.title;
      subtitle.textContent = book.subtitle;
      description.textContent = book.desc;

      /* about book bottom part */
      price.textContent = book.price;

      link.href = book.url;
      link.setAttribute("title", `view book on \n"${book.url}"`);

      ISBN.setAttribute("ISBN", book.isbn13);
      ISBN.addEventListener("click", (e) => {
        copyToClipboard(ISBN, "ISBN");
      });

      /* cart */
      const itemName = book.title;
      cartIcon = cart.querySelector("use");
      cart.addEventListener("click", (e) => {
        element = e.target.parentElement;
        isAddedToCart = element.getAttribute("isAddedToCart");
        if (isAddedToCart === "false") {
          element.setAttribute("isAddedToCart", true);
          customAlert(itemName, "cart", true);
          cartIcon.setAttribute("xlink:href", "#CART-BOOK-ICON-ADDED");
        } else if (isAddedToCart === "true") {
          element.setAttribute("isAddedToCart", false);
          customAlert(itemName, "cart", true, true);
          cartIcon.setAttribute("xlink:href", "#CART-BOOK-ICON");
        }
      });

      /* favorite  */
      favorite.addEventListener("click", (e) => {
        element = e.target.parentElement;
        isFavorite = element.getAttribute("isFavorite");
        if (isFavorite === "false") {
          element.setAttribute("isFavorite", true);
          customAlert(itemName, "favorite", true);
        } else if (isFavorite === "true") {
          element.setAttribute("isFavorite", false);
          customAlert(itemName, "favorite", true, true);
        }
      });

      container.append(card);
      searchList.push({ title: book.title, subtitle: book.subtitle, element: card });
      return { title: book.title, subtitle: book.subtitle, element: card };
    });
  });
} 


bookContainer.forEach((container) =>{
  const searchQuery = container.getAttribute("searchQuery") ;
  //console.log(searchQuery);
  fetchBooksCustomQuery(container, bookCardTemplate , searchQuery, booksQuery );
});





