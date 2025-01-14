import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements AfterViewInit {

  @ViewChild('input')
  inputElement!: ElementRef;
  
  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngAfterViewInit(){

    fromEvent(this.inputElement.nativeElement, 'keyup')
    .pipe(
      debounceTime(500),
      pluck('target', 'value'),
      distinctUntilChanged(),
      filter((value:any) => value.length > 3),
      map((value) => value)
    )
    .subscribe((value:any) => {
      this.search.emit(value);
      console.log(value)
    })
  }

}
