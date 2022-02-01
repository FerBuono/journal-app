import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'dg3ex9khu', 
    api_key: '882663259461765', 
    api_secret: 'vmSkb4kOgTpFS0HWa_kVfLGv03Q',
    secure: true
});

describe('Pruebas en fileUpload', () => {

    test('debe de cargar un archivo y retornar el URL', async() => {

        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();
        
        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        // Cloudinary SDK - Delete Image (para que no se acumulan)
        // Borrar imagen por id
        
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        await cloudinary.v2.api.delete_resources(imageId, {}, () => {});
    });

    test('debe de retornar un error', async() => {

        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });

  
});