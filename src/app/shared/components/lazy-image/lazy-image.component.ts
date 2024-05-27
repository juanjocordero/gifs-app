import {Component, Input, OnInit} from '@angular/core';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit{

  @Input()
  public url!: string;

  @Input()
  public alt!: string;

  public hasLoaded:boolean = false;

  ngOnInit(): void {
    if ( !this.url) throw new Error('URL image')
  }

  isLoaded():void{
    setTimeout(() => this.hasLoaded = true , 500)



  }

}
