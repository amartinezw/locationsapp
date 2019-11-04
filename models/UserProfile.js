import UserRole from './UserRole';

class UserProfile {
  constructor(id: Number, name: String, email: String, roles: Array<UserRole>) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.roles = roles;
  }

  static mapFromServiceResponse(serviceResponse: Object): UserProfile {
    const roles = [];
    console.log(serviceResponse);
    serviceResponse.data.roles.forEach((role) => {
      roles.push(UserRole.mapFromRoleServiceResponse(role));
    });
    return new this(
      serviceResponse.data.id,
      serviceResponse.data.name,
      serviceResponse.data.email,
      roles,
    );
  }

  static mapFromJson(jsonData: Object): UserProfile {
    let roles = [];
    if (jsonData.roles === null) {
      roles = null;
    } else {
      jsonData.roles.forEach((role) => {
        roles.push(UserRole.mapFromJson(role));
      });
    }
    return new this(jsonData.id, jsonData.name, jsonData.email, roles);
  }
}

export default UserProfile;
