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

export interface Transaction {
  added: string;
  element_in: number;
  element_out: number;
  entry: number;
  event: number;
  id: number;
  index: number;
  kind: string;
  priority: number;
  result: string;
}

export interface Pick {
  element: number;
  position: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  multiplier: number;
}

export interface Game {
  current_event: number;
  current_event_finished: boolean;
  next_event: number;
  processing_status: string;
  trades_time_for_approval: boolean;
  waivers_processed: boolean;
}

export interface Player {
  id: number;
  assists: number | null;
  bonus: number | null;
  bps: number | null;
  clean_sheets: number | null;
  creativity: string | null;
  goals_conceded: number | null;
  goals_scored: number | null;
  ict_index: string | null;
  influence: string | null;
  minutes: number | null;
  own_goals: number | null;
  penalties_missed: number | null;
  penalties_saved: number | null;
  red_cards: number | null;
  saves: number | null;
  threat: string | null;
  yellow_cards: number | null;
  added: string | null;
  chance_of_playing_next_round: number | null;
  chance_of_playing_this_round: number | null;
  code: number | null;
  draft_rank: number | null;
  dreamteam_count: number | null;
  ep_next: any;
  ep_this: any;
  event_points: number | null;
  first_name: string | null;
  form: string | null;
  in_dreamteam: boolean | null;
  news: string | null;
  news_added: string | null;
  news_return: string | null;
  news_updated: string | null;
  points_per_game: string | null;
  second_name: string | null;
  squad_number: any | null;
  status: string | null;
  total_points: number | null;
  web_name: string | null;
  influence_rank: number | null;
  influence_rank_type: number | null;
  creativity_rank: number | null;
  creativity_rank_type: number | null;
  threat_rank: number | null;
  threat_rank_type: number | null;
  ict_index_rank: number | null;
  ict_index_rank_type: number | null;
  element_type: number | null;
  team: number | null;
}

export interface PlayerTypes {
  id: number;
  element_count: number;
  singular_name: string;
  singular_name_short: string;
  plural_name: string;
  plural_name_short: string;
}

export interface PlayerStatCategories {
  name: string;
  label: string;
  abbreviation: string;
  is_match_stat: boolean;
  match_stat_order: any;
  sort: string;
}

export interface Team {
  code: number;
  id: number;
  name: string;
  pulse_id: number;
  short_name: string;
}
export interface StateContext {
  players: Player[] | null;
  playerTypes: PlayerTypes[] | null;
  playerStatCategories: PlayerStatCategories[] | null;
  teams: Team[] | null;
  game: Game | null;
  live: any;
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
  picks: {
    [id: string]: Pick[];
  };
  transactions: Transaction[] | null;
}

export interface LeagueInterface {
  leagueState: LeagueContext;
  leagueDispatch: React.Dispatch<Action>;
}
