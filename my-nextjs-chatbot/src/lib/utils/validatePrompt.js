// helper for validation

import ValidationError from "./validationError";

export default class ValidatePrompt{
    validateText(text) {
        const length = text?.length || 0; // if null text, will return 0

        // Throw error if prompt is null or blank
        if (length === 0) {
            throw new ValidationError("Received empty prompt. Please type in a prompt")
        }

        // Throw error if prompt is too long
        if (length > 1000) {
            throw new ValidationError(`Prompt is too long (${length} characters). Maximum limit: 1000 characters`)
        }
    }
}