import {Component, ElementRef, ViewChild, viewChild} from '@angular/core';
import {GifsService} from "../../services/gifs.service";

@Component({
  selector: 'gif-search-box',
  template: `
  <h5>Buscar</h5>
  <input type="text"
         class="form-control"
         placeholder="Buscar gifs..."
         (keyup.enter)="searchTag()"
         #txtTagInput
  >`,
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  constructor( private gifsService:GifsService) {
  }

  public searchTag(){
    let txtTagInput = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(txtTagInput);
    this.tagInput.nativeElement.value = '';
  }

}
