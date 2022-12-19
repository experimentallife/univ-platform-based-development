export type PdfRequest = {
  html: string;
  fileName: string;
  margin: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  printBackground: boolean;
  format: 'A4';
};
