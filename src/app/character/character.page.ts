import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {IFCharacter} from '../characters/characters.page';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {

  character: IFCharacter;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.getCharacterInfo();
  }

  private async getCharacterInfo() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const res = await this.http.get<IFCharacter>(`https://rickandmortyapi.com/api/character/${id}`).toPromise();
    await loading.dismiss();
    this.character = res;
  }

}
