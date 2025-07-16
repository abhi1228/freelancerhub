import axios from 'axios'

const upload=async(file)=>{
    const formData=new FormData();
    formData.append("file",file);
    formData.append("upload_preset","freeLancerHub");

    try {
        const res=await axios.post(import.meta.env.VITE_COLUDINARY_URL,formData);
        const {url}=res.data;
        return url;

    } catch (error) {
        console.log(error)
    }
}
export default upload