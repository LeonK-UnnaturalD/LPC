/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetBuisnessComponent } from './GetBuisness.component';

describe('GetBuisnessComponent', () => {
  let component: GetBuisnessComponent;
  let fixture: ComponentFixture<GetBuisnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBuisnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBuisnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
