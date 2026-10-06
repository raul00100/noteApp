import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'form-app',
  templateUrl: './form-note.html',
})
export class FormNote {
  titleNote: string = '';
  textNote: string = '';

  @Output() save = new EventEmitter<{ title: string; text: string }>();

  submit() {
    const noteData = {
      title: this.titleNote,
      text: this.textNote,
    };

    if (!noteData.title || !noteData.text) return;

    this.save.emit(noteData);

    this.titleNote = '';
    this.textNote = '';
  }
}
