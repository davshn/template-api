export const schemas = {
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
  userEdit: {
    type: 'object',
    required: [],
    properties: {
      name: {
        type: 'string'
      },
      lastname: {
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
  },
  userRefresh: {
    type: 'object',
    required: ['refreshToken', 'deviceInfo'],
    properties: {
      refreshToken: {
        type: 'string'
      },
      deviceInfo: {
        type: 'string'
      }
    }
  },
  userLogout: {
    type: 'object',
    required: ['deviceInfo'],
    properties: {
      deviceInfo: {
        type: 'string'
      }
    }
  },
  changeRole: {
    type: 'object',
    required: ['userId', 'role'],
    properties: {
      userId: {
        type: 'string'
      },
      role: {
        type: 'string',
        enum: ['USER', 'ADMIN', 'ROOT']
      }
    }
  }
}
