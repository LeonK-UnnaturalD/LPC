import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private Meta: Meta, private Title: Title) { }

  public UpdateTitle(title: string) {
    this.Title.setTitle(title);
  }

  public UpdateTag(name: string, content: string) {
    this.Meta.updateTag({ name, content });
  }

}
