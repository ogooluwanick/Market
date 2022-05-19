import mongoose  from "mongoose";

const reviewSchema= new mongoose.Schema(
        {
                user:    { type:mongoose.Schema.Types.ObjectId,required: true, ref:"User"},
                name:{type: String , required: true},
                rating:{type: Number , required: true},
                comment:{type: String , required: true},

        },
        {
                timestamps:true
        }
);
 
const productSchema= new mongoose.Schema(
    {
        user:    { type:mongoose.Schema.Types.ObjectId,required: true, ref:"User"},
        name:       { type: String , required: true},
        image:     { type: String , required: true, default:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QDoRXhpZgAASUkqAAgAAAABAA4BAgDGAAAAGgAAAAAAAAAzZCBleGhpYml0aW9uIHN0YW5kLiBXaGl0ZSBibGFuayBlbXB0eSBwb2RpdW0gaXNvbGF0ZWQgb24gZ3JheSBiYWNrZ3JvdW5kIGZvciBwcmVzZW50YXRpb24gYW5kIGV4cG9zaXRpb24uIFZlY3RvciBpbGx1c3RyYXRpb24gZm9yIG1vY2sgdXAgc3RvcmUuIFBlZGVzdGFsIGZvciBkaXNwbGF5IHByb2R1Y3QuIEludGVyaW9yIHN0YWdlIGRlc2lnbi7/4QXwaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj4KCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CgkJPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpJcHRjNHhtcENvcmU9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iICAgeG1sbnM6R2V0dHlJbWFnZXNHSUZUPSJodHRwOi8veG1wLmdldHR5aW1hZ2VzLmNvbS9naWZ0LzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIHBob3Rvc2hvcDpDcmVkaXQ9IkdldHR5IEltYWdlcy9pU3RvY2twaG90byIgR2V0dHlJbWFnZXNHSUZUOkFzc2V0SUQ9IjExOTAzMTkxMTAiIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9sZWdhbC9saWNlbnNlLWFncmVlbWVudD91dG1fbWVkaXVtPW9yZ2FuaWMmYW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybCIgPgo8ZGM6Y3JlYXRvcj48cmRmOlNlcT48cmRmOmxpPk1hbmFueWEgS2Fld3RoYXdlZTwvcmRmOmxpPjwvcmRmOlNlcT48L2RjOmNyZWF0b3I+PGRjOmRlc2NyaXB0aW9uPjxyZGY6QWx0PjxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+M2QgZXhoaWJpdGlvbiBzdGFuZC4gV2hpdGUgYmxhbmsgZW1wdHkgcG9kaXVtIGlzb2xhdGVkIG9uIGdyYXkgYmFja2dyb3VuZCBmb3IgcHJlc2VudGF0aW9uIGFuZCBleHBvc2l0aW9uLiBWZWN0b3IgaWxsdXN0cmF0aW9uIGZvciBtb2NrIHVwIHN0b3JlLiBQZWRlc3RhbCBmb3IgZGlzcGxheSBwcm9kdWN0LiBJbnRlcmlvciBzdGFnZSBkZXNpZ24uPC9yZGY6bGk+PC9yZGY6QWx0PjwvZGM6ZGVzY3JpcHRpb24+CjxwbHVzOkxpY2Vuc29yPjxyZGY6U2VxPjxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPjxwbHVzOkxpY2Vuc29yVVJMPmh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9waG90by9saWNlbnNlLWdtMTE5MDMxOTExMC0/dXRtX21lZGl1bT1vcmdhbmljJmFtcDt1dG1fc291cmNlPWdvb2dsZSZhbXA7dXRtX2NhbXBhaWduPWlwdGN1cmw8L3BsdXM6TGljZW5zb3JVUkw+PC9yZGY6bGk+PC9yZGY6U2VxPjwvcGx1czpMaWNlbnNvcj4KCQk8L3JkZjpEZXNjcmlwdGlvbj4KCTwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InciPz4K/+0BHFBob3Rvc2hvcCAzLjAAOEJJTQQE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"},
        showcaseImgs:[String],
        description:    { type: String , required: true},
        brand:{ type: String , required: true},
        category:    { type: String , required: true},
        price:    { type: Number , required: true,default:0},
        countInStock: { type: Number , required: true,default:0},
        rating: { type: Number , required: true , default:0},
        reviews:[],
        numReviews:{ type: Number , required: true,default:0}

    }, 
     
    {
    timestamps: true
    }
);

const Product =mongoose.model('Product',productSchema);
export default Product;