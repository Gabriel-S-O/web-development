function validateMask(inputField) {
    const BLACKLIST = ['00000000000000', '11111111111111', '22222222222222', '33333333333333', '44444444444444', '55555555555555', '66666666666666', '77777777777777', '88888888888888', '99999999999999'];
    const CPF_LENGTH = 11;
    const CNPJ_LENGTH = 14;

    let inputValue = inputField.value.replace(/[^\d]/g, '');

    if (inputValue.length == CPF_LENGTH) {
        inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        inputField.maxLength = CPF_LENGTH + 3; // Add 3 for the dots and dash
    } else if (inputValue.length == CNPJ_LENGTH) {
        inputValue = inputValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        inputField.maxLength = CNPJ_LENGTH + 4; // Add 4 for the dots, slash, and dash
    } else {
        inputField.maxLength = CNPJ_LENGTH; // Set the default maxlength
    }

    inputField.value = inputValue;

    if (BLACKLIST.includes(inputValue)) {
        inputField.setCustomValidity("Invalid CPF/CNPJ!");
    } else {
        inputField.setCustomValidity("");
    }
}