import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdata'
})
export class FilterdataPipe implements PipeTransform {

  transform(items: any[], data:any, value: string, label: any[]): any[] {
    console.log(items)
    console.log(value);
    console.log(data);
    console.log(data["data"])
    console.log(label);
    // console.log(items);
    console.log(value);
    // data.data.subscribe((data: any)=> {
    //     console.log(data)
    // })

    if (!data.data ) return [];
    if (!value) return data.data;
    if (value == '' || value == null) return [];
 
    let filteredItems: any = [];
    data.data.forEach((item: any) => {
      label.forEach((label)=> {
        //console.log(item[label]);
        if(item[label].toString().toLowerCase().includes(value)){
          if(filteredItems.indexOf(item) <= -1){
            filteredItems.push(item);
          }
        }
      })
    });
    return filteredItems;

  }

}