import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { getRandomInt } from "../utils/utils";
import { CaseStatus, getRandomCaseStatus } from "./CaseStatus";
import {v4 as uuidv4 } from 'uuid';
import { AnnotatedImage } from "./AnnotatedImage";


export interface CaseAnalysisOptions {
  name?: string;
  status?: CaseStatus;
  created?: Date;
  updated?: Date;
  images?: AnnotatedImage[];
  notes?: string;
}

export class CaseAnalysis {
  name: string;
  uuid: string;
  created: string;
  updated: string;
  status: CaseStatus = CaseStatus.OPENED;
  images: AnnotatedImage[] = [] as AnnotatedImage[];
  notes: string = '';

  constructor(options?: CaseAnalysisOptions) {
    this.uuid = uuidv4();
    this.name = options?.name ?? '';
    this.status = options?.status ?? this.status;
    this.created = formatDistanceToNow(options?.created ?? new Date());
    this.updated = formatDistanceToNow(options?.updated ?? new Date());
  }

  static fromString = (value: string): CaseAnalysis => {
    return JSON.parse(value) as CaseAnalysis;
  }

  static updateCase = (
    instance: CaseAnalysis,
    newValues: CaseUpdate
  ): CaseAnalysis => ({ ...instance, ...newValues });

  static toString = (instance: CaseAnalysis): string => {
    return JSON.stringify(instance);
  }

  static randomCaseName = (prefix: string = 'Case'): string =>
    `${prefix} ${CaseAnalysis.randomCaseNumber()}`;

  private static randomCaseNumber = (): string =>
    Array.from({ length: 5 },
      () => getRandomInt(0, 9)).join('');


  static generateCases = (length: number): CaseAnalysis[] =>
    Array.from({ length }, () => {
      const name = `Case ${this.randomCaseNumber()}`;
      const status = getRandomCaseStatus();
      return new CaseAnalysis({ name, status });
    });
}

export interface CaseUpdate extends Partial<CaseAnalysis> { }
