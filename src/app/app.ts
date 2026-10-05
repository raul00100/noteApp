import { CommonModule, isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Note } from './modules/note.model';
import { ListNote } from './list-note/list-note';
import { FormNote } from './form-note/form-note';

@Component({
  imports: [CommonModule, ListNote, FormNote],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly notes = signal<Note[]>(JSON.parse(localStorage.getItem('notes') ?? '[]'));

  protected newNote = signal<Pick<Note, 'title' | 'text'>>({
    title: '',
    text: '',
  });

  protected addNote(noteData: Pick<Note, 'title' | 'text'>) {
    if (!noteData.title || !noteData.text) return;

    const newNote: Note = {
      id: Date.now(),
      title: noteData.title,
      text: noteData.text,
    };

    this.notes.update((notes) => [...notes, newNote]);
    localStorage.setItem('notes', JSON.stringify(this.notes()));
  }

  protected removeNote(id: number) {
    this.notes.update((notes) => notes.filter((note) => note.id !== id));
    localStorage.setItem('notes', JSON.stringify(this.notes()));
  }
}
