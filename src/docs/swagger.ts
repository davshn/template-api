import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.3',
  info: {
    title: 'Documentation Adopt-Api',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'https://adoptapi.herokuapp.com'
    },
    {
      url: 'http://localhost:3000'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: {
      newUser: {
        type: 'object',
        required: ['name', 'lastname', 'documentNumber', 'documentType', 'email', 'password', 'phone'],
        properties: {
          name: {
            type: 'string'
          },
          lastname: {
            type: 'string'
          },
          documentNumber: {
            type: 'string'
          },
          documentType: {
            type: 'string',
            enum: ['CC', 'NI', 'CE']
          },
          email: {
            type: 'string'
          },
          password: {
            type: 'string'
          },
          phone: {
            type: 'string'
          }
        }
      },
      userLogin: {
        type: 'object',
        required: ['email', 'password', 'deviceInfo'],
        properties: {
          email: {
            type: 'string'
          },
          password: {
            type: 'string'
          },
          deviceInfo: {
            type: 'string'
          }
        }
      }
    }
  }
}

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts']
}

export default swaggerJSDoc(swaggerOptions)
