import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectComponent } from '../modal/select/select.component';
import { Propreties } from './properties';
@Component({
  selector: 'app-prototyping',
  templateUrl: './prototyping.component.html',
  styleUrls: ['./prototyping.component.css'],
})
export class PrototypingComponent {
  public propertiesData: any = Propreties;

  id: string = '0';
  testSet: Array<any> = [];
  index : number= 0;

  constructor(public dialog: MatDialog) {
    console.log(this.propertiesData);
  }

  handleDragStart(event: DragEvent, id: string) {
    event.dataTransfer?.setData('text/plain', '');
    event.dataTransfer?.setDragImage(event.target as HTMLElement, 0, 0);
    this.id = id;
    console.log(id);
  }
  addLines(type: string) {
    if (this.propertiesData.hasOwnProperty(type)) {
      const option = this.propertiesData[type];
      let index = option.array.length.toString();
      option.array.push(option.array[0] + index);

      this.displayButton('none', option.buttonType);
    } else {
      console.log('Objeto não encontrado');
    }
  }

  displayButton(display: string, id: string) {
    let getbuuton = document.getElementById(id);
    if (getbuuton) getbuuton.style.display = display;
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    const linha = document.getElementById(this.id);
    const divAlvo = document.getElementById('div');

    if (divAlvo && linha) {
      const offsetX = event.clientX - divAlvo.getBoundingClientRect().left;
      const offsetY = event.clientY - divAlvo.getBoundingClientRect().top;
      linha.style.left = offsetX + 'px';
      linha.style.top = offsetY + 'px';

      for (let prop in this.propertiesData) {
        console.log(prop);
        if (this.id[0] == this.propertiesData[prop].array[0]) {
          this.displayButton('block', this.propertiesData[prop].buttonType);
          this.propertiesData[prop].id = this.index
          if(this.propertiesData[prop].id > 0){
            this.propertiesData[prop].montante = this.index -1
          }
          this.index+=1
          this.propertiesData[prop].jusante = this.index

          this.openDialog(this.propertiesData[prop]);
          console.log(this.propertiesData[prop]);

        }
      }
    }
  }

  openDialog(value: any) {
    const config = new MatDialogConfig();
    config.height = '200px';
    config.width = '350px';
    config.panelClass = 'custom-dialog';
    const dialog = this.dialog.open(SelectComponent, config);
    
    dialog.componentInstance.data = value;

    dialog.afterClosed().subscribe((data) => {
    
      if(this.testSet.length > 0){
        for(let i = 0; i< this.testSet.length; i++) {
          if(this.testSet[i].idButton != data.idButton) {
          this.testSet.push(data);
          }
        }

      }else{
        this.testSet.push(data);
      }
      // this.testSet.push(data);
      console.log(this.testSet);
    });
  }
}

// select() {
//   const svg = document.querySelectorAll('#svg');
//   if (svg) {
//     svg.forEach((e) => {
//       e.classList.add('selecionado');
//     });
//     // svg.classList.add('selecionado')
//   }
// }
// public click: number = 0;
// firstClick: any[] = [];

// desenharReta(event: MouseEvent) {
//   const div = event.currentTarget as HTMLDivElement;
//   const retangulo = div.getBoundingClientRect();
//   const X = event.clientX - retangulo.left;
//   const Y = event.clientY - retangulo.top;

//   if (this.click == 0) {
//     this.firstClick = [X, Y];
//     this.click = 1;
//   } else {
//     // Aqui você pode usar as coordenadas para desenhar a reta, seja através de um canvas, SVG ou qualquer outra técnica de renderização.
//     const canva = document.getElementById('meu-canvas') as HTMLCanvasElement;
//     canva.width = div.offsetWidth;
//     canva.height = div.offsetHeight;

//     const context = canva.getContext('2d');
//     if (context) {
//       context.strokeStyle = 'red';
//       context.lineWidth = 2;
//       context.moveTo(this.firstClick[0],this.firstClick[1]);
//       context.lineTo(X, Y);
//       context.stroke();
//       this.click = 0;
//     }
//   }
//     console.log(X, Y)
//   // console.log(`clique nas coordernadas ${x},${y}`);
// }
//
//
// interface Node {
// value: string;
// children: Node[];
// }
//
// function searchObject(node: Node, targetValue: string): boolean {
// if (node.value === targetValue) {
// return true;
// }
//
// for (const child of node.children) {
// if (searchObject(child, targetValue)) {
// return true;
// }
// }
//
// return false;
// }
//
// Exemplo de uso
// const obj: Node = {
// value: "A",
// children: [
// {
// value: "B",
// children: [
// {
// value: "D",
// children: [],
// },
// {
// value: "E",
// children: [],
// },
// ],
// },
// {
// value: "C",
// children: [
// {
// value: "F",
// children: [],
// },
// {
// value: "G",
// children: [],
// },
// ],
// },
// ],
// };
//
// console.log(searchObject(obj, "D")); // true
// console.log(searchObject(obj, "G")); // true
// console.log(searchObject(obj, "H")); // false
