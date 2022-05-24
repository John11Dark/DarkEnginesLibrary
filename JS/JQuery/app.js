// custom alert function
function customAlert(message) {
  const alertCardParent = document.querySelector(".notificationCenter");
  const alertCard = document.querySelector(".alertCard").content.cloneNode(true)
    .children[0];
  const textLabel = alertCard.querySelector(".text");
  const link = alertCard.querySelector(".customAlertLink");
  const alertCloseBtn = alertCard.querySelector(".closeBtn");
  link.setAttribute("notVisible", "true");
  textLabel.textContent = message;

  alertCardParent.appendChild(alertCard);
  setTimeout(() => {
    removeAlertCard(alertCard);
  }, 3500);

  alertCloseBtn.addEventListener("click", (e) => {
    notificationCard = e.target.parentElement;
    removeAlertCard(notificationCard);
  });
}

const selectOptions = document.querySelector("#countriesCodeOptions");
const inputOptions = document.querySelector("#countriesCode");

fetch("/Assets/Data/countriesCode.json")
  .then((response) => response.json())
  .then((countries) => {
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = `${country.code} ${country.dialCode}`;
      option.append(country.name);
      selectOptions.append(option);
      if (country.name == "Malta" || country.name == "malta") {
        inputOptions.setAttribute(
          "placeholder",
          `${country.code} ${country.dialCode}`
        );
      }
    });
  });

/// input fields for validation
const phoneNumber = document.querySelector("#userNameInputField");
const fullName = document.querySelector("#phoneNumber");
const emailAddress = document.querySelector("#Email");
const message = document.querySelector("#messageBody");
const form = document.querySelector(".contactForm");

// vanilla js validation
/* form.addEventListener("submit", (e)=>{
    if( (phoneNumber.value != "") && (fullName.value != "") && (message.value != "") && (emailAddress.value != "") ){

        customAlert("mail sent successfully!");
        fullName.style.backgroundColor = `var(--primaryColorLight)`;
        phoneNumber.style.backgroundColor = `var(--primaryColorLight)`;
        emailAddress.style.backgroundColor = `var(--primaryColorLight)`;
        message.style.backgroundColor = `var(--primaryColorLight)`;
        fullName.value = "";
        phoneNumber.value = "";
        emailAddress.value = "";
        message.value = "";
        return true;
    }  
    else
    {
        e.preventDefault();
         if(fullName.value == ""){
            customAlert("enter name Please!..");
            fullName.style = " color: var(--primaryColorLight); background-color: var(--tertiaryColor);";
            fullName.setAttribute("placeholder", "enter your name please!"); 
          }
          
          else if (phoneNumber.value == "" ){
            customAlert("enter a phone number Please!..");
            phoneNumber.style = " color: var(--primaryColorLight); background-color: var(--tertiaryColor);";
            phoneNumber.setAttribute("placeholder", "enter phone number please!"); 
        }
          else if (emailAddress.value == "") {
            customAlert("enter email address Please!..");
            emailAddress.style = " color: var(--primaryColorLight); background-color: var(--tertiaryColor);";
            emailAddress.setAttribute("placeholder", "enter an email please!"); 
          } 
          else if( message == "") {
              customAlert("enter a message Please!..");
              message.style = " color: var(--primaryColorLight); background-color: var(--tertiaryColor);";
              message.setAttribute("placeholder", "enter a message please!"); 
          }
        return false;
    }
} );
 */

// Jquery validation

$(".contactForm").submit(function () {
  if (
    phoneNumber.value != "" &&
    fullName.value != "" &&
    message.value != "" &&
    emailAddress.value != ""
  ) {
    // alert("mail sent successfully!")
    customAlert("mail sent successfully!");
    fullName.style.backgroundColor = `var(--primaryColorLight)`;
    phoneNumber.style.backgroundColor = `var(--primaryColorLight)`;
    emailAddress.style.backgroundColor = `var(--primaryColorLight)`;
    message.style.backgroundColor = `var(--primaryColorLight)`;
    fullName.value = "";
    phoneNumber.value = "";
    emailAddress.value = "";
    message.value = "";
    return true;
  } else {
    // alert("fill all fields please")
    if (fullName.value == "") {
      customAlert("enter name Please!..");
      fullName.style =
        " color: var(--primaryColorLight); background-color: var(--tertiaryColor);";
      fullName.setAttribute("placeholder", "enter your name please!");
    } else if (phoneNumber.value == "") {
      customAlert("enter a phone number Please!..");
      phoneNumber.style =
        " color: var(--primaryColorLight); background-color: var(--tertiaryColor);";
      phoneNumber.setAttribute("placeholder", "enter phone number please!");
    } else if (emailAddress.value == "") {
      customAlert("enter email address Please!..");
      emailAddress.style =
        " color: var(--primaryColorLight); background-color: var(--tertiaryColor);";
      emailAddress.setAttribute("placeholder", "enter an email please!");
    } else if (message == "") {
      customAlert("enter a message Please!..");
      message.style =
        " color: var(--primaryColorLight); background-color: var(--tertiaryColor);";
      message.setAttribute("placeholder", "enter a message please!");
    }
    return false;
  }
});

// Jquery toggle button
// to try this function please try to disable the main js
//<script src="/JS/vanilla js/main.js" defer></script>
//if you try it while the other not disable
//one script will open it and the other one will close it
const newNavBtn = $(".navButton");
const newMenu = $(".mainNav");
newNavBtn.click(() => {
  // Menu visible
  isExpanded = newNavBtn.attr("isToggled");
  if (isExpanded === "false") {
    //console.log(isExpanded, "JQ");
    newNavBtn.attr("isToggled", "true");
    newMenu.attr("isToggled", "true");
  } else if (isExpanded === "true") {
    //console.log(isExpanded, "JQ");
    newNavBtn.attr("isToggled", "false");
    newMenu.attr("isToggled", "false");
  }
});
