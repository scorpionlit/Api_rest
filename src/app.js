import express from "express";
import morgan from "morgan";
// Routes
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes); // Usa las nuevas rutas de usuario
export default app;
