import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { authorizedAxios, domain } from "../axios/axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import RootContext from "../contexts/RootContext";
import BrowserTitleBar from "../components/BrowserTitleBar";

function EmployeeList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const rootContext = useContext(RootContext);

  const [search, setSearch] = useState("");
  const [targetId, setTargetId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const deleteEmployee = async id => {
    try {
      let res = await authorizedAxios(token).delete(`/employee/${id}`);
      console.log({ res });
      let data = res?.data;
      console.log({ data });
      const deleteMessage = data?.message;

      // getAllEmployees();

      res = await authorizedAxios(token).get("/employee");
      console.log({ res });
      data = res?.data;
      console.log({ data });
      toast.success(deleteMessage);
      rootContext?.setIsProcessing(false);
      setEmployees(data?.employees);
      setFilteredEmployees(data?.employees);
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

  const deleteEmployeeById = (id) => {
    setTargetId(id);

    if (window.confirm("Are you sure?")) {
      rootContext?.setIsProcessing(true);
      deleteEmployee(id);
    } else {
      setTargetId(null);
    }
  }

  const getAllEmployees = async () => {
    try {
      const res = await authorizedAxios(token).get("/employee");
      console.log({ res });
      const data = res?.data;
      console.log({ data });
      setIsFetching(false);
      setEmployees(data?.employees);
      setFilteredEmployees(data?.employees);
    } catch (err) {
      console.log({ err });

      if (err?.response?.status === 404) {
        setEmployees([]);
        setFilteredEmployees([]);
        toast(t => (
          <>
            <span><b>{err?.response?.data?.message}</b> Start creating employee <button onClick={() => {
              toast.dismiss(t?.id);
              navigate("/create-employee");
            }} className="px-1 rounded outline outline-1 outline-zinc-300 bg-zinc-100">Create</button></span>
          </>
        ), {
          icon: "🔔"
        });
      } else {
        rootContext.setIsLogin(false);
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  const columns = [
    { name: "Unique Id", selector: row => <Link to={`/edit-employee/${row?.f_Id}`}><div title={row?.f_Id} className="cursor-pointer hover:text-blue-600">{row?.f_Id}</div></Link> },
    {
      name: "Image", selector: row => {
        return (
          <div className="w-16 h-16 rounded-full bg-black">
            <img src={`${domain}/public/uploads/${row?.f_Image}`} className="w-full h-full object-contain" />
          </div>
        );
      }
    },
    { name: "Name", selector: row => <span className="whitespace-break-spaces">{row?.f_Name}</span> },
    { name: "Email", selector: row => <a className="whitespace-break-spaces text-blue-600" href={`mailto:${row?.f_Email}`}>{row?.f_Email}</a> },
    { name: "Mobile No", selector: row => row?.f_Mobile },
    { name: "Designation", selector: row => row?.f_Designation },
    { name: "gender", selector: row => row?.f_gender },
    { name: "Course", selector: row => row?.f_Course },
    { name: "Create date", selector: row => row?.f_Createdate },
    {
      name: "Action", selector: row => {
        return (
          <div className="flex justify-between items-center gap-4">
            <div className="text-blue-600"><Link to={`/edit-employee/${row?.f_Id}`}>Edit</Link></div>
            {
              rootContext?.isProcessing && (row?.f_Id === targetId) ?
                <button onClick={() => deleteEmployeeById(row?.f_Id)} disabled className="italic opacity-70 text-red-600">Deleting...</button> :
                <button onClick={() => deleteEmployeeById(row?.f_Id)} className="text-red-600">Delete</button>
            }
          </div>
        );
      }
    },
  ];

  useEffect(() => {
    if (employees.length !== 0) {
      const result = employees?.filter(e => {
        const id = e?.f_Id
        const name = e?.f_Name.toLowerCase();
        const email = e?.f_Email.toLowerCase();
        const mobile = e?.f_Mobile.toLowerCase();
        const designation = e?.f_Designation.toLowerCase();
        const gender = e?.f_gender.toLowerCase();
        const course = e?.f_Course.toLowerCase();
        const createDate = e?.f_Createdate;

        const searchedValue = search.toLowerCase()
        return id.match(search) || name.match(searchedValue) || email.match(searchedValue) || mobile.match(searchedValue) || designation.match(searchedValue) || gender.match(searchedValue) || course.match(searchedValue) || createDate.match(searchedValue);
      });

      setFilteredEmployees(result);
    }
  }, [search]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <>
      <BrowserTitleBar title={"List of All Employees"} />

      {
        isFetching ?
          <div className="text-2xl">Fetching records of all employees...</div> :
          <DataTable
            title={
              <div className="flex justify-end">
                <div className="flex justify-between items-center text-base gap-x-4">
                  <div className="">Total Count: {filteredEmployees.length}</div>
                  <Link to={"/create-employee"}><button className="px-4 py-2 rounded bg-green-300">Create Employee</button></Link>
                </div>
              </div>
            }
            paginationRowsPerPageOptions={[5, 10, 20, 50]}
            columns={columns}
            data={filteredEmployees}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="385px"
            selectableRowsHighlight
            highlightOnHover
            className="data-table-scroll-none"
            subHeader
            subHeaderComponent={
              <div className="w-full mr-2">
                <div className="px-1 py-1 flex justify-end w-full">
                  <input
                    type="text"
                    className="w-full sm:w-[50%] xl:w-[35%] px-2.5 py-1.5 rounded outline outline-1 outline-sky-400 text-slate-800 focus:outline-2 focus:shadow-md placeholder:text-slate-600"
                    name="table-search"
                    id="table-search"
                    placeholder="Enter Search Keyword"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>
            }
          />
      }
    </>
  );
}

export default EmployeeList;
