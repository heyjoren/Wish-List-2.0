import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBedragComponent } from './show-bedrag.component';

describe('ShowBedragComponent', () => {
  let component: ShowBedragComponent;
  let fixture: ComponentFixture<ShowBedragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBedragComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowBedragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
