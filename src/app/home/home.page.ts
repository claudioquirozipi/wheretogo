import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalplacePage } from '../modalplace/modalplace.page';
import { OpentripmapService } from '../services/opentripmap.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  placesFound: any[];
  cityFound: any;
  countPlacesFound: number = 0;
  constructor(
    private opentripmapService: OpentripmapService,
    private modalController: ModalController
  ) {}
  async ionViewDidEnter() {
    try {
      this.cityFound = await this.opentripmapService.getCityFromSearch(
        environment.openTripMap.defaultCity
      );
      if (this.cityFound) {
        this.placesFound = await this.opentripmapService.getPlacesByLatLon(
          environment.openTripMap.radius,
          this.cityFound.lon,
          this.cityFound.lat,
          environment.openTripMap.rate,
          environment.openTripMap.formatJson
        );
        console.log("cityFound", this.cityFound)
        console.log("placesFound", this.placesFound)
        console.log("resultados", this.placesFound.length)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async showDetailPlace(place: any) {
    const placeSelected = await this.opentripmapService.getDetailPlaceByXid(
      place.xid
    );
    const modal = await this.modalController.create({
      component: ModalplacePage,
      componentProps: {
        placeSelected: placeSelected,
      },
    });
    return await modal.present();
  }
}
