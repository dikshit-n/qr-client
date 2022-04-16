// yup
import * as yup from "yup";

// uniqid
import uniqId from "uniqid";

const phoneRegex =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

yup.addMethod(
  yup.string,
  "phone",
  function (errorMessage = "Invalid Phone number") {
    return this.test({
      name: "phone",
      message: errorMessage,
      test: (value: any) =>
        value?.toString()?.length > 4 ? phoneRegex.test(value) : true, // error message is displayed if we return true
    });
  }
);

yup.addMethod(
  yup.string,
  "password",
  function (errorMessage = "Invalid Phone number") {
    return this.test({
      name: "password",
      message: errorMessage,
      test: (value: any) => passwordRegex.test(value),
    });
  }
);

export { uniqId, yup };
