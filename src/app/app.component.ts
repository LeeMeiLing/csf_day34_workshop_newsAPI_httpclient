import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article, COUNTRIES, NEWS_API_KEY, NEWS_URL, SOURCE_URL, Source } from './models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription, map } from 'rxjs';

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

    //https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=94b4d80e48ed48cdaa9a7fd9ce350654

    // create query params
    const params = new HttpParams().set('sources',this.selectedSourceId).set('apiKey',NEWS_API_KEY)

    // returns an observable
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
  

}
