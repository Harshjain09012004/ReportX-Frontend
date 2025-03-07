import { RiUploadCloudLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import PropTypes from "prop-types";

const url = import.meta.env.VITE_SERVER;

export const Uploadphotos = (props) => {
  
  function isValidURL(url) 
  {
    try {
      const urlObject = new URL(url);
      
      Uploadphotos.propTypes = {
        photoUrl: PropTypes.string.isRequired,
        photos: PropTypes.array.isRequired,
        setphotos: PropTypes.func.isRequired,
        setphotoUrl: PropTypes.func.isRequired,
      };

      if (!urlObject.hostname) {
        return false;
      }
      if (urlObject.port && (urlObject.port < 1 || urlObject.port > 65535)) {
        return false;
      }
      return true;
    }

    catch (error) {
      return false;
    }
  }

  async function uploadphoto(e){
    try{
      e.preventDefault();
      if (isValidURL(props.photoUrl)) {
        const photourl = props.photoUrl;
        const res = await axios.post("/uploadByLinks", { photourl })
        props.setphotos([...props.photos,res.data])
        props.setphotoUrl("");
      }
    }
    catch{alert('Non-Supported Image')}
  }

  function imagePicker(e){
    const files = e.target.files;
    const data = new FormData();
    for(let file of files) {data.append('photos',file)}
    axios.post('/uploadByButton',data,{
      headers:{'Content-Type':'multipart/form-data'}
    }).then((res)=>{
      const filenames = res.data;
      props.setphotos([...props.photos,...filenames])
    })
  }
  function removePhoto(){}

  return (
    <div>
      <h3 className="font-bold text-2xl">Photos</h3>
      <h4>Images related to your complaint</h4>
      <div>
        <div>
          <input
            type="text"
            name="photos"
            value={props.photoUrl}
            placeholder="Add using a link xyz.jpg"
            className=" w-[600px] h-10 mt-4"
            onChange={(e) => {
              props.setphotoUrl(e.target.value);
            }}
          />

          <button
            className=" bg-slate-400 px-5 py-2 text-white  font-semibold rounded-lg ml-4 active:scale-105"
            onClick={uploadphoto}
          >
            Add
          </button>
        </div>

        <div className="grid grid-cols-3 items-center gap-5 mt-5 max-h-[85%] w-[52%]">
          {props.photos.length > 0 &&
            props.photos.map((links, index) => (
              <div key={index} className="relative">
                <img
                  className="rounded-2xl object-cover h-48 w-80"
                  src={`${url}/uploads/${links}`}
                  alt="place"
                />
                <RxCrossCircled
                  key={index}
                  className="absolute top-2 right-2 size-6 text-cyan-50 active:scale-105 cursor-pointer"
                  onClick={removePhoto}
                />
              </div>
            ))}

          <label className="border-slate-300 border-[1px] rounded-xl w-54 py-16 flex gap-3 place-items-center place-content-center shadow-md active:scale-105 cursor-pointer">
            <input
              type="file"
              hidden
              multiple
              id="imagepicker"
              onChange={imagePicker}
            />
            <RiUploadCloudLine className="text-3xl" />
            <p className="text-2xl">Upload</p>
          </label>
        </div>
      </div>
    </div>
  );
}