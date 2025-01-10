export class LoggerUtil {
  static info(message: string, context?: string) {
    console.log(`[INFO] ${new Date().toISOString()} - ${context || 'App'}: ${message}`);
  }

  static error(message: string, context?: string, trace?: string) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${context || 'App'}: ${message}`);
    if (trace) console.error(`Trace: ${trace}`);
  }

  static warn(message: string, context?: string) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${context || 'App'}: ${message}`);
  }
}
