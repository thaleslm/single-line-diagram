import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnd,
  DragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Observable, concatMapTo, fromEvent, map, startWith } from 'rxjs';

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
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private dragDrop: DragDrop
  ) {
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
      angle: 0,
    },
    {
      id: 1,
      src: 'assets/key.svg',
      x: -240,
      y: 0,
      class: 'x',
      height: 50,
      width: 50,
      angle: 0,
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
      angle: 0,
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
      angle: 0,
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
      angle: 0,
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
      angle: 0,
    },
    {
      id: 6,
      src: 'assets/feeder.svg',
      x: 60,
      y: 0,
      class: 'x',
      height: 50,
      width: 50,
      angle: 0,
    },
    {
      id: 7,
      src: 'assets/barra_horizontal.svg',
      x: 120,
      y: 20,
      defaultX: 120,
      defaulty: 20,
      class: 'l horizontal ',
      height: 10,
      width: 50,
      angle: 0,
    },
    {
      id: 8,
      src: 'assets/barra_vertical.svg',
      x: 180,
      y: 0,
      defaultX: 180,
      defaulty: 0,
      class: 'l horizontal',
      height: 51,
      width: 10,
      angle: 0,
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
      angle: 0,
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
      angle: 0,
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
      angle: 0,
    },
  ];
  enableImageMovement: boolean = true;
  firstELement: any;

  lock: string = 'assets/open_lock.svg';
  trash: boolean = false;
  // showAdditionalElement: boolean = false;
  // additionalElementLeft: number = 0;
  // additionalElementTop: number = 0;

  GuardGrid: Array<any> = [];
  changePosition() {}
  positions(event: CdkDragEnd, item: any, index: number) {
    if (!this.enableImageMovement) {
      return;
    }
    this.close();
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
    // console.log(deltaX, deltaY);

    // if (deltaX > 900 && deltaY > 800) {
    //   this.GuardGrid == null;
    //   console.log('entrou');
    // } else {
    // }
    this.additionalElementLeft = relativeX + 25;
    this.additionalElementTop = relativeY - 10;

    if (item.id == 7 || item.id == 9) {
      this.additionalElementLeft = relativeX - 10;
      this.additionalElementTop = relativeY + 20;

      this.showAdditionalElementW = true;
    }
    if (item.id == 8 || item.id == 10) {
      this.additionalElementLeft = relativeX + 25;
      this.additionalElementTop = relativeY - 10;

      this.showAdditionalElementH = true;
    }

    console.log(item);
    this.GuardGrid.push(item);
    this.firstELement = item;

    this.trash = true;
    this.firstELement = item;
  }

  guardPosition(event: CdkDragEnd, item: any, index: number) {
    if (this.enableImageMovement == true) {
      this.close();
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
      this.additionalElementLeft = relativeX + 25;
      this.additionalElementTop = relativeY - 10;

      this.GuardGrid[index] = item;
      console.log(this.GuardGrid);
      if (gridX > 900 && gridY > 800) {
        this.GuardGrid.splice(index, 1);
      }
      this.firstELement = item;
      this.trash = true;
    }
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
  toggleImageMovement() {
    this.enableImageMovement = !this.enableImageMovement;
    if (this.enableImageMovement) this.lock = 'assets/open_lock.svg';
    if (!this.enableImageMovement) this.lock = 'assets/closed_lock.svg';
    this.save();
  }
  angle: number = 0;

  rotateImage(index: number) {
    if (!this.enableImageMovement && this.GuardGrid[index].id > 6) {
      let angle = this.GuardGrid[index].angle + 90;
      this.GuardGrid[index] = {
        ...this.GuardGrid[index],
        angle: angle,
      };
      this.save();
    }
  }

  showAdditionalElementW: boolean = false;
  showAdditionalElementH: boolean = false;

  additionalElementLeft: number = 0;
  additionalElementTop: number = 0;

  // Método acionado em tempo de escrita (ao alterar o input)
  inputWidth(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length < 4) {
      this.GuardGrid[this.GuardGrid.length - 1].width = inputElement.value;
      this.save();
    }
  }
  inputHeigth(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length < 4) {
      this.GuardGrid[this.GuardGrid.length - 1].height = inputElement.value;

      this.save();
    }
  }
  close() {
    this.showAdditionalElementW = false;
    this.showAdditionalElementH = false;
    this.trash = false;
  }
  removeItem() {
    this.GuardGrid.forEach((item,index) => {
      if(item == this.firstELement) this.GuardGrid.splice(index, 1); 
      return item
    });
    console.log(this.GuardGrid)
    this.trash = false;
  }
}
