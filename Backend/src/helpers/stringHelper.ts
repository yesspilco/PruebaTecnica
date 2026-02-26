export class StringHelper {
  hideEmail(email: string) {
    const data = email.split("@");
    return data[0] + "@" + "xxxxx";
  }

  generateRandomSixDigitNumber(): number {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
