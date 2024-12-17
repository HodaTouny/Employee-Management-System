/*
extract the data from the form, and then validate the each field by the required conditions.
and undifined is used to handle the case of edit when only send the to_edit data.
*/
// already handled in the frontend but created here to handle the case of testing using postman [assignment requiremnts]
const validateEmployee = (formData) => {
    const errors = [];
    const textOnlyRegex = /^[a-zA-Z\s]+$/;

    const { FirstName, LastName, EmployeeID, Designation, KnownLanguages } = formData;

    if (FirstName !== undefined) {
        if (!FirstName.trim()) {
            errors.push("First Name is required.");
        } else if (!textOnlyRegex.test(FirstName)) {
            errors.push("First Name must contain letters only.");
        }
    }

    if (LastName !== undefined) {
        if (!LastName.trim()) {
            errors.push("Last Name is required.");
        } else if (!textOnlyRegex.test(LastName)) {
            errors.push("Last Name must contain letters only.");
        }
    }

    if (Designation !== undefined) {
        if (!Designation.trim()) {
            errors.push("Designation is required.");
        } else if (!textOnlyRegex.test(Designation)) {
            errors.push("Designation must contain letters only.");
        }
    }

    if (EmployeeID !== undefined) {
        if (isNaN(EmployeeID) || EmployeeID <= 0) {
            errors.push("Employee ID must be a valid positive number.");
        }
    }

    if (KnownLanguages !== undefined) {
        if (!Array.isArray(KnownLanguages) || KnownLanguages.length === 0) {
            errors.push("Please add at least one language.");
        } else {
            KnownLanguages.forEach((lang, index) => {
                if (!lang.LanguageName || !lang.LanguageName.trim()) {
                    errors.push(`Language Name is required for entry ${index + 1}.`);
                }                
                if (isNaN(Number(lang.ScoreOutof100)) || lang.ScoreOutof100 < 0 || lang.ScoreOutof100 > 100) {
                    errors.push(
                        `Score for entry ${index + 1} must be a valid number between 0 and 100.`
                    );
                }
            });
        }
    }

    return errors;
};

module.exports = validateEmployee;