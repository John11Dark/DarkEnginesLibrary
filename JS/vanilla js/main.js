// Global functions

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

// this is the browsers default alert and the below one i have created
// alert("Item added ");
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

// document variables
const userModePreference = window.matchMedia("(prefers-color-scheme: Dark)");
const header = document.querySelector("header");
const dropDownMenu = document.querySelector("dropDownMenu");
const userName = "John Muller";
const userNameLabel = document.querySelectorAll("[userName]");
const userAvatar = document.querySelector(".userAvatar");
const userAvatarURL = "/Assets/userAvatar.png";
const modeToggle = document.querySelector(".SwitchModes");
const logo = document.querySelector(".Logo");
const Logos = document.querySelectorAll(".Logo");

// set user name and avatar
userNameLabel.forEach((user) => {
  user.setAttribute("userName", userName);
  user.textContent = user.getAttribute("userName");
  userAvatar.src = userAvatarURL;
});

// theme mode starts here
if (userModePreference.matches) {
  Logos.forEach((logo) => {
    //Dark Mode
    logo.src = `/Assets/DarkEnginesLibraryLogoLight.png`;
  });
} else if (!userModePreference.matches) {
  //Light Mode
  Logos.forEach((logo) => {
    logo.src = `/Assets/DarkEnginesLibraryLogoDark.png`;
  });
}

modeToggle.addEventListener("click", () => {
  let mode = modeToggle.getAttribute("currentMode");
  let root = document.documentElement;

  if (mode === "Dark") {
    currentMode = "Light";
    modeToggle.setAttribute("currentMode", currentMode);
    root.style.setProperty("--primaryColorDark", "#fffeff");
    root.style.setProperty("--primaryCardColor", "#e2efffa2");
    root.style.setProperty("--primaryColorLight", "#181414");
    root.style.setProperty("--backgroundColor", "#d9e9f1");
    root.style.setProperty("--customBackgroundColorDarkMode", "#cbd9df");
    document.style = `color-scheme: light dark; transition: all 1s ease-in-out;`;
    document.body.style = `color-scheme: light dark; transition: all 1s ease-in-out;`;
    header.style = ` transition: all 0.75s ease-in-out;`;
    Logos.forEach((logo) => {
      logo.src = `/Assets/DarkEnginesLibraryLogo${mode}.png`;
    });
  } else if (mode === "Light") {
    currentMode = "Dark";
    modeToggle.setAttribute("currentMode", currentMode);
    root.style.setProperty("--primaryColorDark", "#181414");
    root.style.setProperty("--primaryCardColor", "#23282ea2");
    root.style.setProperty("--primaryColorLight", "#fffeff");
    root.style.setProperty("--backgroundColor", "#1d2325");
    root.style.setProperty("--customBackgroundColorDarkMode", "#488d9f");
    document.style = `color-scheme: dark light; transition: all 1s ease-in-out;`;
    document.body.style = `color-scheme: dark light; transition: all 1s ease-in-out;`;
    header.style = ` transition: all 0.75s ease-in-out;`;
    Logos.forEach((logo) => {
      logo.src = `/Assets/DarkEnginesLibraryLogo${mode}.png`;
    });
  }
});

dropDownMenu.addEventListener("click", () => {
  let isAriaExpanded = dropDownMenu.getAttribute("aria-expanded");

  if (isAriaExpanded === "false") {
    dropDownMenu.setAttribute("aria-expanded", true);
  } else if (isAriaExpanded === "true") {
    dropDownMenu.setAttribute("aria-expanded", false);
  }
});

const navBtn = document.querySelector(".navButton");
const navLinks = document.querySelectorAll(".pageLink");
const menu = document.querySelector(".mainNav");
navBtn.addEventListener("click", () => {
  // Menu visible
  isExpanded = navBtn.getAttribute("isToggled");
  if (isExpanded == "false") {
    console.log(isExpanded);
    navBtn.setAttribute("isToggled", "true");
    menu.setAttribute("isToggled", "true");
  } else if ( isExpanded == "true" ) {
    console.log(isExpanded);
    navBtn.setAttribute("isToggled", "false");
    menu.setAttribute("aria-expanded", "false");
  }

  // navigation Links animation

  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinksFadeAnim 0.5s  forwards ${
        index / 3 + 1.5
      }s`;
      link.style.animationDelay = `${index / 3 + 0.5}s`;
    }
  });
});
