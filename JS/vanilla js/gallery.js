let counter = 0;
const aboutTopicParent = document.querySelector(".aboutTopic");
const TopicTemplate = document.querySelector(".galleryTopicsTemplate");
const topicsContainer = document.querySelector("#topicsContainer");
const contentTemplate = document.querySelector(".articleContentTemplate");
let topic = {};
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
      const articleContent =
        contentTemplate.content.cloneNode(true).children[0];
      const topicTitle = articleContent.querySelectorAll(".Title");
      const articleHeading = articleContent.querySelector(".whatIsTopic").content.cloneNode(true).children[0];

      topicTitle.forEach((title) => {
        title.textContent = topic.topicTitle;
      });
      topic.Topics.forEach((subject) => {
        const subjectHeading = articleHeading.querySelector(".articleHeading");
        const subjectParagraph = articleHeading.querySelector(
          ".articleDescription"
        );
        subjectHeading.textContent = (subject.topicHeading + subject.name)   ;
        subjectParagraph.textContent = subject.topicParagraph;
        aboutTopicParent.append(articleHeading);
      });
    });
  });
//  try {
//    nonExistentFunction();
//  } catch (error) {
//    console.error(error);
//    // expected output: ReferenceError: nonExistentFunction is not defined
//    // Note - error messages will vary depending on browser
//
//            /* cart */
//            const itemName = book.title;
//            cartIcon = cart.querySelector("use");
//            cart.addEventListener("click", (e) => {
//              element = e.target.parentElement;
//              isAddedToCart = element.getAttribute("isAddedToCart");
//              if (isAddedToCart === "false") {
//                element.setAttribute("isAddedToCart", true);
//                customAlert(itemName, "cart", true);
//                cartIcon.setAttribute("xlink:href", "#CART-BOOK-ICON-ADDED");
//              } else if (isAddedToCart === "true") {
//                element.setAttribute("isAddedToCart", false);
//                customAlert(itemName, "cart", true, true);
//                cartIcon.setAttribute("xlink:href", "#CART-BOOK-ICON");
//              }
//            });
//
//            /* favorite  */
//            favorite.addEventListener("click", (e) => {
//              element = e.target.parentElement;
//              isFavorite = element.getAttribute("isFavorite");
//              if (isFavorite === "false") {
//                element.setAttribute("isFavorite", true);
//                customAlert(itemName, "favorite", true);
//              } else if (isFavorite === "true") {
//                element.setAttribute("isFavorite", false);
//                customAlert(itemName, "favorite", true, true);
//              }
//            });
