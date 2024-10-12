import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBedragComponent } from './new-bedrag.component';

describe('NewBedragComponent', () => {
  let component: NewBedragComponent;
  let fixture: ComponentFixture<NewBedragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBedragComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewBedragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
