import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxThetellerComponent } from './ngx-theteller.component';

describe('NgxThetellerComponent', () => {
  let component: NgxThetellerComponent;
  let fixture: ComponentFixture<NgxThetellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxThetellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxThetellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
