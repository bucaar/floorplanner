function setupUI(){
    var textureSelect = document.getElementById("textureSelector");
    var colorSelect = document.getElementById("colorSelector");

    var toggleSelect = function(){
        var select = this.parentElement;
        if(select.classList.contains("closed"))
            select.classList.remove("closed");
        else
            select.classList.add("closed");
    };
    var submitSelect = function(){
        var optionsList = this.parentElement;
        var customSelect = optionsList.parentElement;
        var selectedContainer = customSelect.getElementsByClassName("custom-selected")[0];
        var selectedOption = selectedContainer.getElementsByClassName("custom-select-option")[0];
        customSelect.classList.add("closed");
        selectedOption.classList.remove("custom-select-placeholder");
        if(selectedOption.innerHTML === this.innerHTML)
            return;
        if(customSelect===textureSelect)
            filterColors(this.getAttribute("texturename"));
        selectedOption.innerHTML = this.innerHTML;
    };
    var filterColors = function(texture){
        
        colorSelect.classList.remove("hidden");
        var optionsContainer = colorSelect.getElementsByClassName("custom-select-options")[0];
        var options = optionsContainer.getElementsByClassName("custom-select-option");
        for (var i = 0; i < options.length; i++) {
            if(options[i].classList.contains(texture))
                options[i].classList.remove("hidden");
            else
                options[i].classList.add("hidden");
        }
        var selectedContainer = colorSelect.getElementsByClassName("custom-selected")[0];
        var selected = selectedContainer.getElementsByClassName("custom-select-option")[0];
        selected.textContent = "Select Color";
        selected.classList.add("custom-select-placeholder");
    };

    //click listener for the drop down expansion
    var customSelects = document.getElementsByClassName("custom-selected");
    for (var i = 0; i < customSelects.length; i++) {
        customSelects[i].onclick=toggleSelect;
    }

    //click listener for the drop down selection changed
    var customSelectOptions = document.getElementsByClassName("custom-select-options");
    for (var i = 0; i < customSelectOptions.length; i++) {
        var options = customSelectOptions[i].getElementsByClassName("custom-select-option");
        for (var j = 0; j < options.length; j++) {
            options[j].onclick=submitSelect;
        }
    }

    //set up color displays
    var colorBoxes = document.getElementsByClassName("color-box");
    for (var i = 0; i < colorBoxes.length; i++) {
        var cb = colorBoxes[i];
        var colorName = cb.parentElement.textContent;
        var colorCSS = colorToHex[colorName];
        cb.style.backgroundColor = colorCSS;
    }

    return {
        getTextureName: function(){
            var selectedContainer = textureSelect.getElementsByClassName("custom-selected")[0];
            var selected = selectedContainer.getElementsByClassName("custom-select-option")[0];
            return selected.textContent;
        },
        getColorName: function(){
            var selectedContainer = colorSelect.getElementsByClassName("custom-selected")[0];
            var selected = selectedContainer.getElementsByClassName("custom-select-option")[0];
            return selected.textContent;
        }
    };
}