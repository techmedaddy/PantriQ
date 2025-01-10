export class ResponseUtil {
  static success(data: any, message = 'Operation successful') {
    return {
      status: 'success',
      message,
      data,
    };
  }

  static error(message = 'Operation failed', details?: any) {
    return {
      status: 'error',
      message,
      details,
    };
  }
}
