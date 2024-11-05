import { body, matchedData } from "express-validator";

const loginValidation = {
  create: [
    body("email").isEmail(),
    body("password").optional().isLength({ min: 6 }),
    async (req, res, next) => {
      // if a password has been provided, then a confirmation must also be provided.
      const { password } = matchedData(req);
      if (password) {
        await body("passwordConfirmation")
          .equals(password)
          .withMessage("passwords do not match")
          .run(req);
      }

      // Check the validation errors, and update the user's settings.
    },
  ],
};
export default loginValidation;
