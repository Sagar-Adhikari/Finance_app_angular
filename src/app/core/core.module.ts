import { NgModule, Optional, SkipSelf } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { AuthGuard } from './authentication/auth.guard';


@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [AuthGuard],
  entryComponents: [     
  ],
})
export class CoreModule { 

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}