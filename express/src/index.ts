import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());

const jwtSecret = 'someJwtSecret';

app.post('/login', (req: Request, res: Response) => {
  const email = 'test@email.com';
  const password = '123';
  const { body }: { body: { email: string, password: string } } = req;

  if (body.email !== email || body.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Credential error',
    });
  }

  const payload = {
    email,
  };
  const accessToken = jwt.sign(payload, jwtSecret, {
    expiresIn: 60,
  });

  res
    .status(200)
    .json({
      success: true,
      message: 'Signup success fully',
      accessToken: accessToken,
      refreshToken: 'someRefreshToken',
    });
});

app.get('/refresh-token', (req: Request, res: Response) => {
  const refreshToken = req.cookies['refreshToken'];
  if (!refreshToken) {
    return res.status(404).json({ message: 'gak ada refresh tokennya' });
  }

  const payload = {
    email: 'some user email',
  };
  const newAccessToken = jwt.sign(payload, jwtSecret, {
    expiresIn: 60,
  });

  res
    .status(200)
    .json({
      success: true,
      message: 'Signup success fully',
      accessToken: newAccessToken,
    });
});

const port = 3003;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
