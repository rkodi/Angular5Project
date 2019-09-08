import { Directive, ElementRef, OnInit, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUnmask]'
})
export class UnmaskDirective implements OnInit, OnDestroy {

  @Input() appUnmask: string;
  private subscriber;
  constructor(
    private elementRef: ElementRef,
    private model: NgControl
  ) { }

  ngOnInit(): void {
    this.subscriber = this.model.control.valueChanges.subscribe(() => {
      const newValue = this.elementRef.nativeElement.value.replace(new RegExp(this.appUnmask), '');

      // console.log(newValue);
      this.model.control.setValue(newValue, {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false
      });
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
