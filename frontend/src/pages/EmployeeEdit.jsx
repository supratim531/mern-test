import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import { authorizedAxios, domain } from "../axios/axios";
import { convertToBase64 } from "../utils/convertToBase64";
import BrowserTitleBar from "../components/BrowserTitleBar";
import RootContext from "../contexts/RootContext";

function EmployeeEdit() {
  const params = useParams();
  const course1 = useRef(null);
  const course2 = useRef(null);
  const course3 = useRef(null);
  const token = localStorage.getItem("token");
  const rootContext = useContext(RootContext);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileB64, setImageFileB64] = useState(null);

  const [employee, setEmployee] = useState({
    f_Id: "",
    f_Image: "",
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "HR",
    f_gender: "",
    f_Course: ""
  });

  const getEmployeeById = async id => {
    try {
      const res = await authorizedAxios(token).get(`/employee/${id}`);
      console.log({ res });
      const data = res?.data;
      console.log({ data });
      setEmployee(data?.employee);
    } catch (err) {
      console.log({ err });
    }
  }

  const updateEmployee = async payload => {
    try {
      const res = await authorizedAxios(token).put(`/employee/${employee?.f_Id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log({ res });
      const data = res?.data;
      console.log({ data });
      rootContext?.setIsProcessing(false);
      toast.success(data?.message);
    } catch (err) {
      console.log({ err });
      rootContext?.setIsProcessing(false);

      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      } else {
        toast.error("Server Error: Server is offline");
      }
    }
  }

  const submitEmployeeDetails = e => {
    e.preventDefault();
    console.log("PRE:", employee, imageFile);

    if (employee.f_Course === '') {
      alert("Choose one course");
    } else {
      let formData = new FormData();

      if (imageFile) {
        formData.append("image", imageFile);
      }

      formData.append("f_Image", employee.f_Image);
      formData.append("f_Name", employee.f_Name);
      formData.append("f_Email", employee.f_Email);
      formData.append("f_Mobile", employee.f_Mobile);
      formData.append("f_Designation", employee.f_Designation);
      formData.append("f_gender", employee.f_gender);
      formData.append("f_Course", employee.f_Course);
      rootContext?.setIsProcessing(true);
      updateEmployee(formData);
    }
  }

  const handleImageChange = async e => {
    const imageFile = e.target.files[0];
    const base64 = await convertToBase64(imageFile);
    setImageFile(imageFile);
    setImageFileB64(base64);
    setEmployee({ ...employee, f_Image: employee?.f_Image });
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

  useEffect(() => {
    const id = params?.f_Id
    getEmployeeById(id);
  }, []);

  return (
    <>
      <BrowserTitleBar title={`Edit Employee ${employee?.f_Name} (${employee?.f_Id})`} />

      <div className="">
        <h1 className="pb-2 text-4xl bg-yellow-400">Edit Employee</h1>

        {
          employee?.f_Id ?
            <form onSubmit={submitEmployeeDetails} className="m-4 py-4 px-10 inline-flex flex-col gap-4 rounded shadow-md outline outline-1 outline-slate-200 shadow-slate-400">
              <div className="flex justify-between items-center gap-x-10">
                <label className="whitespace-nowrap font-medium text-gray-900">Name</label>
                <input
                  onChange={handleEmployeeChange}
                  value={employee.f_Name}
                  name="f_Name"
                  type="text"
                  className="block w-full px-3 py-2 rounded outline outline-1 outline-slate-400"
                  required={true}
                />
              </div>
              <div className="flex justify-between items-center gap-x-10">
                <label className="whitespace-nowrap font-medium text-gray-900">Email</label>
                <input
                  onChange={handleEmployeeChange}
                  value={employee.f_Email}
                  name="f_Email"
                  type="text"
                  className="block w-full px-3 py-2 rounded outline outline-1 outline-slate-400"
                  required={true}
                />
              </div>
              <div className="flex justify-between items-center gap-x-10">
                <label className="whitespace-nowrap font-medium text-gray-900">Mobile No</label>
                <input
                  onChange={handleEmployeeChange}
                  name="f_Mobile"
                  value={employee.f_Mobile}
                  type="text"
                  className="block w-full px-3 py-2 rounded outline outline-1 outline-slate-400"
                  required={true}
                />
              </div>
              <div className="flex justify-between items-center gap-x-10">
                <label className="whitespace-nowrap font-medium text-gray-900">Designation</label>
                <select onChange={handleEmployeeChange} value={employee.f_Designation} name="f_Designation" className="block w-full py-2 rounded outline outline-1 outline-slate-400">
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="sales">sales</option>
                </select>
              </div>
              <div className="flex justify-between items-center gap-x-10">
                <label className="whitespace-nowrap font-medium text-gray-900">Gender</label>
                <div className="flex justify-between items-center gap-x-10">
                  <div className=""><label htmlFor="M" className="cursor-pointer">M</label> <input onChange={handleEmployeeChange} type="radio" name="f_gender" id="M" value={"M"} required={true} checked={employee?.f_gender === "M"} /></div>
                  <div className=""><label htmlFor="F" className="cursor-pointer">F</label> <input onChange={handleEmployeeChange} type="radio" name="f_gender" id="F" value={"F"} required={true} checked={employee?.f_gender === "F"} /></div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-x-10">
                <label htmlFor="f_Course" className="whitespace-nowrap font-medium text-gray-900">Course</label>
                <div className="flex justify-between items-center gap-x-10">
                  <div className=""><label htmlFor="MCA" className="cursor-pointer">MCA</label> <input ref={course1} onChange={handleCourseChange} type="checkbox" name="f_Course" id={"MCA"} value={"MCA"} checked={employee?.f_Course === "MCA"} /></div>
                  <div className=""><label htmlFor="BCA" className="cursor-pointer">BCA</label> <input ref={course2} onChange={handleCourseChange} type="checkbox" name="f_Course" id={"BCA"} value={"BCA"} checked={employee?.f_Course === "BCA"} /></div>
                  <div className=""><label htmlFor="BSC" className="cursor-pointer">BSC</label> <input ref={course3} onChange={handleCourseChange} type="checkbox" name="f_Course" id={"BSC"} value={"BSC"} checked={employee?.f_Course === "BSC"} /></div>
                </div>
              </div>
              <div className="">
                <h2 className="whitespace-nowrap font-medium text-gray-900">Current Profile Image</h2>
                <img className="w-40" src={`${domain}/public/uploads/${employee?.f_Image}`} alt="" />
              </div>
              <div className="flex justify-between items-center gap-x-10">
                <label className="whitespace-nowrap font-medium text-gray-900">Update Profile Image</label>
                <input type="file" onChange={handleImageChange} />
              </div>
              <div className="">
                <img className="w-40" src={imageFileB64} alt="" />
              </div>
              {
                rootContext?.isProcessing ?
                  <div className=""><button disabled className="italic cursor-not-allowed w-full px-6 py-2 font-medium opacity-50 rounded bg-green-300">Updating...</button></div> :
                  <div className=""><button className="w-full px-6 py-2 font-medium rounded bg-green-300">Submit</button></div>
              }
            </form> :
            <div className="text-2xl">Fetching details of employee (id: <b className="text-blue-600">{params?.f_Id}</b>)...</div>
        }
      </div>
    </>
  );
}

export default EmployeeEdit;
