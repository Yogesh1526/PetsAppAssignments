import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBreedComponent } from './edit-breed.component';

describe('EditBreedComponent', () => {
  let component: EditBreedComponent;
  let fixture: ComponentFixture<EditBreedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBreedComponent]
    });
    fixture = TestBed.createComponent(EditBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
