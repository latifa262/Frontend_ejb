import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../src/shared/shared.module';
import { PasswordStrengthBarComponent } from '../../app/components/password/password-strength-bar/password-strength-bar.component';
import { RegisterComponent } from '../../app/components/register/register.component';
import { ActivateComponent } from '../../app/components/activate/activate.component';
import { PasswordComponent } from '../../app/components/password/password.component';
import { PasswordResetInitComponent } from '../../app/components/password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from '../../app/components/password-reset/finish/password-reset-finish.component';
import { SettingsComponent } from '../../app/components/settings/settings.component';
import { accountState } from '../../app/components/account.route';
import {AccountService} from "../core/auth/account.service";

@NgModule({
  imports: [SharedModule, RouterModule.forChild(accountState)],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
  ],
  providers: [AccountService]
})
export class AccountModule {}
