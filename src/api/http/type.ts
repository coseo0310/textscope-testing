export type ResponseMetadata = {
  request_datetime: string;
  response_datetime: string;
  time_elapsed: string;
};

export type RequestType = {
  password: string;
};

export type User = {
  id: string;
  name: string;
  division: string;
  job_position: string;
  phone_number: string;
  authority: string;
  extension_number: string;
};

export type Token = {
  token: string;
  expires_after: string;
  created_at: string;
};

export type PostAuthToken = {
  request: RequestType;
  response_metadata: ResponseMetadata;
  token: Token;
};

export type GetAuthToken = {
  user: User;
  request: RequestType;
  response_metadata: ResponseMetadata;
};

export type DeleteAuthToken = {
  request: RequestType;
  response_metadata: ResponseMetadata;
};
