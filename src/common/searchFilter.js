  const getData = (filedColumn, data) => {
    return data.filter(item =>
        Object.entries(filedColumn).every(([key, value]) => value && item[key] && item[key].toLowerCase().search(value.toLowerCase()) !== -1)
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
  
  const getCountPage = (items, allData, currentPage) => {
    let item = (items.length > 0) ? items : allData;
    return (item.length > currentPage) ? Math.ceil(item.length / currentPage) : 0;
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

  /**
   * This is optional function not related to search filter
   * @param {*} data 
   * @param {*} column 
   * @returns 
   */
  const getUniqNumericNotpresentInData =  (data = [], column = 'id') => {
       let uniqId = Math.floor(Math.random() * (100000 + 1 - 1) + 1);
       if (data.length > 0) {
        let dataIds = data.map(value => value[column] );
        if (! [...new Set(dataIds)].includes(uniqId)) {
           return uniqId;
        }
         getUniqNumericNotpresentInData(data, column)
       }
       return uniqId;
  }

  export const SearchFilter = {
    getPageData,
    getCountPage,
    verifyPageNumber,
    getStates,
    searchData,
    getData,
    getUniqNumericNotpresentInData,
  };