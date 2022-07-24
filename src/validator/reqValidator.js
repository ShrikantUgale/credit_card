
export function validateCardData(cardObj) {

    const reqdFields = ['name', 'limit', 'cardNumber'];

    const isExist = reqdFields.every(key => Object.keys(cardObj).includes(key));
    const errorArr = [];

    if (isExist) {

        Object.keys(cardObj).forEach(element => {
            if (element === 'limit') {

                const numError = isNumber(cardObj);
                if (numError) errorArr.push(numError)
            }
            if (element === 'cardNumber') {

                const cardError = isValidCard(cardObj);
                if (cardError) {
                    errorArr.push(cardError);
                } else {
                    //Luhn's 10
                    const luhnCheck = isValidCreditCard(cardObj)
                    if (luhnCheck) errorArr.push(luhnCheck)

                }

            }

        })

    } else {
        errorArr.push({
            field: reqdFields,
            error: "One or more mandatory fields are missing"
        })
    }

    return errorArr;
}

export function isNumber({ limit }) {

    if (isNaN(limit)) {
        return {
            field: "Limit",
            error: "Limit should be a number."
        }
    }
}

export function isValidCard({ cardNumber }) {
    const isValidLength = cardNumber.length > 12 && cardNumber.length < 20;

    if (!isValidLength) {
        return {
            field: "cardNumber",
            error: "cardNumber should be string of 13 to 19 digits."
        }
    }

    if (isValidLength) {

        for (let i = 0; i < cardNumber.length; i++) {

            if (isNaN(cardNumber[i])) {
                return {
                    field: "cardNumber",
                    error: "cardNumber should be string of 13 to 19 digits."
                }
            }
        }
    }

}

export function isValidCreditCard({ cardNumber }) {

    const cardDigits = cardNumber.split('').map(Number);
    const sum = cardDigits
        .map((digit, idx) => idx % 2 === cardDigits.length % 2 ? handleDoubleDig(digit * 2) : digit)
        .reduce((acc, digit) => acc += digit, 0);

    return sum % 10 !== 0 ? {
        field: "cardNumber",
        error: "Invalid cardNumber entered."
    } : null;

}

export function handleDoubleDig(num) {
    return num > 9 ? num - 9 : num;
}