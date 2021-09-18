export const SearchFilter = {
    getPageData,
    getCountPage,
    verifyPageNumber,
    getStates,
    searchData,
    getData,
  }
  const getData = (filedColumn, data) => {
    //   1 solution
    // return items.filter(item => {
    //     for (let key in filedColumn) {
    //       if ((item[key] !== undefined || item[key].toLowerCase().search(filedColumn[key].toLowerCase()) !== -1))
    //         return true;
    //     }
    //     return false;
    //   });

    // 2 solution
    return data.filter(item =>
        Object.entries(filedColumn).every(([key, value]) => value && item[key].toLowerCase().search(value.toLowerCase()) !== -1)
      )
  }

  const getStates = (name = '', value = '', searchState = []) =>{
    searchState[name] = value;
    return Object.entries(searchState).filter(([key, value])=>{return (key && value && value.length )?  true : false})
  }
 
  const getPageData = (id, currentPage, list, allData) => {
    let items = (list.length > 0) ? list : allData;
    return items.slice(currentPage * (id - 1), currentPage * id);
  }
  
  const getCountPage = (item, allData, currentPage) => {
    let items = (items.length > 0) ? item : allData;
    return (items.length > currentPage) ? Math.ceil(items.length / currentPage) : 0;
  }
  
  const verifyPageNumber = (initialId, propsId, resonstructedData, currentPage) => {
    let pageData = getPageData(initialId, currentPage, resonstructedData, resonstructedData);
    if (pageData.some(([key,value])=>{return value.id === propsId})) {
      return [pageData, initialId];
    }
    return verifyPageNumber(initialId + 1, propsId, resonstructedData, currentPage);
  }
  
  const searchData = (name, value, page, data, searchState) => {
    let filledStates = getStates(name, value, searchState);
    let result = getData(filledStates, data);
    let tableData = getPageData(1, page, result, data);
    let count = getCountPage(result, data, page);
     return {'filledStates': filledStates,'result': result,'tableData': tableData,'count': count}
  }