import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmosHomeComponent } from './atmos-home.component';

describe('AtmosHomeComponent', () => {
  let component: AtmosHomeComponent;
  let fixture: ComponentFixture<AtmosHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmosHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
