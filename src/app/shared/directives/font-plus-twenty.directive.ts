import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFontPlusTwenty]'
})


export class FontPlusTwentyDirective implements OnChanges{

  @Input()
  tamaño = '20px';

  constructor(private el: ElementRef<HTMLElement>) { 
    this.applyStyles();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tamaño']) {
      this.applyStyles();
    }
  }
  applyStyles(): void {
    this.el.nativeElement.style.fontSize = this.tamaño;
  }

  

}
