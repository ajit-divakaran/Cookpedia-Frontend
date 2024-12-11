import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allRecipes: any[], searchkey: string): any[] {
    let result:any[] = []
    //logic
    if(!allRecipes || searchkey == ""){
      return allRecipes
    }

    result = allRecipes.filter((item)=>item.name.toLowerCase().trim().includes(searchkey.toLowerCase().trim()))
    return result;
  }

}
