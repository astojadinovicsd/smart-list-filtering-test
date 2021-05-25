
export class OriUtil {

  public static spliceNoMutate(myArray: any[], indexToRemove: number): any[] {
    return myArray.slice(0, indexToRemove).concat(myArray.slice(indexToRemove + 1));
  }

  public static getUniqueValues(values: any[]): any[] {
    return [...new Set(values)];
  }

}
