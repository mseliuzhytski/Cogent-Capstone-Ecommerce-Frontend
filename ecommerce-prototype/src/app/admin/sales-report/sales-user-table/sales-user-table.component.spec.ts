import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesUserTableComponent } from './sales-user-table.component';

describe('SalesUserTableComponent', () => {
  let component: SalesUserTableComponent;
  let fixture: ComponentFixture<SalesUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesUserTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
