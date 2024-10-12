import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotaalBedragComponent } from './totaal-bedrag.component';

describe('TotaalBedragComponent', () => {
  let component: TotaalBedragComponent;
  let fixture: ComponentFixture<TotaalBedragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotaalBedragComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotaalBedragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
