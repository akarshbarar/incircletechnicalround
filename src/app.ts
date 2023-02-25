import express, { Request, Response } from "express";
import helmet from "helmet";
import { errorHandler, notFound } from "./middleware";
import morganMiddleware from "./middleware/morgon.middleware";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
const app = express();
//! Configuration for Swagger Docs
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS CRUD App',
      version: '1.0.0',
      description: 'NodeJs CRUD App',
    },
    servers: [
      {
        url: 'http://localhost:8080/api-docs/',
      },
    ],
  },
  apis: ['./src/api/**/*.ts'],
};
const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const whitelist = [undefined];

const corsOptionsDelegate = function (req: any, callback: any) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

app.use(morganMiddleware);
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json({ limit: "50000mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    status: "CRUD APP",
    msg: "APP is Working",
  });
});

// app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

export default app;
