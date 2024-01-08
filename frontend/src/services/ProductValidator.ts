const ProductValidator = {
  validateDates(startDate: Date, endDate: Date): boolean {
    return startDate < endDate;
  },
  validateUrls(urls: Array<string>): boolean {
    const urlRegex = new RegExp(
      "(https?:/(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})",
    );
    return urls.length >= 3 && urls.every((url) => urlRegex.test(url));
  },
  validatePhoneNumber(phoneNumber: string): boolean {
    const urlRegex = /^(\+\d+)$/;
    return urlRegex.test(phoneNumber);
  },
};

export default ProductValidator;
