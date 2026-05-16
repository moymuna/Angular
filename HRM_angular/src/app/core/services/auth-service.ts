import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Feature, Role, RolePermissions } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentRoleSubject = new BehaviorSubject<Role>(Role.SuperAdmin);
  public currentRole$ = this.currentRoleSubject.asObservable();

  constructor() {}

  get currentRole(): Role {
    return this.currentRoleSubject.value;
  }

  setRole(role: Role) {
    this.currentRoleSubject.next(role);
  }

  hasPermission(feature: Feature): boolean {
    const role = this.currentRole;
    const permissions = RolePermissions[role];
    return permissions ? permissions.includes(feature) : false;
  }
}
