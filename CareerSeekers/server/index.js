import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import jobRouter from './routes/jobRoute.js';
import questionnairesRouter from './routes/questionnairesRouth.js';
import geneticAlgorithmRouter from './routes/geneticAlgorithmRoute.js';
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

// route for users
app.use("/server/user", userRouter);
// route for authintication
app.use("/server/auth", authRouter);
// route for job
app.use("/server/job", jobRouter);
// server questionnaires route to questionnaires
app.use("/server/questionnaires", questionnairesRouter);
// server geneticAlgorithm route to geneticAlgorithm
app.use("/server/geneticAlgorithm", geneticAlgorithmRouter);

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

// test if the server is running
app.get('/', (req, res) => { res.send('Server is running') }  );
