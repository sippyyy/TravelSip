export interface Login {
  username: string;
  password: string;
}

export interface Token {
  access: string;
  refresh: string;
}

export interface Verify {
  token: string | undefined | null;
}

export interface Refresh {
  refresh : string | undefined | null
}
