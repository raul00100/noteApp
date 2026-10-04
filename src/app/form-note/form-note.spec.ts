import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormNote } from './form-note';

describe('FormNote', () => {
  let component: FormNote;
  let fixture: ComponentFixture<FormNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNote],
    }).compileComponents();

    fixture = TestBed.createComponent(FormNote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
