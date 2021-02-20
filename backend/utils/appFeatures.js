class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i' // nhập hoa hay thường đều search ra
            }
        } : { }
        // console.log(keyword); 
        this.query = this.query.find({...keyword}); 
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr };
        //console.log(queryCopy);
        // remove fields from query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);
        //console.log(queryCopy);
        // Advance filter for price, rating, etc,..
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte|in)\b/g, // EQ("="), GTE(">="), GT(">"), LT("<"), LTE("<=")
            match => `$${match}`
        );
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; 
        const skip = resPerPage * (currentPage - 1); // bo cac san pham ra lay o cac trang truoc
        console.log(currentPage);
        console.log(skip);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}
module.exports = APIFeatures