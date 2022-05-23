const bookContainer = document.querySelectorAll(".books");
const bookCardTemplate = document.querySelector(".bookCardsTemplate");
const card = bookCardTemplate.content.cloneNode(true).children[0];
const cardISBN = card.querySelector(".ISBN");

const searchBar = document.querySelector(".searchBar");
const searchInput = document.querySelector(".searchBarInput");
//const query = document.querySelector(".Query");
searchBar.setAttribute("isIntersecting", "true");
let books = [];
let notifications = [];
let itemsAddedToCart = 0;

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  if (value != "") {
    query.textContent = value;
  } else {
    query.textContent = "new books";
  }

  books.forEach((book) => {
    const isVisible =
      book.title.toLowerCase().includes(value) ||
      book.subtitle.toLowerCase().includes(value);
    book.element.classList.toggle("hide", !isVisible);
  });
});

function copyToClipboard(object, Attribute) {
  const textContent = object.getAttribute(Attribute);
  navigator.clipboard.writeText(textContent);
  customAlert(textContent, "ClipBoard");
}

function removeAlertCard(object, duration = 1500) {
  object.style = `animation: slideOut 1s ease-out both`;
  setTimeout(() => {
    object.remove();
  }, duration);
  notifications.shift();
}

function customAlert(
  itemName,
  objectName,
  requireLink = false,
  itemRemoved = false
) {
  const alertCardParent = document.querySelector(".notificationCenter");
  const alertCard = document.querySelector(".alertCard").content.cloneNode(true)
    .children[0];
  const textLabel = alertCard.querySelector(".text");
  const link = alertCard.querySelector(".customAlertLink");
  const alertCloseBtn = alertCard.querySelector(".closeBtn");

  if (requireLink) {
    link.textContent = `View ${objectName} list`;
    link.href = `/pages/user#${objectName}`;
    link.title = `go to list ${objectName} page`;
  } else {
    link.setAttribute("notVisible", "true");
  }
  if (!itemRemoved) {
    textLabel.textContent = `${itemName} has been added successfully! \n to ${objectName} list`;
  } else {
    textLabel.textContent = `${itemName} has been removed successfully! \n from ${objectName} list`;
  }

  alertCardParent.appendChild(alertCard);
  setTimeout(() => {
    removeAlertCard(alertCard);
  }, 3000);

  alertCloseBtn.addEventListener("click", (e) => {
    notificationCard = e.target.parentElement;
    removeAlertCard(notificationCard);
  });
}

bookContainer.forEach((container) =>{
  const searchQuery = container.getAttribute("searchQuery") ;
  console.log(searchQuery);
  fetch(`https://api.itbook.store/1.0/search/${searchQuery}`)
  .then((res) => res.json())
  .then((data) => {
    books = data.books.map((book) => {
      // console.log(book); // for testing purposes
      const card = bookCardTemplate.content.cloneNode(true).children[0];
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
      return { title: book.title, subtitle: book.subtitle, element: card };
    });
  });
});



async function fetchBooks(parent, template, query, list = Null,  ){
  async function fetchBooks(parent, template, querySearch, list = Null,  ){
    await fetch(`https://api.itbook.store/1.0/${querySearch}`)
    .then((res) => res.json())
    .then((data) => {
      books = data.books.map((book) => {
        // console.log(book); // for testing purposes
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
  
        parent.append(card);
        return { title: book.title, subtitle: book.subtitle, element: card };
      });
    });
  
  }
  
  //fetchBooks(parent = bookContainer , template = bookCardTemplate, querySearch = "new")
}