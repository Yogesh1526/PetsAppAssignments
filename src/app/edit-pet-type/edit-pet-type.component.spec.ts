import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetTypeComponent } from './edit-pet-type.component';

describe('EditPetTypeComponent', () => {
  let component: EditPetTypeComponent;
  let fixture: ComponentFixture<EditPetTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPetTypeComponent]
    });
    fixture = TestBed.createComponent(EditPetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
