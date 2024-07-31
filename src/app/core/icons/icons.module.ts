import { NgModule } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon"

@NgModule()
export class IconsModule{
    constructor(
        private _domSanitizer: DomSanitizer,
        private _matIconRegistry: MatIconRegistry
    )
    {
        this._matIconRegistry.addSvgIconSet(this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-twotone.svg'));
        this._matIconRegistry.addSvgIcon('home_2',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/home-2.svg'))    
        this._matIconRegistry.addSvgIcon('pymo_negro',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/PYMO3_NEGRO.svg'))
        this._matIconRegistry.addSvgIcon('pymo_blanco',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/PYMO2_BLANCO.svg'))
        this._matIconRegistry.addSvgIcon('supply',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/supply.svg'))    

    }
}