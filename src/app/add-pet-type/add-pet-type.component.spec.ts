import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetTypeComponent } from './add-pet-type.component';

describe('AddPetTypeComponent', () => {
  let component: AddPetTypeComponent;
  let fixture: ComponentFixture<AddPetTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPetTypeComponent]
    });
    fixture = TestBed.createComponent(AddPetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
