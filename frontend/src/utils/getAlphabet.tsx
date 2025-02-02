export const getAlphabet = (index: number) => {
    let result = '';
    if(index === 0) result = ' a) ';
    if(index === 1) result = ' b) ';
    if(index === 2) result = ' c) ';
    if(index === 3) result = ' d) ';
    if(index === 4) result = ' e) ';
    return result;
  }