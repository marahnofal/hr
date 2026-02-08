import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import api from '../../Services/api';
import Table from '../Table/Table';
import { useLoading } from '../../context/LoaderContext';
import { ca } from 'zod/v4/locales';


export default function JobVacancy() {
  const { user } = useAuth();
  const [vacancies, setVacancies] = useState([]);
  const [file, setFile] = useState(null);
  const {loading,setLoading}=useLoading();
  //   const handleFileChange = (e) => {
  //     const selectedFiles = e.target.files[0];
  //     if (!selectedFiles) return;
  //     setFile(selectedFiles);
  //   };
  //   const submitFile = async () => {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('userID', user.id);
  //     formData.append('status', 'pending');

  //   };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const handleFileChange = async (e, vacancyId, department,title) => {
    const file = e.target.files[0];
    if (!file) return;
    try{
      
    const base64 = await fileToBase64(file);

    await api.post('/recommendations', {
      title,
      vacancyId,
      fileName: file.name,
      fileType: file.type,
      fileData: base64,
      status: 'pending',
      userId: user.id,
      department,
    });
        toast.success('File uploaded successfully ');
    }catch(error){
          toast.error('Failed');

    }

  };
  const columns = [
    { header: 'Job Title', accessorKey: 'title' },
    { header: 'Job Level', accessorKey: 'level' },
    { header: 'Department', accessorKey: 'department' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Location', accessorKey: 'location' },
    ,
    {
      header: 'Recommendation',
      cell: (info) => (
        <div className="flex items-center justify-center">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              handleFileChange(
                e,
                info.row.original.id,
                info.row.original.department.toUpperCase(),
                info.row.original.title
              )
            }
            id={`file-upload-${info.row.original.id}`}
            className="hidden"
          />
          <label
            htmlFor={`file-upload-${info.row.original.id}`}
            className="mx-auto cursor-pointer"
          >
            <MdOutlineFileUpload />
          </label>
        </div>
      ),
    },
  ];
  useEffect(() => {
    async function fetchData() {
 try{
      setLoading(true);

     const res = await api.get('/vacnceis');
     await new Promise((resolve) => setTimeout(resolve, 1000));
      let data = res?.data;
      setVacancies(data);
      console.log(vacancies);
 }catch(error){
      
      toast.error('Failed to load vacancies');
    }finally{
      setLoading(false);  
    }
  }
    fetchData();
  }, []);

  return <Table column={columns} rows={vacancies} />;
}
