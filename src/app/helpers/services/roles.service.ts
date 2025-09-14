import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { UserRoles } from "src/app/models/roles";



@Injectable()
export class RolesService {
    public userRoles = UserRoles;
}