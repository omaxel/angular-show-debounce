import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { DebouncedIfDirective } from '@omaxel/angular-show-debounce';
import { By } from '@angular/platform-browser';

const DEBOUNCE_TIME = 100;

@Component({
  template: ` <div *omxDebouncedIf="visible; debounce: ${DEBOUNCE_TIME}">
    example
  </div>`,
})
class TestComponent {
  visible = false;
}

describe('Show debounce directive', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [DebouncedIfDirective],
      declarations: [TestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(TestComponent);

    fixture.detectChanges(); // Initial binding
  });

  function getElement() {
    return fixture?.debugElement.query(By.css('div'));
  }

  it(`shows the element after debounce time when visible is set to true`, fakeAsync(() => {
    expect(getElement()).toBeNull();

    fixture.componentInstance.visible = true;
    fixture.detectChanges();

    expect(getElement()).toBeNull();

    tick(DEBOUNCE_TIME);

    expect(getElement()).not.toBeNull();

    discardPeriodicTasks();
  }));

  it(`doesn't show the element when visible is set to true and then to false before debounce time`, fakeAsync(() => {
    expect(getElement()).toBeNull();

    fixture.componentInstance.visible = true;
    fixture.detectChanges();

    expect(getElement()).toBeNull();

    tick(DEBOUNCE_TIME - 1);

    fixture.componentInstance.visible = false;
    fixture.detectChanges();

    tick(1);

    expect(getElement()).toBeNull();

    discardPeriodicTasks();
  }));

  it(`doesn't show the element after debounce time elapsed when visible is set to false before debounce time`, fakeAsync(() => {
    expect(getElement()).toBeNull();

    fixture.componentInstance.visible = true;
    fixture.detectChanges();

    expect(getElement()).toBeNull();

    tick(DEBOUNCE_TIME / 2);

    fixture.componentInstance.visible = false;
    fixture.detectChanges();

    expect(getElement()).toBeNull();

    tick(DEBOUNCE_TIME / 2);

    expect(getElement()).toBeNull();

    discardPeriodicTasks();
  }));
});
