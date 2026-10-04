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
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly notes = signal<Note[]>([]);

  protected newNote = signal<Pick<Note, 'title' | 'text'>>({
    title: '',
    text: '',
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.notes.set(JSON.parse(localStorage.getItem('notes') ?? '[]'));
      });
    }
  }

  protected addNote(noteData: Pick<Note, 'title' | 'text'>) {
    if (!noteData.title || !noteData.text) return;

    const newNote: Note = {
      id: Date.now(),
      title: noteData.title,
      text: noteData.text,
    };

    this.notes.update((notes) => {
      const updatedNotes = [...notes, newNote];
      this.persistNotes(updatedNotes);
      return updatedNotes;
    });
  }

  protected removeNote(id: number) {
    this.notes.update((notes) => {
      const updatedNotes = notes.filter((note) => note.id !== id);
      this.persistNotes(updatedNotes);
      return updatedNotes;
    });
  }

  private persistNotes(notes: Note[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }
}
