import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../modules/note.model';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'list-app',
  templateUrl: './list-note.html',
})
export class ListNote {
  @Input() notesList: Note[] = [];

  @Output() delete = new EventEmitter<number>();

  sendDelete(id: number) {
    this.delete.emit(id);
  }
}
