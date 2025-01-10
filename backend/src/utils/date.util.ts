export class DateUtil {
  static formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);

    if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
    if (format === 'DD-MM-YYYY') return `${day}-${month}-${year}`;

    return date.toISOString();
  }

  static addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  static isPastDate(date: Date): boolean {
    return new Date() > date;
  }
}
