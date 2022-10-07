import makeRequest from './makeRequest';

export interface InAndOutResponse {
  id: string;
  userId: string;
  parentId: string | null;
  name: string;
  type: 'expense' | 'income';
  amount: number | null;
  description: string;
  year: number;
  month: number;
  date: number;
  createdAt: number;
}

export interface MonthlyBalanceResponse {
  amount: number;
  year: number;
  month: number;
}

export interface BalanceResponse extends MonthlyBalanceResponse {
  date: number;
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

export interface GetMonthlyBalanceRequest {
  userId?: string;
  year: number;
  month: number;
}

export interface GetMonthlyBalanceResponse {
  amount: number;
}

export interface CreateInAndOutRequest {
  userId?: string;
  parentId?: string;
  name: string;
  type: 'expense' | 'income';
  amount?: number;
  description?: string;
  year: number;
  month: number;
  date: number;
}

export interface DeleteInAndOutRequest {
  id: string;
}

export interface InputMonthlyBalanceRequest {
  userId?: string;
  amount: number;
  year: number;
  month: number;
}

export interface InputBalanceRequest extends InputMonthlyBalanceRequest {
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

export function getMonthlyBalance({
  userId,
  year,
  month,
}: GetMonthlyBalanceRequest) {
  return makeRequest<GetMonthlyBalanceResponse, GetMonthlyBalanceRequest>(
    `${prefix}/monthly-balance?userId=${userId}&year=${year}&month=${month}`
  );
}

export function createInAndOut({ userId, ...data }: CreateInAndOutRequest) {
  return makeRequest<InAndOutResponse, Omit<CreateInAndOutRequest, 'userId'>>(
    `${prefix}?userId=${userId}`,
    { method: 'POST', data }
  );
}

export function deleteInAndOut({ id }: DeleteInAndOutRequest) {
  return makeRequest<never, DeleteInAndOutRequest>(`${prefix}/${id}`, {
    method: 'DELETE',
  });
}

export function inputBalance({ userId, ...data }: InputBalanceRequest) {
  return makeRequest<BalanceResponse, Omit<InputBalanceRequest, 'userId'>>(
    `${prefix}/balance?userId=${userId}`,
    { method: 'POST', data }
  );
}

export function inputMonthlyBalance({
  userId,
  ...data
}: InputMonthlyBalanceRequest) {
  return makeRequest<
    MonthlyBalanceResponse,
    Omit<InputMonthlyBalanceRequest, 'userId'>
  >(`${prefix}/monthly-balance?userId=${userId}`, { method: 'POST', data });
}
