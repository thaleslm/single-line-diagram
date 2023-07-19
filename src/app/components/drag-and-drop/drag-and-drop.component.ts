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
  // dragPosition = { x: 15, y: 5 };
  /**
   *
   */
  constructor(private renderer: Renderer2) {
    this.initializeElement();
    // const adjustedX = savedX + deltaX;
    // const adjustedY = savedY + deltaY;
  }

  gridItems: Array<any> = [
    {
      id: 0,
      src: 'assets/genericLoad.svg',
      x: -300,
      y: 0,
      class:'x',
      height: 50,
      width: 50,
    },
    { id: 1, src: 'assets/key.svg', x: -240, y: 0,
    class:'x', height: 50, width: 50 },
    {
      id: 2,
      src: 'assets/transformer.svg',
      x: -180,
      y: 0,
      class:'x',
      height: 50,
      width: 50,
    },
    {
      id: 3,
      src: 'assets/exitPoint.svg',
      x: -120,
      y: 0,
      class:'x',
      height: 50,
      width: 50,
    },
    {
      id: 4,
      src: 'assets/entryPoint.svg',
      x: -60,
      y: 0,
      class:'x',
      height: 50,
      width: 50,
    },
    {
      id: 5,
      src: 'assets/circuitBreaker.svg',
      x: 0,
      y: 0,
      class:'x',
      height: 50,
      width: 50,
    },
    { id: 6, src: 'assets/feeder.svg', x: 60, y: 0,
    class:'x', height: 50, width: 50 },
    {
      id: 7,
      src: 'assets/barra_horizontal.svg',
      x: 120,
      y: 20,
      class:'l ',
      height: 10,
      width: 50,
    },
    {
      id: 8,
      src: 'assets/barra_vertical.svg',
      x: 180,
      y: 0,
      class:'l',
      height: 51,
      width: 10,
    },
    {
      id: 9,
      src: 'assets/cabo_horizontal.svg',
      x: 240,
      y: 20,
      class:'l hori',
      height: 5,
      width: 50,
    },
    {
      id: 10,
      src: 'assets/cabo_vertical.svg',
      x: 300,
      y: 0,
      class:'l',
      height: 51,
      width: 10,
    },
    {
      id: 11,
      src: 'assets/cabo_L.svg',
      x: 340,
      y: 0,
      class:'l',
      height: 50,
      width: 50,
    },
  ];

  GuardGrid: Array<any> = [];
  changePosition() {}
  positions(event: CdkDragEnd, item: any, index: number) {
    const element = event.source.getRootElement();
    const boundingRect = element.getBoundingClientRect();

    const relativeX = boundingRect.left;
    const relativeY = boundingRect.top;

    const absoluteX = event.source.getFreeDragPosition().x + relativeX;
    const absoluteY = event.source.getFreeDragPosition().y + relativeY;

    const deltaX = absoluteX - relativeX;
    const deltaY = absoluteY - relativeY;

    this.gridItems[index] = item
    item.x = deltaX;
    item.y = deltaY;
    this.GuardGrid.push(item);

    //adicionar na primeira posição do objeto o outro com o mesmo caminho
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

  divHeight: number = 200;
  private isResizing: boolean = false;
  private initialHeight: number = 0;
  private resizeStartY: number = 0;

  startResize(event: MouseEvent): void {
    this.isResizing = true;
    this.resizeStartY = event.clientY;
    this.initialHeight = this.divHeight;

    document.addEventListener('mousemove', this.resize.bind(this));
    document.addEventListener('mouseup', this.stopResize.bind(this));
  }

  resize(event: any): void {
    if (!this.isResizing) return;

    const deltaY = event.clientY - this.resizeStartY;

    this.divHeight = this.initialHeight + deltaY;
  }

  stopResize(): void {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.resize.bind(this));
    document.removeEventListener('mouseup', this.stopResize.bind(this));
  }
}
