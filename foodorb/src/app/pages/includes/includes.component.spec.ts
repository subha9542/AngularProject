import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludesComponent } from './includes.component';

describe('IncludesComponent', () => {
  let component: IncludesComponent;
  let fixture: ComponentFixture<IncludesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncludesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
