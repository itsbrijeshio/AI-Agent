import zod from "zod";

const name = zod
  .string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  })
  .min(3, "Name must be at least 3 characters long")
  .max(20, "Name must be at most 20 characters long");

const email = zod
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .email("Invalid email format");

const password = zod
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(6, "Password must be at least 6 characters long")
  .max(20, "Password must be at most 20 characters long");

const signUpSchema = zod
  .object({
    name,
    email,
    password,
  })
  .strict();

const loginSchema = zod
  .object({
    email,
    password,
  })
  .strict();

export { signUpSchema, loginSchema };
