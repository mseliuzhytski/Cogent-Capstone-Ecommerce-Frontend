import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesItemTableComponent } from './sales-item-table.component';

describe('SalesItemTableComponent', () => {
  let component: SalesItemTableComponent;
  let fixture: ComponentFixture<SalesItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesItemTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
