import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import {
  MAPBOX_API_KEY, // ngx-mapbox-gl uses this injection token to provide the accessToken
  NgxMapboxGLModule,
} from "ngx-mapbox-gl";

export interface IMyLibMapModuleConfig {
  mapboxToken: string;
}

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule, NgxMapboxGLModule],
})
export class MapGLModule {
  static forRoot(
    config: IMyLibMapModuleConfig
  ): ModuleWithProviders<MapGLModule> {
    return {
      ngModule: MapGLModule,
      providers: [
        {
          provide: MAPBOX_API_KEY,
          useValue: config.mapboxToken,
        },
      ],
    };
  }
}
