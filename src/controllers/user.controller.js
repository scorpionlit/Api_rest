// controllers/user.controller.js
import { getConnection } from "../database/database";



const registerUser = async (req, res) => {
    try {
        const { NombreUsuario, Password } = req.body;
        const conexion = await getConnection();

        // Verificar si el usuario ya existe
        const userExistsQuery = `SELECT * FROM Usuarios WHERE NombreUsuario = ?`;
        const userExists = await conexion.query(userExistsQuery, [NombreUsuario]);

        if (userExists.length > 0) {
            return res.status(200).json({ message: "El usuario ya existe" });
        }

        // Registrar nuevo usuario
        const registerUserQuery = `INSERT INTO Usuarios (NombreUsuario, Password) VALUES (?, ?)`;
        await conexion.query(registerUserQuery, [NombreUsuario, Password]);

        res.json({ message: "Usuario registrado" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const { NombreUsuario, Password } = req.body;
        const conexion = await getConnection();

        // Autenticar al usuario
        const loginUserQuery = `SELECT * FROM Usuarios WHERE NombreUsuario = ? AND Password = ?`;
        const user = await conexion.query(loginUserQuery, [NombreUsuario, Password]);

        if (user.length === 0) {
            return res.status(401).json({ message: "Error de autenticación" });
        }

        res.json({ message: "Usuario autenticado" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

 const userMethods = {
    registerUser,
    loginUser,
};
export default userMethods