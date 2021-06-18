import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterLrComponent } from './twitter-lr.component';

describe('TwitterLrComponent', () => {
  let component: TwitterLrComponent;
  let fixture: ComponentFixture<TwitterLrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitterLrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterLrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
