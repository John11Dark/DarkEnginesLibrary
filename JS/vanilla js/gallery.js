let counter = 0;
const aboutTopicParent = document.querySelector(".aboutTopic");
const TopicTemplate = document.querySelector(".galleryTopicsTemplate");
const topicsContainer = document.querySelector("#topicsContainer");
const booksTemplate = document.querySelector(".bookCardsTemplate");

/* topics container */
const webDev = document.querySelector("#webDevelopmentTopic");
const dataAlgorithm = document.querySelector("#DataAlgorithmTopic");
const ai = document.querySelector("#artificialIntelligenceTopic");
const uiDesign = document.querySelector("#UIDesignTopic");

// expand button

const expandButton = document.querySelector("#expandButton");
const topicsCarousel = document.querySelector(".topicsCarousel");

async function fetchBooksCustomQuery(container, template, searchQuery) {
  await fetch(`https://api.itbook.store/1.0/search/${searchQuery}`)
    .then((res) => res.json())
    .then((data) => {
      data.books.forEach((book) => {
        if (counter >= 6) {
          //console.log(book); // for testing purposes
          const newContainer = container.querySelector(".books");
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

          // append the card to it's parent
          newContainer.append(card);
        }
      });
    });
}

fetch("/Assets/Data/galleryContinent.json")
  .then((res) => res.json())
  .then((topics) => {
    topics.forEach((topic) => {
      const topicCard = TopicTemplate.content.cloneNode(true).children[0];
      const dummyCard = topicCard.querySelector(".dummyCard");
      dummyCard.src = topic.coverPath;
      dummyCard.alt = topic.alternativeText;
      topicCard.setAttribute("initialID", topic.topicInitialID);
      topicsContainer.append(topicCard);
    });
  });

fetchBooksCustomQuery(webDev, booksTemplate, `web Development`);
fetchBooksCustomQuery(uiDesign, booksTemplate, `Graphic design`);
fetchBooksCustomQuery(ai, booksTemplate, `Artificial intelligence`);
fetchBooksCustomQuery(dataAlgorithm, booksTemplate, `Data algorithms`);
/* topic clickable objects */

function onClickSlideContent(object, objectToExpand) {
  object.addEventListener("click", () => {
    let isClicked = object.getAttribute("isToggled");
    if (isClicked === "false") {
      object.setAttribute("isToggled", "true");
      objectToExpand.setAttribute("isExpanded", "true");
    } else if (isClicked === "true") {
      object.setAttribute("isToggled", "false");
      objectToExpand.setAttribute("isExpanded", "false");
    }
  });
}

onClickSlideContent(expandButton, topicsCarousel);
