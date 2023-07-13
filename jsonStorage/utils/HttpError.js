module.exports = class HttpError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  
    static BadRequest(message = "Bad Request") {
      return new HttpError(400, message);
    }
  
    static ForbiddenError() {
      return new HttpError(403, "Forbidden.");
    }
  
    static NotFoundError(message = "Not Found.") {
      return new HttpError(404, message);
    }
    
    static ConflictError(message = "Conflict.") {
      return new HttpError(409, message);
    }
  };