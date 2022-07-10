import dotenv from "dotenv";
import bcrypt from "bcrypt";

import pool from "../util/database";

dotenv.config();

const create: any = async (values: any) => {
  const { email, rut, name, paternallastname, maternallastname } = values;
  console.log(values)
  try {
    const result = await pool.query(
      "INSERT into users(email, rut, name, paternallastname, maternallastname) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [email, rut, name, paternallastname, maternallastname]
    );

    return { succes: true, data: result.rows[0], error: null };
  } catch (error) {
    return { succes: false, data: null, error: (error as Error).message };
  }
};

const assingPassword: any = async (values: any) => {
  const { id, password } = values;
  try {
    console.log("salt: ", process.env.SALT);
    const hash = await bcrypt.hash(password, 10);

    const res = await pool.query("UPDATE users SET hash = $2 WHERE id = $1", [
      id,
      hash,
    ]);

    console.log("res: ", res);
    return { succes: true, data: "Password set", error: null };
  } catch (error) {
    return { succes: false, data: null, error: (error as Error).message };
  }
};

const validate: any = async (values: any) => {
  const { email, password } = values;
  try {
    const result = await pool.query(
      "SELECT id, name, email as mail, rut, paternallastname, maternallastname, hash from users where email = $1",
      [email]
    );
    const { id, mail, name, rut, paternallastname, maternallastname, hash } =
      result.rows[0];
    const isValid = await bcrypt.compare(password, hash);
    return {
      succes: true,
      data: {
        id,
        email: mail,
        name,
        rut,
        paternallastname,
        maternallastname,
        isValid,
      },
      error: null,
    };
  } catch (error) {
    return {
      succes: false,
      data: null,
      error: (error as Error).message,
    };
  }
};

export { create, assingPassword, validate };
