// class ApiFeatures {
//   constructor(query, queryStr) {
//     (this.query = query), //it's mean in this class present query and queryStr
//       (this.queryStr = queryStr); //this queryStr meand the keywords
//   }
//   //use for search functionality
//   search() {
//     //acess the keyword value use to writing this.queryStr.keyword
//     const keyword = this.queryStr.keyword
//       ? {
//           //if keyword presnet return it other wise nothing
//           name: {
//             $regex: this.queryStr.keyword, //what do you want to find write this //you will search samosa but present samosamosha it will also present samosa so it will be show
//             $options: "i",
//             // meaning of small i is case insensetive
//           },
//         }
//       : {};
//     // console.log(keyword)
//     //er por ami keyword ta peye jabo then
//     //key word wise search korte hobe amake so change  kore find korte hobe
//     this.query = this.query.find({ ...keyword }); //find korte pathay dibe keyword wise
//     /*etar sahajje amra keyword ta find korar jonno pathay dicchi
//         jeta amara regex er help ee baniyechi*/
//     return this; //it will be return the current object
//   }
//   //this.query mean product.find method and this.querystr mean req.query jeta asche seta
//   //rule when you filter anything then you remove other keywords only search specific category

//   //use for filter functionality
//   filter() {
//     const querycopy = { ...this.queryStr }; //value of keyword fully copy not reaferance using sprade operator it  will be fully passed
//     //removing extra keywords
//     console.log(querycopy);

//     //this one filte search created for the filters in URL
//     //like particulart category search
//     const removeFields = ["keyword", "page", "limit"]; //this keywords are remove in the URL fields
//     removeFields.forEach((key) => delete querycopy[key]); //delete this keywords
//     console.log(querycopy);

//     // this filter create for search in the range of  price like price 1200-2000
//     let queryStr = JSON.stringify(querycopy); //first convert in string
//     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); //add dollar because in mongodb everthing take $ symbol
//     this.query = this.query.find(JSON.parse(queryStr)); //then string convert in the object form
//     console.log(queryStr);
//     return this;
//   }

//   //pagination wise per page show  limited items

//   pagination(resultPerpage) {
//     const currentpage = Number(this.queryStr.page) || 1;
//     const skip = resultPerpage * (currentpage - 1);
//     // when firstpage number of skip products
//     // skip =5 * (1-1)
//     //     =5*0
//     //     =0 number of skip products 0 karon first page ee kichui skip korbo na taii
//     this.query = this.query.limit(resultPerpage).skip(skip);
//     //show 5 product and skip 5*(1-1)=0
//     //example first page ee limit thakbe resultperpage=5
//     //first page ee limit thekbe 5 skip korbo 0 products
//     //limit and skip function of mongodb
//     return this;
//   }
// }
// module.exports = ApiFeatures;

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
