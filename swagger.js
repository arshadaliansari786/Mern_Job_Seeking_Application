import swaggerJSDoc from "swagger-jsdoc";


// Swagger options
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Sample app in Mern',
        version: '1.0.0',
        description: 'API for Sample app in Mern for Job Application',
      },
    },
    apis: ['./routes/applicationRouter.js', './routes/jobRouter.js', './routes/userRouter.js'],
  };
  

const swaggerSpec = swaggerJSDoc(swaggerOptions);
console.log('Swagger Specification:', swaggerSpec);
export default swaggerSpec
