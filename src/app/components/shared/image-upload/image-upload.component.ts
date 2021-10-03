import { Component, OnInit } from "@angular/core";
import {
  Dimensions,
  ImageCroppedEvent,
  base64ToFile,
  ImageTransform,
} from "ngx-image-cropper";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.css"],
})
export class ImageUploadComponent implements OnInit {
  file: any = [];
  selectedImage: any = null;
  imageChangedEvent: any = "";
  croppedImage: string = "";

  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  isFile = false;

  constructor() {}

  ngOnInit(): void {}

  fileChangeEvent(event: any): void {
    console.log('event',event)
    this.isFile = true;
    this.imageChangedEvent = event;

  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event, base64ToFile(event.base64));
    console.log("imageCropped", this.croppedImage);
  }
  imageLoaded() {
    this.isFile=true;
    this.showCropper = true;
    console.log("Image loaded");
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log("Cropper ready", sourceImageDimensions);
  }

  loadImageFailed() {
    this.isFile=false;
    console.log("Load failed");
  }
  cancelled(){
    this.file='';
    this.selectedImage=';';
    this.showCropper=false;
    this.croppedImage='';
    this.isFile=false;

  }

}
