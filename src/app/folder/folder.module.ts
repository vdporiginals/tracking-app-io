import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FolderPageRoutingModule } from "./folder-routing.module";

import { FolderPage } from "./folder.page";
import { NgxMapboxGLModule } from "ngx-mapbox-gl";
import { environment } from "src/environments/environment";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxToken, // Optional, can also be set per map (accessToken input of mgl-map)
    }),
    FolderPageRoutingModule,
  ],
  declarations: [FolderPage],
})
export class FolderPageModule {}
