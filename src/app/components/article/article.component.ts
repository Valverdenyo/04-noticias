import { Component, Input } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article!: Article;
  @Input() index!: number;
  constructor(private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
  ) { }

  async onOpenMenu() {

    const articleInFavorite = this.storageService.articleInFavorites(this.article);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [{
        text: 'Compartir',
        icon: 'share-outline',
        handler: () => {

          this.onShareArticle();
        }
      }, {
        text: articleInFavorite ? 'Quitar Favorito' : 'Favorito',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
        handler: () => {
          this.onToggleFavorite();
        }
      }, {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
        cssClass: 'secondary'
      }]
    });

    await actionSheet.present();
  }



  openArticle() {

    if (this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;
    }

  }

  onShareArticle() {

    if (this.platform.is('cordova')) {


      this.compartirNoticia();
      this.socialSharing.share(
        this.article.title,
        this.article.source.name,

        this.article.url
      );
    } else {
      if (navigator.share) {
        navigator.share({
          title: this.article.title,
          text: this.article.description,
          url: this.article.url,
        })
          .then(() => console.log('Compartido!'))
          .catch((error) => console.log('Error compartiendo', error));
      }
    }
  }

  onToggleFavorite() {
    this.storageService.setRemoveArticle(this.article);
  }

  compartirNoticia() {

  }

}
