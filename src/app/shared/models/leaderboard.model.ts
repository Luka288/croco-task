export interface LeaderboardItem {
  customerId: number;
  loginName: string;
  place: number;
  week: weekType;
}

export type weekType = 'I' | 'II' | 'III' | 'IV';
