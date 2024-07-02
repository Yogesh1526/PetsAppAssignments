import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBreedComponent } from './add-breed.component';

describe('AddBreedComponent', () => {
  let component: AddBreedComponent;
  let fixture: ComponentFixture<AddBreedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBreedComponent]
    });
    fixture = TestBed.createComponent(AddBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
