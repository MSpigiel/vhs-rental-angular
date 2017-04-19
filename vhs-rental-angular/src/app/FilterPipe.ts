import {Injectable, Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'myfilter',
  pure: false
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], args: any): any {
    if (args === undefined) { return items; }
    return items.filter(item => item.title.toLowerCase().includes(args.toLowerCase()));
  }
}
