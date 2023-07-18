import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragEnd,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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
    { src: 'assets/genericLoad.svg', x: 0, y: 0 },
    { src: 'assets/key.svg', x: 0, y: 0 },
    { src: 'assets/transformer.svg', x: 0, y: 0 },
    { src: 'assets/exitPoint.svg', x: 0, y: 0 },
    { src: 'assets/entryPoint.svg', x: 0, y: 0 },
    { src: 'assets/circuitBreaker.svg', x: 0, y: 0 },
    { src: 'assets/feeder.svg', x: 0, y: 0 },
    // 2
  ];

  GuardGrid: Array<any> = [];
  changePosition() {}
  positions(event: CdkDragEnd, item: any, index: number) {
    const element = event.source.getRootElement();
    const boundingRect = element.getBoundingClientRect();

    const relativeX = boundingRect.left;
    const relativeY = boundingRect.top;

    const absoluteX = event.distance.x + relativeX;
    const absoluteY = event.distance.y + relativeY;

    const deltaX = absoluteX - relativeX;
    const deltaY = absoluteY - relativeY;

    this.gridItems[index] = { src: item.src, x: 0, y: 0 };
    this.GuardGrid.push(item);
    item.x = deltaX;
    item.y = deltaY;
    //adicionar na primeira posição do objeto o outro com o mesmo caminho
    console.log(this.GuardGrid);

    console.log(this.gridItems);
    window.localStorage.setItem('gridItems', JSON.stringify(this.GuardGrid));
  }

  initializeElement(): void {
    let storage = window.localStorage.getItem('gridItems');
    if (storage) {
      this.GuardGrid = JSON.parse(storage);
    }
  }
}
