export class EditIssueLogDto { 
  dateTime?: string;
  errorMessage?: string;
  errorStack?: any;
  errorDescription?: string;
  keywords?: string[];
  solution?: string;
  projects?: number[];
}