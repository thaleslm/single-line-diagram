import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-prototyping',
  templateUrl: './prototyping.component.html',
  styleUrls: ['./prototyping.component.css'],
})
export class PrototypingComponent  {
  linesVertical : any[] = ['a'];
  linesHorizontal : any[] = ['b'];
  genericLoad : any[] = ['g'];


  id:string = '0'

  handleDragStart(event: DragEvent,id:string) {
    event.dataTransfer?.setData('text/plain', '');
    event.dataTransfer?.setDragImage(event.target as HTMLElement, 0, 0);
    this.id = id;
  }
  addLines(type: string){
    let index = this.linesVertical.length.toString()
    if(type == 'linesVerdical'){
       this.linesVertical.push(this.linesVertical[0]+index);
       this.displayButton('none','verdical')
      
      }
    if(type == 'linesHorizontal'){
       this.linesHorizontal.push(this.linesHorizontal[0]+index);
       this.displayButton('none','horizontal')

      }
      if(type == 'genericLoad'){
        this.genericLoad.push(this.genericLoad[0]+index);
        this.displayButton('none','genericLoad')
 
       }

  }

  displayButton(display:string,id:string){
    let getbuuton = document.getElementById(id) 
    if(getbuuton) getbuuton.style.display = display
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    
    //tem que pensar em um jeito de relacionar a div com a lines
    
    const linha = document.getElementById(this.id);
    const divAlvo = document.getElementById('div');
    if(divAlvo && linha){
      const offsetX = event.clientX - divAlvo.getBoundingClientRect().left;
      const offsetY = event.clientY - divAlvo.getBoundingClientRect().top;
      linha.style.left = offsetX + 'px';
      linha.style.top = offsetY + 'px';
     
      if(this.id[0] == 'a')  this.displayButton('block','verdical');

      if(this.id[0] == 'b') this.displayButton('block','horizontal');

      if(this.id[0] == 'g') this.displayButton('block','genericLoad');

    }

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