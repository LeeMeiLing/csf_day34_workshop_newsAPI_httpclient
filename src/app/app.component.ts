import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article, COUNTRIES, NEWS_API_KEY, NEWS_URL, SOURCE_URL, Source } from './models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  form!:FormGroup
  countries = COUNTRIES
  sources:Source[] = []
  selectedCountry!:string
  selectedSourceId!:string
  source$!:Subscription
  news$!:Subscription
  articles:Article[]=[]

  constructor(private fb:FormBuilder,private http:HttpClient){}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      country:this.fb.control<string>('',[Validators.required]),
      source:this.fb.control<string>('',[Validators.required])
    })
  }
  
  getSource(){

    // read the selected country code
    this.selectedCountry = this.form.value['country']

    // create query params
    const params = new HttpParams().set('apiKey',NEWS_API_KEY).set('country',this.selectedCountry)

    // returns an observable
    this.source$ = this.http.get<any>(SOURCE_URL,{params})
      .subscribe({
        next: v => {
          console.info('.....NEXT')
          this.sources = v['sources'] as Source[]
          console.info("sources[]: ",this.sources)
        },
        error: err => {
          console.error('ERROR: ', err)
        },
        complete() {
            console.warn('......COMPLETE: ')
        },
      })

  }

  getNews(){
    this.selectedSourceId = this.form.value['source']

    //https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=xxx

    // create query params
    const params = new HttpParams().set('sources',this.selectedSourceId).set('apiKey',NEWS_API_KEY)

    //// http.get() returns an observable; observable.subscribe() returns subscription

    // // Method 1: use .subscribe(next: ) to extract data directly, without pipe()
    // this.news$ = this.http.get<any>(NEWS_URL,{params})
    //   .subscribe({
    //     next: v => {
    //       console.info('.....NEXT')
    //       this.articles = v['articles'] as Article[]
    //     },
    //     error: err => {
    //       console.error('ERROR: ', err)
    //     },
    //     complete() {
    //         console.warn('......COMPLETE: ')
    //     },
    //   })

    // // Method 2: using pipe(tap())
    // this.news$ = this.http.get<any>(NEWS_URL,{params})
    //   .pipe(
    //     tap( v => this.articles = v['articles'] as Article[] )
    //   )
    //   .subscribe({})

    // Method 3: using map
    this.news$ = this.http.get<any>(NEWS_URL,{params})
    .pipe(
      map( v => v['articles'] as Article[] )
    )
    .subscribe({
      next: a => this.articles = a
    })

  }

  getNewsByCountry(){
    this.selectedSourceId = this.form.value['source']

    //https://newsapi.org/v2/top-headlines?country=us&apiKey=xxx

    // create query params
    const params = new HttpParams().set('country',this.selectedCountry).set('apiKey',NEWS_API_KEY)

    // http.get() returns an observable; observable.subscribe() returns subscription
    this.news$ = this.http.get<any>(NEWS_URL,{params})
      .subscribe({
        next: v => {
          console.info('.....NEXT')
          this.articles = v['articles'] as Article[]
        },
        error: err => {
          console.error('ERROR: ', err)
        },
        complete() {
            console.warn('......COMPLETE: ')
        },
      })

  }

  getNewsBySource(){
    this.getSource()
  }
  

}
