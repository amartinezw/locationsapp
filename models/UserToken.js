import moment from 'moment';

class UserToken {
  constructor(
    tokenType: String,
    expiresIn: Number,
    accessToken: String,
    refreshToken: String,
    lastRefresh: Date,
  ) {
    this.tokenType = tokenType;
    this.expiresIn = expiresIn;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.lastRefresh = lastRefresh;
  }

  isNotNull(): Boolean {
    return (
      this.tokenType !== null
      && this.expiresIn !== null
      && this.accessToken !== null
      && this.refreshToken !== null
      && this.lastRefresh !== null
    );
  }

  isAlive(): Boolean {
    return moment().diff(this.lastRefresh, 'seconds') < this.expiresIn;
  }

  static mapFromServiceResponse(serviceResponse: Object): UserToken {
    return new this(
      serviceResponse.data.token_type,
      serviceResponse.data.expires_in,
      serviceResponse.data.access_token,
      serviceResponse.data.refresh_token,
      moment().toISOString(),
    );
  }

  static mapFromJson(jsonData: Object): UserToken {
    return new this(
      jsonData.tokenType,
      jsonData.expiresIn,
      jsonData.accessToken,
      jsonData.refreshToken,
      jsonData.lastRefresh,
    );
  }
}

export default UserToken;
