import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Path2Component } from './path2.component';

describe('Path2Component', () => {
  let component: Path2Component;
  let fixture: ComponentFixture<Path2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Path2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Path2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
