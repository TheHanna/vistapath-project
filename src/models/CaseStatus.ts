import { getRandomInt } from "../utils/utils";

export enum CaseStatus {
  OPENED = 'Opened',
  SUBMITTED = 'Submitted',
  UPDATED = 'Updated',
  REJECTED = 'Rejected',
  APPROVED = 'Approved',
}

export enum CaseStatusAction {
  OPEN = 'Open',
  SUBMIT = 'Submit',
  UPDATE = 'Update',
  REJECT = 'Reject',
  APPROVE = 'Approve',
}

export const actionStatusMap: Record<CaseStatusAction, CaseStatus> = {
  [CaseStatusAction.OPEN]: CaseStatus.OPENED,
  [CaseStatusAction.SUBMIT]: CaseStatus.SUBMITTED,
  [CaseStatusAction.UPDATE]: CaseStatus.UPDATED,
  [CaseStatusAction.REJECT]: CaseStatus.REJECTED,
  [CaseStatusAction.APPROVE]: CaseStatus.APPROVED,
}

export const statusActionMap: Record<CaseStatus, CaseStatusAction[]> = {
  [CaseStatus.OPENED]: [CaseStatusAction.SUBMIT],
  [CaseStatus.SUBMITTED]: [CaseStatusAction.APPROVE, CaseStatusAction.REJECT],
  [CaseStatus.UPDATED]: [CaseStatusAction.APPROVE, CaseStatusAction.REJECT],
  [CaseStatus.REJECTED]: [CaseStatusAction.UPDATE],
  [CaseStatus.APPROVED]: [],
}

export const getNextActions = (status: CaseStatus): CaseStatusAction[] =>
  statusActionMap[status];

export const getNextStatus = (action: CaseStatusAction): CaseStatus =>
  actionStatusMap[action];

export const caseStatuses: string[] = [
  CaseStatus.OPENED.toString(),
  CaseStatus.SUBMITTED.toString(),
  CaseStatus.UPDATED.toString(),
  CaseStatus.REJECTED.toString(),
  CaseStatus.APPROVED.toString(),
];


export const isCaseStatus = (value: string): boolean => {
  return caseStatuses.includes(value);
}

export const getRandomCaseStatus = (): CaseStatus => {
  const statusIndex = getRandomInt(0, caseStatuses.length - 1);
  return caseStatuses[statusIndex] as CaseStatus;
}
