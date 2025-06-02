import { Component } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DiagramElement } from '../../interface/daigram-element';
import { Connection } from '../../interface/connection';


@Component({
  selector: 'app-diagram-canvas',
  imports: [DragDropModule,CommonModule],
  templateUrl: './diagram-canvas.component.html',
  styleUrl: './diagram-canvas.component.css'
})
export class DiagramCanvasComponent {
  elements: DiagramElement[] = [];
  connections: Connection[] = [];
  selected: number[] = [];
  counter = 0;

  addElement(type: 'square' | 'circle' | 'image'|'diamond' |'star' |'triangle') {
    this.elements.push({
      id: this.counter++,
      type,
      x: 100,
      y: 100
    });
  }

  getIconClass(type: string): string {
  switch (type) {
    case 'square': return 'bi bi-square-fill';
    case 'circle': return 'bi bi-circle-fill';
    case 'triangle': return 'bi bi-triangle-fill';
    case 'diamond': return 'bi bi-diamond-fill';
    case 'star': return 'bi bi-star-fill';
    default: return 'bi bi-question-circle-fill';
  }
}


  selectElement(id: number) {
    this.selected.push(id);
    if (this.selected.length === 2) {
      const from = this.getElementById(this.selected[0]);
      const to = this.getElementById(this.selected[1]);

      if (from && to) {
        this.connections.push({ from: from.id, to: to.id });
      }

      this.selected = [];
    }
  }

onDrag(id: number, event: any) {
  const el = this.elements.find(e => e.id === id);
  if (el) {
    const canvasRect = (event.source.element.nativeElement.parentElement as HTMLElement).getBoundingClientRect();
    el.x = event.pointerPosition.x - canvasRect.left - 40;
    el.y = event.pointerPosition.y - canvasRect.top - 40;
  }
}
onDragEnd(id: number, event: any) {
  console.log(id)
  let el = this.elements.find(e => e.id === id);
  if (el) {
    el.x = event.source.getFreeDragPosition().x;
    el.y = event.source.getFreeDragPosition().y;
    console.log(el,event.source)
  }
}

  getElementById(id: number): DiagramElement {
    const element = this.elements.find(e => e.id === id)
    if (element)
      return element
    else return {
      id: 555,
      type: 'square',
      x: 0,
      y: 5,


    }
  }
}


