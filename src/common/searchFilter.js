  /**
   * 
   * @param {*} filedColumn 
   * @param {*} data 
   * @returns 
   */
  const getData = async (filedColumn, data) => {
      return await data.filter(item => {
          return Object.keys(filedColumn).every(key => {
             return item[key].toLowerCase().search(filedColumn[key].toLowerCase()) !== -1
          })
      })
  }

  /**
   * 
   * @param {*} searchState 
   * @returns 
   */
  const getStates = (searchState = []) =>{
    return Object.fromEntries(
      Object.entries(searchState).filter(([key, value]) => value && key ) )
  }
 
  /**
   * 
   * @param {*} id 
   * @param {*} currentPage 
   * @param {*} list 
   * @param {*} allData 
   * @returns 
   */
  const getPageData = async(id, currentPage, list, allData) => {
    let items = (list.length > 0) ? list : allData;
    let pageData = await items.slice(currentPage * (id - 1), currentPage * id);
    if (pageData.length < 1 && id > 1) {
      return await getPageData(1, currentPage, list, allData)
    }
    return {'pageData' : pageData, 'activePageNumber' : id}
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
const searchData = async (data, searchState, rowsCount, activePageNumber) => {
  let filledStates = await getStates(searchState);
  let result = await getData(filledStates, data);
  let tableData = await getPageData(activePageNumber, rowsCount, result, data);
  let count = await getCountPage(result, data, rowsCount);
  return {
    'filledStates': filledStates,
    'result': result,
    'tableData': tableData['pageData'],
    'count': count,
    'activePageNumber': tableData['activePageNumber']
  }
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


  /**
   * Algorithem
   * 1)Function Name : searchData
   * 
   * i)arguements
   * ->data => full table constructed data
   * ->searchState => searchFieldStates object which holds key(columnName) and value(searchfieldValue)
   * ->rowsCount => it is for pagination which rows we need to display in each page
   * ->activePageNumber => it is active PageNumber in pagination
   * 
   * ii)getStates()
   * ->it will accept searchStates as object and return new object of valid key value i.e, for example 
   * value lenth greater than zero
   * 
   * iii)getdata()
   * ->it will accept filledStates and original full data it will filter data using searchstate key 
   * values then it will return filtered array
   * 
   * iv)getPageData()
   * ->arguments it will accept activePageNumber(currentPaginationNumber), rowsCount(number of 
   * rowscount which we display in table), result(filteredData from previous step),data(originalData)
   * 
   * ->if filteredData  length lesser than it will accept original data only for slicing array data by 
   * pageNumber
   * ->if pagNumber is greater than 0 and previous step data length < 0 calling same function by making
   * active pageNumber -1
   * ->it will return final pageData and activeNumebr because somecases pageNumber and searchdata both
   *  in active state we will get empty data or error so we doing this step
   * 
   * v)getCountPage
   * ->arguments are filteredData, originalData, numberRowsCount
   *  
   * ->if step 3 filteredData length less than zero it will take original array as input and based on
   *  rows count it will divide the entire data and produces pages count for pagination
   * 
   */