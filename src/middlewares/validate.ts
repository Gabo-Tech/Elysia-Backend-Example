// middlewares/validate.ts

import Validator from 'fastest-validator';

const v = new Validator({
    useNewCustomCheckerFunction: true, // using new version
    messages: {
        // Register our new error message text
        atLeastOneLetter: "The password value must contain at least one letter from a-z and A-Z ranges!",
        atLeastOneDigit: "The password value must contain at least one digit from 0 to 9!",
        specialCharacters: "The password value must contain at least one special character!"
    }
});

const schema = {
    id: 'string|objectId',
    name: 'string|min:2',
    username: 'string|min:2',
    email: 'email',
    password: {
        type: "string",
        custom: (v: any, errors: any) => {
            if (!/[0-9]/.test(v)) errors.push({ type: "atLeastOneDigit" });
            if (!/[a-zA-Z]/.test(v)) errors.push({ type: "atLeastOneLetter" });
            if (!/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(v)) errors.push({ type: "specialCharacters" });
            return v;
        },
        min: 8,
        max: 128,
        messages: {
            stringPattern: "pass value must contain a digit",
            stringMin: "The password value must contain at least 8 characters!",
            stringMax: "Your pass value is too large.",
        }
    }
}

export const validateParams = (req: any, res: any, next: any) => {
    // Validate request params
    const errors = v.validate(req.params, schema);
    if (errors) {
        return res.status(400).send({ errors });
    }

    next();
};

export const validateBody = (req: any, res: any, next: any) => {
    // Validate request body
    const errors = v.validate(req.body, schema);
    if (errors) {
        return res.status(400).send({ errors });
    }

    next();
};

