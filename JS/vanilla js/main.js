// Global variables

// Global functions
function querySelector(selector, parent = document) {
  return parent.querySelector(selector);
}

function querySelectorAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
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
userNameLabel.forEach((user) => {
  user.setAttribute("userName", userName);
  user.textContent = user.getAttribute("userName");
  userAvatar.src = userAvatarURL;
});



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

dropDownMenu.addEventListener("click", () => {
  let isAriaExpanded = dropDownMenu.getAttribute("aria-expanded");

  if (isAriaExpanded === "false") {
    dropDownMenu.setAttribute("aria-expanded", true);
  } else if (isAriaExpanded === "true") {
    dropDownMenu.setAttribute("aria-expanded", false);
  }
});

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

  console.log(currentMode);
  console.log(logo);
});

// functions

function asideFadeIn() {
  let isOnMobileMode = screen.width <= 500;
  if (!isOnMobileMode) {
    asideFixed.setAttribute("onMobile", true);
    socialAsideLinks.forEach((link, index) => {
      // fade in each link individually
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `AsideLinksFadeAnim 0.5s linear forwards ${
          index / 3 + 1.2
        }s`;
        link.style.animationDelay = `${index / 4 + 0.1}s`;
      }
    });
  } else {
    asideFixed.setAttribute("onMobile", false);
  }
}




const navBtn = document.querySelector(".navButton");
const navLinks = document.querySelectorAll(".pageLink");
const menu = document.querySelector(".mainNav");
navBtn.addEventListener("click", () => {
  // Menu visible
  console.log("clicked");
  isToggled = menu.getAttribute("aria-expanded");
  console.log(navBtn.getAttribute("isToggled"));
  if (isToggled == "false") {
    navBtn.classList.add("tog");
    navBtn.setAttribute("isToggled", true);
    menu.setAttribute("aria-expanded", true);
  } else if (isToggled == "true") {
    navBtn.classList.remove("tog");
    navBtn.setAttribute("isToggled", false);
    menu.setAttribute("aria-expanded", false);
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



