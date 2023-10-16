import { useEffect, useRef, useState } from "react"

const UploadWidget = () =>{
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    //const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    useEffect(()=> {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName:'dbhsjm5a2',
            uploadPreset: 'zm8dul6u'
        }, function(error,result){
            if (!error && result && result.event === 'success') {
                // provides url to uploaded image
                const imageUrl = result.info.secure_url;
                //setUploadedImageUrl(imageUrl);
                
                console.log("Image URL:", imageUrl);
            }
        });
    }, [])

    return (
        <div>
          <button onClick={() => widgetRef.current.open()}>Upload</button>
          {/* {uploadedImageUrl && (
            <div>
              <p>Uploaded Image URL:</p>
              <img src={uploadedImageUrl} alt="Uploaded" />
            </div>
          )} */}
        </div>
      );
    };

export default UploadWidget