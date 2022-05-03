// Global variables


// Global functions 
function querySelector(selector, parent = document) {
    return parent.querySelector(selector);
}


function querySelectorAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

// document variables 

const dropDownMenu = document.querySelector('dropDownMenu');
const userName = "John Muller";
const userNameLabel = document.querySelector("#userName");


userNameLabel.setAttribute("userName", userName);
userNameLabel.textContent = userName;


dropDownMenu.addEventListener('click', () => {

    let isAriaExpanded = dropDownMenu.getAttribute("aria-expanded");

    if (isAriaExpanded === "false") {
        dropDownMenu.setAttribute("aria-expanded", true);
    }

    else if (isAriaExpanded === "true") {
        dropDownMenu.setAttribute("aria-expanded", false);
    }

});