const selectOptions = document.querySelector("#countriesCodeOptions");
const inputOptions = document.querySelector("#countriesCode");


fetch("../Assets/Data/countriesCode.json")
.then( response =>response.json())
.then( countries => {
    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = `${country.code} ${country.dialCode}`; 
        option.append(country.name);
        selectOptions.append(option);
        if (country.name == "Malta" || country.name == "malta"){
            inputOptions.setAttribute( "placeholder", `${country.code} ${country.dialCode}`);
        }
    });
        
});


