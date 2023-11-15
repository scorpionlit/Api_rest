import { getConnection } from "../database/database";

const getProducts = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT IdProducto, NombreProducto, Precio FROM Productos");
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT IdProducto, NombreProducto, Precio FROM Productos WHERE IdProducto = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addProduct = async (req, res) => {
    try {
        const { NombreProducto, Precio } = req.body;

        if (NombreProducto === undefined || Precio === undefined) {
            res.status(400).json({ message: "Solicitud incorrecta. Por favor llena todos los espacios." });
        }

        const product = { NombreProducto, Precio };
        const connection = await getConnection();
        await connection.query("INSERT INTO Productos SET ?", product);
        res.json({ message: "Producto agregado." });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { NombreProducto, Precio } = req.body;

        if (id === undefined || NombreProducto === undefined || Precio === undefined) {
            res.status(400).json({ message: "Solicitud incorrecta. Por favor llena todos los espacios." });
        }

        const product = { NombreProducto, Precio };
        const connection = await getConnection();
        const result = await connection.query("UPDATE Productos SET ? WHERE IdProducto = ?", [product, id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM Productos WHERE IdProducto = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
};
