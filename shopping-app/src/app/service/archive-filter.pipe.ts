import { Pipe, PipeTransform } from '@angular/core';
import {Archieve} from './archieve';

@Pipe({
  name: 'archiveFilter'
})
export class ArchiveFilterPipe implements PipeTransform {

  transform(lista: Archieve[], text: string): any {
    text = text.toLowerCase();
    if (text === '' || text === null) {
      return lista;
    }
    return lista.filter(value => value.product.toString().toLowerCase().includes(text) || value.price.toString().toLowerCase().includes(text) || value.date.toString().toLowerCase().includes(text));
  }

}
