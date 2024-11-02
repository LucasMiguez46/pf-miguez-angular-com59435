import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): String {
    const nombreCompleto = value.primerNombre + " " + value.ultimoNombre;

    return nombreCompleto; 
  }
}
