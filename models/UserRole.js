import RolePivot from './RolePivot';

class UserRole {
  constructor(id: Number, name: String, createdAt: String, updatedAt: String, pivot: RolePivot) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.pivot = pivot;
  }

  static mapFromRoleServiceResponse(roleServiceResponse: Object): UserRole {
    return new this(
      roleServiceResponse.id,
      roleServiceResponse.name,
      roleServiceResponse.created_at,
      roleServiceResponse.updated_at,
      RolePivot.mapFromPivotServiceResponse(roleServiceResponse.pivot),
    );
  }

  static mapFromJson(jsonData: Object): UserRole {
    return new this(
      jsonData.id,
      jsonData.name,
      jsonData.createdAt,
      jsonData.updatedAt,
      RolePivot.mapFromJson(jsonData.pivot),
    );
  }
}

export default UserRole;
