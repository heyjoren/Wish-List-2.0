import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedragComponent } from './bedrag.component';

describe('BedragComponent', () => {
  let component: BedragComponent;
  let fixture: ComponentFixture<BedragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BedragComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BedragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
