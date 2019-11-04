class RolePivot {
  constructor(managerId: Number, roleId: Number) {
    this.managerId = managerId;
    this.roleId = roleId;
  }

  static mapFromPivotServiceResponse(pivotServiceResponse: Object): RolePivot {
    return new this(pivotServiceResponse.manager_id, pivotServiceResponse.role_id);
  }

  static mapFromJson(jsonData: Object): RolePivot {
    return new this(jsonData.managerId, jsonData.roleId);
  }
}

export default RolePivot;
