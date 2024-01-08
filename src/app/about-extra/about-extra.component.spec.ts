import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutExtraComponent } from './about-extra.component';

describe('AboutExtraComponent', () => {
  let component: AboutExtraComponent;
  let fixture: ComponentFixture<AboutExtraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutExtraComponent]
    });
    fixture = TestBed.createComponent(AboutExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
