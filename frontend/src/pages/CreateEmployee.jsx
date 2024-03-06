import React, { useRef, useState } from "react";
import { authorizedAxios } from "../axios/axios";
import toast from "react-hot-toast";
import { convertToBase64 } from "../utils/convertToBase64";

function CreateEmployee() {
  const course1 = useRef(null);
  const course2 = useRef(null);
  const course3 = useRef(null);
  const token = localStorage.getItem("token");

  const [imageFile, setImageFile] = useState(null);
  const [imageFileB64, setImageFileB64] = useState(null);

  const [employee, setEmployee] = useState({
    f_Image: "",
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "HR",
    f_gender: "",
    f_Course: ""
  });

  const createEmployee = async payload => {
    try {
      const res = await authorizedAxios(token).post("/employee", payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log({ res });
      const data = res?.data;
      console.log({ data });
      toast.success(data?.message);
    } catch (err) {
      console.log({ err });
      toast.error(err?.response?.data?.message);
    }
  }

  const submitEmployeeDetails = e => {
    e.preventDefault();
    console.log("PRE:", employee, imageFile);

    if (employee.f_Course === '') {
      alert("Choose one course");
    } else {
      let formData = new FormData();
      formData.append("image", imageFile);
      formData.append("f_Image", employee.f_Image);
      formData.append("f_Name", employee.f_Name);
      formData.append("f_Email", employee.f_Email);
      formData.append("f_Mobile", employee.f_Mobile);
      formData.append("f_Designation", employee.f_Designation);
      formData.append("f_gender", employee.f_gender);
      formData.append("f_Course", employee.f_Course);
      createEmployee(formData);
    }
  }

  const handleImageChange = async e => {
    const imageFile = e.target.files[0];
    const base64 = await convertToBase64(imageFile);
    setImageFile(imageFile);
    setImageFileB64(base64);
    setEmployee({ ...employee, f_Image: `${imageFile?.lastModified}.${imageFile?.name.split('.')[1]}` });
  }

  const handleEmployeeChange = e => {
    setEmployee(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    })
  }

  const handleCourseChange = e => {
    if (course1.current === e.target) {
      course2.current.checked = false;
      course3.current.checked = false;

      if (e.target.checked) {
        setEmployee({ ...employee, f_Course: e.target.value });
      } else {
        setEmployee({ ...employee, f_Course: '' });
      }
    } else if (course2.current === e.target) {
      course1.current.checked = false;
      course3.current.checked = false;

      if (e.target.checked) {
        setEmployee({ ...employee, f_Course: e.target.value });
      } else {
        setEmployee({ ...employee, f_Course: '' });
      }
    } else {
      course1.current.checked = false;
      course2.current.checked = false;

      if (e.target.checked) {
        setEmployee({ ...employee, f_Course: e.target.value });
      } else {
        setEmployee({ ...employee, f_Course: '' });
      }
    }
  }

  return (
    <div className="">
      <h1 className="pb-2 text-4xl bg-yellow-400">Create Employee</h1>
      <form onSubmit={submitEmployeeDetails} className="m-4 py-4 px-10 inline-flex flex-col gap-4 rounded shadow-md outline outline-1 outline-slate-200 shadow-slate-400">
        <div className="flex justify-between items-center gap-x-10">
          <label className="whitespace-nowrap font-medium text-gray-900">Name</label>
          <input
            onChange={handleEmployeeChange}
            name="f_Name"
            type="text"
            className="w-full block px-3 py-2 rounded outline outline-1 outline-slate-400"
            required={true}
          />
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <label className="whitespace-nowrap font-medium text-gray-900">Email</label>
          <input
            onChange={handleEmployeeChange}
            name="f_Email"
            type="text"
            className="w-full block px-3 py-2 rounded outline outline-1 outline-slate-400"
            required={true}
          />
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <label className="whitespace-nowrap font-medium text-gray-900">Mobile No</label>
          <input
            onChange={handleEmployeeChange}
            name="f_Mobile"
            type="text"
            className="w-full block px-3 py-2 rounded outline outline-1 outline-slate-400"
            required={true}
          />
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <label className="whitespace-nowrap font-medium text-gray-900">Designation</label>
          <select onChange={handleEmployeeChange} name="f_Designation" className="w-full py-2 rounded outline outline-1 outline-slate-400">
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="sales">sales</option>
          </select>
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <label className="whitespace-nowrap font-medium text-gray-900">Gender</label>
          <div className="flex justify-between items-center gap-x-10">
            <div className=""><label htmlFor="M" className="cursor-pointer">M</label> <input onChange={handleEmployeeChange} type="radio" name="f_gender" id="M" value={"M"} required={true} /></div>
            <div className=""><label htmlFor="F" className="cursor-pointer">F</label> <input onChange={handleEmployeeChange} type="radio" name="f_gender" id="F" value={"F"} required={true} /></div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <label htmlFor="f_Course" className="whitespace-nowrap font-medium text-gray-900">Course</label>
          <div className="flex justify-between items-center gap-x-10">
            <div className=""><label htmlFor="MCA" className="cursor-pointer">MCA</label> <input ref={course1} onChange={handleCourseChange} type="checkbox" name="f_Course" id={"MCA"} value={"MCA"} /></div>
            <div className=""><label htmlFor="BCA" className="cursor-pointer">BCA</label> <input ref={course2} onChange={handleCourseChange} type="checkbox" name="f_Course" id={"BCA"} value={"BCA"} /></div>
            <div className=""><label htmlFor="BSC" className="cursor-pointer">BSC</label> <input ref={course3} onChange={handleCourseChange} type="checkbox" name="f_Course" id={"BSC"} value={"BSC"} /></div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <label className="whitespace-nowrap font-medium text-gray-900">Img Upload</label>
          <input type="file" onChange={handleImageChange} required={true} />
        </div>
        <div className="">
          <img className="w-40" src={imageFileB64} alt="" />
        </div>
        <div className=""><button className="w-full px-6 py-2 rounded bg-green-300">Submit</button></div>
      </form>
    </div>
  );
}

export default CreateEmployee;
