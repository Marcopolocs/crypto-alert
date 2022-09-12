import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSpinnerComponent } from './search-spinner.component';

describe('SearchSpinnerComponent', () => {
  let component: SearchSpinnerComponent;
  let fixture: ComponentFixture<SearchSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
