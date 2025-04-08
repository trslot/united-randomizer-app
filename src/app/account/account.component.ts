import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMessage: string = '';
  passwordSuccess: boolean = false;

  async changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordMessage = 'Passwords do not match.';
      this.passwordSuccess = false;
      return;
    }
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, this.currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, this.newPassword);
        this.passwordMessage = 'Password updated successfully.';
        this.passwordSuccess = true;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      } else {
        this.passwordMessage = 'No authenticated user.';
        this.passwordSuccess = false;
      }
    } catch (error: any) {
      console.error('Error updating password:', error);
      this.passwordMessage = 'Error updating password: ' + error.message;
      this.passwordSuccess = false;
    }
  }
}