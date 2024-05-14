'use client'

import { createClient } from "@/utils/supabase/client";
import { useCallback, useRef } from "react";

export default function Profile() {
  const supabase = createClient();

const inputRef = useRef(null)

  const handleClick = useCallback(() => {
    inputRef.current.click()
  }, [])

  // Handle file upload event
  const uploadFile = async (event) => {
    const file = event.target.files[0];
    const bucket = "header-picture"

    const{data: {user}} = await supabase.auth.getUser()

    // Call Storage API to upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(user.id + '/' + file.name, file);

    // Handle error if upload failed
    if(error) {
      alert('Error uploading file.' + error.message);
      return;
    }

    alert('File uploaded successfully!');
  };

  return (
    <div>
      <h1>Upload Profile Photo</h1>
      <input ref={inputRef} className="" type="file" />
      <button onClick={handleClick} className="border border-text">Upload</button>
      <button className="border border-text" onClick={uploadFile}>Submit</button>
    </div>
  );
}