import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParserComponent } from './form-parser.component';

describe('FormParserComponent', () => {
  let component: FormParserComponent;
  let fixture: ComponentFixture<FormParserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormParserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
