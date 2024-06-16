import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import jobRouter from './routes/jobRoute.js';
import questionnairesRouter from './routes/questionnairesRouth.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// Connect to MongoDB database 
mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});

const app = express();
app.use(express.json());

app.use(cookieParser());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);

// Test route the server is running
app.use("/server/user", userRouter);
// server auth route to signup
app.use("/server/auth", authRouter);
// server job route 
app.use("/server/job", jobRouter);
// server questionnaires route to questionnaires
app.use("/server/questionnaires", questionnairesRouter );
// server job route 
app.use("/server/job", jobRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message
  });
});

app.get('/', (req, res) => { res.send('Server is running') }  );
