import express, { Application, Request, Response } from 'express';

const app: Application = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('API Node + TypeScript funcionando 🚀');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});