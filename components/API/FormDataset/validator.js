class Validator {
  constructor() {
    // Validations
    this.validations = {
      required: {
        regex: /.*\S.*/,
        message: 'The field is required'
      },

      email: {
        regex: /\S+@\S+\.\S+/,
        message: 'The field should be an email'
      },

      url: {
        regex: /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
        message: 'The field should be an url'
      }
    };
  }

  validate(validations, value) {
    return validations.map((validation) => {
      const valid = this.validations[validation].regex.test(value || '');
      return {
        valid,
        error: (!valid) ? {
          message: this.validations[validation].message
        } : null
      };
    });
  }
}

export default Validator;
