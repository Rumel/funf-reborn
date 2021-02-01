export enum ActionType {
  SET_BOOTSTRAP = 'SET_BOOTSTRAP',
  SET_GAME = 'SET_GAME',
  SET_LEAGUE = 'SET_LEAGUE',
  SET_LIVE = 'SET_LIVE',
  SET_PICKS = 'SET_PICKS',
  SET_TRANSACTIONS = 'SET_TRANSACTIONS',
}

export type Action = {
  type: ActionType;
  payload: any;
};

export interface League {
  admin_entry: number;
  closed: boolean;
  draft_dt: string;
  draft_pick_time_limit: number;
  draft_status: string;
  draft_tz_show: string;
  id: number;
  ko_rounds: number;
  make_code_public: boolean;
  max_entries: number;
  min_entries: number;
  name: string;
  scoring: string;
  start_event: number;
  stop_event: number;
  trades: string;
  transaction_mode: string;
  variety: string;
}

export interface LeagueEntry {
  entry_id: number;
  entry_name: string;
  id: number;
  joined_time: string;
  player_first_name: string;
  player_last_name: string;
  short_name: string;
  waiver_pick: number;
}

export interface StandingRow {
  last_rank: number;
  league_entry: number;
  matches_drawn: number;
  matches_lost: number;
  matches_played: number;
  matches_won: number;
  points_against: number;
  points_for: number;
  rank: number;
  rank_sort: number;
  total: number;
}

export interface Match {
  event: number;
  finished: boolean;
  league_entry_1: number;
  league_entry_1_points: number;
  league_entry_2: number;
  league_entry_2_points: number;
  started: boolean;
  winning_league_entry: any;
  winning_method: any;
}

export interface StateContext {
  bootstrap: any;
  game: any;
  leagues: {
    [id: string]: {
      league: League;
      league_entries: LeagueEntry[];
      standings: StandingRow[];
      matches: Match[];
    };
  };
  live: any;
  picks: any;
  transactions: any;
}

export interface StoreInterface {
  state: StateContext;
  dispatch: React.Dispatch<Action>;
}

export interface LeagueContext {
  id: number | null;
  league: League | null;
  league_entries: LeagueEntry[] | null;
  standings: StandingRow[] | null;
  matches: Match[] | null;
  picks: any;
  transactions: any;
}

export interface LeagueInterface {
  leagueState: LeagueContext;
  leagueDispatch: React.Dispatch<Action>;
}
