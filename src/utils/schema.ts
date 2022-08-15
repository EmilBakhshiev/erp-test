import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup
    .string()
    .required("Это обязательное поле"),
  password: yup.string().required("Это обязательное поле"),
});

export default schema;