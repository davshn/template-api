import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'

import { responses } from './responses'
import { schemas } from './schemas'

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.3',
  info: {
    title: 'Documentation Adopt-Api',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'https://backtemplate.rj.r.appspot.com'
    },
    {
      url: 'http://localhost:4000'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    responses,
    schemas
  }
}

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/docs/routes/*.ts']
}

export default swaggerJSDoc(swaggerOptions)
