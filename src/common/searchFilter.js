  /**
   * 
   * @param {*} filedColumn 
   * @param {*} data 
   * @returns 
   */
  const getData = (filedColumn, data) => {
    return data.filter(item =>
        Object.entries(filedColumn).every(([index, value]) => item[value[0]].toLowerCase().search(value[1].toLowerCase()) !== -1
        ) 
      )
  }

  /**
   * 
   * @param {*} searchState 
   * @returns 
   */
  const getStates = (searchState = []) =>{
    return Object.entries(searchState).filter(([key, value])=>{return (key && value && value.length) ? true : false})
  }
 
  /**
   * 
   * @param {*} id 
   * @param {*} currentPage 
   * @param {*} list 
   * @param {*} allData 
   * @returns 
   */
  const getPageData = (id, currentPage, list, allData) => {
    let items = (list.length > 0) ? list : allData;
    return items.slice(currentPage * (id - 1), currentPage * id);
  }
  
  /**
   * 
   * @param {*} items 
   * @param {*} allData 
   * @param {*} currentPage 
   * @returns 
   */
  const getCountPage = (items, allData, currentPage) => {
    let item = (items.length > 0) ? items : allData;
    return (item.length > currentPage) ? Math.ceil(item.length / currentPage) : 0;
  }
  
  /**
   * 
   * @param {*} initialId 
   * @param {*} propsId 
   * @param {*} resonstructedData 
   * @param {*} currentPage 
   * @returns 
   */
  const verifyPageNumber = (initialId, propsId, resonstructedData, currentPage) => {
    let pageData = getPageData(initialId, currentPage, resonstructedData, resonstructedData);
    if (pageData.some(([key,value])=>{return value.id === propsId})) {
      return [pageData, initialId];
    }
    return verifyPageNumber(initialId + 1, propsId, resonstructedData, currentPage);
  }
  
  /**
   * 
   * @param {*} data 
   * @param {*} searchState 
   * @param {*} rowsCount 
   * @param {*} activePageNumber 
   * @returns 
   */
  const searchData = (data, searchState, rowsCount, activePageNumber) => {
    let filledStates = getStates(searchState);
    let result = getData(filledStates, data);
    let tableData = getPageData(activePageNumber,rowsCount, result, data);
    let count = getCountPage(result, data, rowsCount);
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

  /**
   * 
   */
  export const SearchFilter = {
    getPageData,
    getCountPage,
    verifyPageNumber,
    getStates,
    searchData,
    getData,
    getUniqNumericNotpresentInData,
  };