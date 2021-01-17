import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage {
  photo: SafeResourceUrl;
  urlAvatarDefaultImage = environment.urlAvatarDefaultImage;
  userData:any =  {};

  constructor(private sanitizer: DomSanitizer,
    private storage: Storage) {}

  async ngOnInit() {
    const responseAuthenticateUser = await this.storage.get("responseAuthenticateUser");
    
    this.userData = responseAuthenticateUser.data;
    console.log("userData", this.userData)
  }
  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    if (image) {
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.dataUrl);
    }
  }
}
