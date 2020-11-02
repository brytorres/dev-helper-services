import { Project } from "src/app/projects/project.entity";
import { DevelopmentLogType } from "../development-log.constants";

export class EditDevelopmentLogDto {
  dateTime?: string;
  type?: DevelopmentLogType;
  accomplishments?: string;
  notes?: string;
  thingsLearned?: string;
  toResearch?: string;
  projects?: number[];
}