import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import {LoginService} from "../controller/service/login.service";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [SharedModule],
  providers: [LoginService]
})
export class LoginModule {}
