import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeDistriContainerComponent } from './grade-distri-container.component';

describe('GradeDistriContainerComponent', () => {
  let component: GradeDistriContainerComponent;
  let fixture: ComponentFixture<GradeDistriContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeDistriContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeDistriContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
