import makeRequest from './makeRequest';

export interface InAndOutResponse {
  id: string;
  userId: string;
  parentId: string | null;
  name: string;
  type: 'expense' | 'income';
  amount: number;
  description: string;
  year: number;
  month: number;
  date: number;
  createdAt: number;
}

export interface BalanceResponse {
  userId: string;
  amount: number;
  year: number;
  month: number;
  date: number;
  createdAt: number;
}

export interface GetInAndOutListRequest {
  userId?: string;
  totalDays: number;
  year: number;
  month: number;
  week: number;
}

export interface GetInAndOutListResponse {
  date: number;
  balance: number;
  income: number;
  expense: number;
}

export interface GetInAndOutByDateRequest {
  userId?: string;
  year: number;
  month: number;
  date: number;
}

export interface CreateInAndOutRequest {
  userId?: string;
  parentId?: string;
  name: string;
  type: 'expense' | 'income';
  amount: number;
  description?: string;
  year: number;
  month: number;
  date: number;
}

export interface InputBalanceRequest {
  userId?: string;
  amount: number;
  year: number;
  month: number;
  date: number;
}

const prefix = 'inandout';

export function getInAndOutList({
  userId,
  totalDays,
  year,
  month,
  week,
}: GetInAndOutListRequest) {
  return makeRequest<GetInAndOutListResponse[], GetInAndOutListRequest>(
    `${prefix}?userId=${userId}&totalDays=${totalDays}&year=${year}&month=${month}&week=${week}`
  );
}

export function getInAndOutByDate({
  userId,
  year,
  month,
  date,
}: GetInAndOutByDateRequest) {
  return makeRequest<InAndOutResponse[], GetInAndOutByDateRequest>(
    `${prefix}/date?userId=${userId}&year=${year}&month=${month}&date=${date}`
  );
}

export function createInAndOut({ userId, ...data }: CreateInAndOutRequest) {
  return makeRequest<InAndOutResponse, Omit<CreateInAndOutRequest, 'userId'>>(
    `${prefix}?userId=${userId}`,
    { method: 'POST', data }
  );
}

export function inputBalance({ userId, ...data }: InputBalanceRequest) {
  return makeRequest<BalanceResponse, Omit<InputBalanceRequest, 'userId'>>(
    `${prefix}/balance?userId=${userId}`,
    { method: 'POST', data }
  );
}
