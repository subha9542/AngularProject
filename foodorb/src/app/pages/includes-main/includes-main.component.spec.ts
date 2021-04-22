import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludesMainComponent } from './includes-main.component';

describe('IncludesMainComponent', () => {
  let component: IncludesMainComponent;
  let fixture: ComponentFixture<IncludesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncludesMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
