import Image from '../models/Image'

export default {
    render(image: Image ){
        return{  
            id: image.id,
            url: `http://localhost:8080/uploads/${image.path}`
        };
    },

    renderMany(image: Image[]){
        return image.map(image => this.render(image))
    }
}