import { Component, output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})
export class ToggleSwitchComponent {
  autoLogin = output<boolean>()


  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.autoLogin.emit(input.checked);
  }
}
