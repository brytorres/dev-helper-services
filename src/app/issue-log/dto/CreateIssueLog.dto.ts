export class CreateIssueLogDto {
  dateTime: string;
  errorMessage: string;
  errorStack?: any;
  errorDescription?: string;
  keywords?: string[];
  solution?: string;
  projects?: number[];
}