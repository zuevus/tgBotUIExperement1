    
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  styles: `
    .form {
      heigth: 70vh;
      justify-content: center;
    }
  `,
  template: `
    <form class="centered form">
      <h2 class="mb">Обратная связь</h2>
      <textarea
        [value]="feedback()"
        (input)="handleChange($event)"
        class="form-control"
      ></textarea>
    </form>
  `,
})
export class FeedbackComponent implements OnInit, OnDestroy {
    // создаем стейт через сигнал
    feedback = signal('');

    constructor(private telegram: TelegramService) {
        this.sendData = this.sendData.bind(this);
    }

    ngOnInit(): void {
      this.telegram.MainButton.setText('Отправить сообщение');
      this.telegram.MainButton.show();
      this.telegram.MainButton.disable();
      this.telegram.MainButton.onClick(this.sendData);
    }

    sendData() {
      // отправляем данные в телеграм
      this.telegram.sendData({ feedback: this.feedback() });
    }

    handleChange(event) {
        // изменение стейта при изменении textarea
        this.feedback.set(event.target.value);
        if (this.feedback().trim()) {
            this.telegram.MainButton.enable();
        } else {
            this.telegram.MainButton.disable();
        }
  }

    ngOnDestroy(): void {
        this.telegram.MainButton.offClick(this.sendData);
    }
}