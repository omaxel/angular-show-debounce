import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { showDebounce } from '../operators/show-debounce.operator';

@Directive({
  selector: '[omxDebouncedIf]',
  standalone: true,
})
export class DebouncedIfDirective implements OnInit, OnDestroy {
  private _show = new BehaviorSubject(false);
  private _showSubscription: Subscription | null = null;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private changeDetector: ChangeDetectorRef
  ) {}

  @Input() omxDebouncedIfDebounce: number | null = null;

  @Input()
  set omxDebouncedIf(visible: boolean) {
    this._show.next(visible);
  }

  ngOnInit() {
    this._showSubscription = this._show
      .pipe(showDebounce(this.omxDebouncedIfDebounce))
      .subscribe((visible) => {
        if (visible) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }

        this.changeDetector.markForCheck();
      });
  }

  ngOnDestroy() {
    this._showSubscription?.unsubscribe();
  }
}
