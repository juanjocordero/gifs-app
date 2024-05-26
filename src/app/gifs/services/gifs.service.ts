import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchResponse} from "../interfaces/gifs.interfaces";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifsList:Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey:string          = 'l5uEqwHlc3VKR3uOnp7KMcbQXUMbmklz';
  private apiURL:string          = 'https://api.giphy.com/v1/gifs';
  constructor( private http: HttpClient ) {
    this.getLocalStorage();
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory (tag:string){

    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this.tagsHistory.filter( (oldTag:string):boolean => oldTag !== tag);
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0,10);

    this.saveStorage();

  }

  private getLocalStorage(){
    if ( localStorage.getItem('history') ) {
      this._tagsHistory = JSON.parse( localStorage.getItem('history')!);
    }

    if (this._tagsHistory.length === 0 ) return;

    this.searchTag( this._tagsHistory[0]);

  }
  private saveStorage(){
    localStorage.setItem('history' , JSON.stringify(this._tagsHistory));
  }

  searchTag( tag:string ):void{
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('q',tag)
      .set('limit','10')

    this.http.get<SearchResponse>(`${ this.apiURL }/search`, {params})
      .subscribe( resp => {
        this.gifsList = resp.data;
      });
  }

}
