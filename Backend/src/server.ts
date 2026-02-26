import express, { Application, Request, Response } from 'express';
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
const app: Application = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.get('/', (_req: Request, res: Response) => {
  res.send('API Node + TypeScript funcionando 🚀');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});