const formText = document.querySelector(".form-text");
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button"); 
const formTo = document.querySelector(".form-to"); 
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");


selectTag.forEach((tag, id) => {

    for(const country_code in countries) {

        let selected;
        if(id == 0 && country_code == "en-GB") {
            selected = "selected";
        }else if(id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});


exchangeIcon.addEventListener("click", () => {
    let tempText       = formText.value;
    tempLang           = selectTag[0].value;
    formText.value     = formTo.value;
    selectTag[0].value = selectTag[1].value;
    formTo.value       = tempText;
    selectTag[1].value = tempLang;
})


translateBtn.addEventListener("click", () => {
   let text = formText.value;
   translateForm = selectTag[0].value;
   translateTo = selectTag[1].value;
   if(!text) return;
   formTo.setAttribute("placeholder", "Translating...")
   let apiUrl = `https://api.mymemory.translated.net/get?q=${text} World!&langpair=${translateForm}|${translateTo}`
   fetch(apiUrl).then(res => res.json()).then(data => {
    formTo.value = data.responseData.translatedText;
    formTo.setAttribute("placeholder", "Translating...")
   });
}); 


icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
       if(target.classList.contains("fa-copy")) {
          if(target.id == "form") {
             navigator.clipboard.writeText(formText.value);
          }else {
            navigator.clipboard.writeText(formTo.value);
          }
       }else {
        let utterance;
        if(target.id == "form") {
            utterance = new SpeechSynthesisUtterance(formText.value);
            utterance.lang = selectTag[0].value;
         }else {
            utterance = new SpeechSynthesisUtterance(formTo.value);
            utterance.lang = selectTag[1].value;
         }
         speechSynthesis.speak(utterance);
       }
    })
})


