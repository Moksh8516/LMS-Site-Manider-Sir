import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const DisplayBlog = () => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  const getBlog = async () => {
    try{
        const data = await axios.get('/api/v1/blog')
        if(data){
            console.log(data)
            setBlog(data.data.data.data)
        }
    }catch(err){
        console.log(err)
    }
  }
 useEffect(()=>{
    getBlog();
 },[])

 const handleDelete = async (id) => {
    try{
        const data = await axios.delete(`/api/v1/blog/${id}`)
        if(data){
            getBlog();
            toast.success('Blog deleted')
        }
    }catch(err){
        console.log(err)
    }
 }


  return (
    <div className="px-4 lg:px-8 h-screen w-screen ">
      <h4 className="text-2xl lg:text-3xl font-semibold text-center mb-6 text-gray-800">
        Blogs
      </h4>
      {/* Wrapper with overflow-x-auto */}
      <div className="overflow-x-auto border rounded-lg shadow-lg">
        <table className="table-auto w-screen bg-white border-collapse min-w-[800px]">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 border">S.No.</th>
              <th className="px-4 py-3 border">Blog Image</th>
              <th className="px-4 py-3 border">Blog Title</th>
              <th className="px-4 py-3 border">Blog Type</th>
              <th className="px-4 py-3 border">Description</th>
              <th className="px-4 py-3 border">Author</th>
              <th className="px-4 py-3 border">Creation Date</th>
              <th className="px-4 py-3 border">Delete</th>
              <th className="px-4 py-3 border">Update</th>
            </tr>
          </thead>
          <tbody>
            {blog.map((blog, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">
                  <img src={blog.BlogUrl} className="w-[90px]" alt="" />
                </td>
                <td className="px-4 py-2 border">{blog.BlogTitle}</td>
                <td className="px-4 py-2 border">{blog.BlogType}</td>
                <td className="px-4 py-2 border">
                  {blog.Description.slice(0, 90)}...
                </td>
                <td className="px-4 py-2 border">{blog.Instructor}</td>
                <td className="px-4 py-2 border text-nowrap">
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex items-center justify-center group text-white mx-auto rounded-sm"
                  >
                    <span className="group-hover:hidden">
                      <box-icon name="trash" color="#fc2121"></box-icon>
                    </span>
                    <span className="hidden group-hover:block">
                      <box-icon
                        name="trash"
                        animation="tada"
                        flip="horizontal"
                        color="red"
                      ></box-icon>
                    </span>
                  </button>
                </td>
                <td className="px-4 py-2 border">
                  <button onClick={()=>navigate(`/admin/dashboard/update-blog/${blog._id}`)} className="px-5 py-2 bg-blue-500 text-white hover:bg-blue-700">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayBlog;