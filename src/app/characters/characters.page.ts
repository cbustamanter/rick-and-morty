import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';


interface CharacterResults {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: [];
}

interface InfoRequest {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface IFCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: [];
  url: string;
  created: string;
}

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  characters: IFCharacter[] = [];

  info: InfoRequest;

  test = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCharacters();
  }

  loadData(event) {
    if (!this.info.next) {
      event.target.disabled = true;
    } else {
      this.getCharacters(this.info.next, event);
    }
  }

  private async getCharacters(next: string = null, event = null) {
    const defaultUrl = 'https://rickandmortyapi.com/api/character';
    const apiUrl = next ? next : defaultUrl;
    const res = await this.http
      .get<CharacterResults>(apiUrl)
      .toPromise();
    this.info = res.info;
    this.characters = this.characters.concat(res.results);
    if (event) {
      event.target.complete();
    }
  }
  toggleTheme(event) {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    systemDark.addListener(this.colorTest);
    if (event.detail.checked){
      document.body.setAttribute('color-theme', 'dark');
    }
    else{
      document.body.setAttribute('color-theme', 'light');
    }
  }

  colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }
}
