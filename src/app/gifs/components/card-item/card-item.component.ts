import {Component, Input, OnInit} from '@angular/core';
import {Gif} from "../../interfaces/gifs.interfaces";

@Component({
  selector: 'gifs-card-item',
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent implements OnInit{
  @Input() gif!: Gif;


  ngOnInit() {
    if (!this.gif) throw new Error('Gif property is required')
  }
}
