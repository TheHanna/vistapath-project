import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { getRandomInt } from "../utils/utils";
import { CaseStatus, getRandomCaseStatus } from "./CaseStatus";
import {v4 as uuidv4 } from 'uuid';
import { AnnotatedImage } from "./AnnotatedImage";


export interface CaseAnalysisOptions {
  name: string;
  status?: CaseStatus;
  created?: Date;
  updated?: Date;
  images?: AnnotatedImage[]
}

export class CaseAnalysis {
  name: string;
  uuid: string;
  created: string;
  updated: string;
  status: CaseStatus = CaseStatus.OPENED;
  images: AnnotatedImage[] = [] as AnnotatedImage[];

  constructor({ name, status, created, updated }: CaseAnalysisOptions) {
    this.name = name;
    this.status = status ?? this.status;
    this.created = formatDistanceToNow(created ?? new Date());
    this.updated = formatDistanceToNow(updated ?? new Date());
    this.uuid = uuidv4();
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

export class CaseAnalysisCollection extends Array<CaseAnalysis> {
  private static instance?: CaseAnalysisCollection;
  
  static getInstance(): CaseAnalysisCollection {
    if (this.instance === undefined) {
      this.instance = new CaseAnalysisCollection();
    }
    return this.instance;
  }
  
  get activeInstance(): CaseAnalysisCollection {
    return CaseAnalysisCollection.getInstance();
  }
  
  findById = (uuid: string): CaseAnalysis | undefined =>
    CaseAnalysisCollection.getInstance()
      .find((c) => c.uuid === uuid ? c : null);

  findIndexById = (uuid: string): number =>
    CaseAnalysisCollection.getInstance()
      .findIndex((c) => c.uuid === uuid)
  
  findAllByStatus = (status: CaseStatus): CaseAnalysis[] => {
    return this.filter((value: CaseAnalysis) => value.status === status)
  }

  add = (caseAnalysis: CaseAnalysis[]) => {
    this.push(...caseAnalysis);
  }

  update = (updatedCase: CaseAnalysis): void => {
    const { uuid } = updatedCase;
    const currentCase = this.findById(uuid);
    const currentIndex = this.findIndexById(uuid);
    const mergedCase = {...currentCase, ...(updatedCase as CaseAnalysis)};
    CaseAnalysisCollection.getInstance()[currentIndex] = mergedCase;
  }

  cases = (): string[] => {
    return CaseAnalysisCollection.getInstance().map(CaseAnalysis.toString)
  }

  lastIndex = (): number => CaseAnalysisCollection.getInstance().length - 1;

  first = (): CaseAnalysis => this[0];

  last = (): CaseAnalysis => this[this.lastIndex()]
}


export interface CaseUpdate extends Partial<CaseAnalysis> { }
