import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragEnd,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Observable, fromEvent, map, startWith } from 'rxjs';

interface ColumnItem {
  svg: string;
  col: number;
}

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css'],
})
export class DragAndDropComponent {
  constructor(private renderer: Renderer2) {
    this.initializeElement();
  }

  gridItems: Array<any> = [
    {
      id: 0,
      src: 'assets/genericLoad.svg',
      x: -300,
      y: 0,
      defaultX: -300,
      defaulty: 0,
      class: 'x',
      height: 50,
      width: 50,
      name: '',
    },
    {
      id: 1,
      src: 'assets/key.svg',
      x: -240,
      y: 0,
      class: 'x',
      height: 50,
      width: 50,
    },
    {
      id: 2,
      src: 'assets/transformer.svg',
      x: -180,
      y: 0,
      defaultX: -180,
      defaulty: 0,
      class: 'x',
      height: 50,
      width: 50,
      name: '',
    },
    {
      id: 3,
      src: 'assets/exitPoint.svg',
      x: -120,
      y: 0,
      defaultX: -120,
      defaulty: 0,

      class: 'x',
      height: 50,
      width: 50,
      name: '',
    },
    {
      id: 4,
      src: 'assets/entryPoint.svg',
      x: -60,
      y: 0,
      defaultX: -60,
      defaulty: 0,
      class: 'x',
      height: 50,
      width: 50,
      name: '',
    },
    {
      id: 5,
      src: 'assets/circuitBreaker.svg',
      x: 0,
      y: 0,
      defaultX: 0,
      defaulty: 0,
      class: 'x',
      height: 50,
      width: 50,
      name: '',
    },
    {
      id: 6,
      src: 'assets/feeder.svg',
      x: 60,
      y: 0,
      class: 'x',
      height: 50,
      width: 50,
      name: '',
    },
    {
      id: 7,
      src: 'assets/barra_horizontal.svg',
      x: 120,
      y: 20,
      defaultX: 120,
      defaulty: 20,
      class: 'l ',
      height: 10,
      width: 50,
      name:''

    },
    {
      id: 8,
      src: 'assets/barra_vertical.svg',
      x: 180,
      y: 0,
      defaultX: 180,
      defaulty: 0,
      class: 'l',
      height: 51,
      width: 10,
      name:''

    },
    {
      id: 9,
      src: 'assets/cabo_horizontal.svg',
      x: 240,
      y: 20,
      defaultX: 240,
      defaulty: 20,
      class: 'l hori',
      height: 5,
      width: 50,
      name:''

    },
    {
      id: 10,
      src: 'assets/cabo_vertical.svg',
      x: 300,
      y: 0,
      defaultX: 300,
      defaulty: 0,
      class: 'l',
      height: 51,
      width: 10,
      name:''

    },
    {
      id: 11,
      src: 'assets/cabo_L.svg',
      x: 340,
      y: 0,
      defaultX: 340,
      defaulty: 0,
      class: 'l',
      height: 50,
      width: 50,
      name:''

    },
  ];

  showAdditionalElement: boolean = false;
  additionalElementLeft: number = 0;
  additionalElementTop: number = 0;

  GuardGrid: Array<any> = [];
  changePosition() {}
  positions(event: CdkDragEnd, item: any, index: number) {
    let ad = this.gridItems[index];
    const element = event.source.getRootElement();
    const boundingRect = element.getBoundingClientRect();

    const relativeX = boundingRect.left;
    const relativeY = boundingRect.top;

    const absoluteX = event.source.getFreeDragPosition().x + relativeX;
    const absoluteY = event.source.getFreeDragPosition().y + relativeY;

    const deltaX = absoluteX - relativeX;
    const deltaY = absoluteY - relativeY;
    this.gridItems[index] = {
      x: item.defaultX,
      y: item.defaulty,
      ...item,
    };

    item.x = deltaX;
    item.y = deltaY;
    this.GuardGrid.push(item);
    //adicionar na primeira posição do objeto o outro com o mesmo caminho

    if(item.id < 7){
      this.additionalElementLeft = relativeX + 52;
      this.additionalElementTop = relativeY + 20;
  
      this.showAdditionalElement = true;

    }
    // Definir a posição do elemento adicional
  }

  guardPosition(event: CdkDragEnd, item: any, index: number) {
    const element = event.source.getRootElement();
    const boundingRect = element.getBoundingClientRect();

    const relativeX = boundingRect.left;
    const relativeY = boundingRect.top;

    const absoluteX = event.source.getFreeDragPosition().x + relativeX;
    const absoluteY = event.source.getFreeDragPosition().y + relativeY;

    const deltaX = absoluteX - relativeX;
    const deltaY = absoluteY - relativeY;

    const gridX = Math.round(deltaX / 10) * 10; // Ajuste para o grid de 10 pixels
    const gridY = Math.round(deltaY / 10) * 10; // Ajuste para o grid de 10 pixels

    item.x = gridX;
    item.y = gridY;

    this.GuardGrid[index] = item;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    event.target.innerWidth;
    console.log('resize', event.target.innerWidth);
  }

  initializeElement(): void {
    let storage = window.localStorage.getItem('gridItems');
    if (storage) {
      this.GuardGrid = JSON.parse(storage);
    }
  }
  save() {
    window.localStorage.setItem('gridItems', JSON.stringify(this.GuardGrid));
  }
  clear() {
    window.localStorage.removeItem('gridItems');
  }
  divWidth: number = 200;
  divHeight: number = 200;
  private isResizing: boolean = false;
  private initialWidth: number = 0;
  private initialHeight: number = 0;
  private resizeStartX: number = 0;
  private resizeStartY: number = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isResizing) {
      const deltaX = event.clientX - this.resizeStartX;
      const deltaY = event.clientY - this.resizeStartY;

      this.divWidth = this.initialWidth + deltaX;
      this.divHeight = this.initialHeight + deltaY;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.isResizing) {
      this.isResizing = false;
    }
  }

  startResize(event: MouseEvent): void {
    this.isResizing = true;
    this.resizeStartX = event.clientX;
    this.resizeStartY = event.clientY;
    this.initialWidth = this.divWidth;
    this.initialHeight = this.divHeight;
  }
}
