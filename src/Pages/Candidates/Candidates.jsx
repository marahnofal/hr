import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import api from '../../Services/api';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import toast from 'react-hot-toast';
import Select from 'react-select';
import Table from '../../Components/Table/Table';

export default function Candidates() {
  const[candidateStatus,setCandidateStatus]=useState('')
  
  const status=[
    {value:'pending',label:'Pending'},
    {value:'rejected',label:'Rejected'},
    {value:'Interview',label:'Interview in process'},
    {value:'acepted',label:'Accepted'},]
  const { user } = useAuth();
  const { theme } = useTheme();

  const [allRecommendations, setAllRecommendations] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [filter, setFilter] = useState('');

  // Table columns
  const columns = [
    { header: 'Job Title', accessorKey: 'title' },
    { header: 'Department', accessorKey: 'department' },
    
    { header: 'Employee ID', accessorKey: 'userId' },
    { header: 'Employee ID', accessorKey: 'status', cell:({row})=>{

      
    } },
    {
      header: 'Resume',
      accessorKey: 'fileData', // this is your Base64 string
      cell: ({ row }) => {
        const { fileData, fileType } = row.original; // adjust based on your API
        return (
          <button
            onClick={() => openPdf(fileData, fileType)}
            className="rounded bg-green px-2 py-1 text-white"
          >
            View PDF
          </button>
        );
      },
    },
    
  ];

  // Manager and admin dropdown options
  const managerOptions = [
    { value: '', label: 'Candidates' },
    { value: 'myCandidates', label: 'My Candidates' },
    { value: 'department', label: 'Department Candidates' },
  ];

  const adminOptions = [
    { value: 'all', label: 'All Candidates' },
    { value: 'web', label: 'Web Candidates' },
    { value: 'mobile', label: 'Mobile Candidates' },
    { value: 'quality', label: 'Quality Candidates' },
    { value: 'graphics', label: 'Graphics Candidates' },
  ];

  // Choose dropdown options based on role
  const options =
    user?.role === 'manager'
      ? managerOptions
      : user?.role === 'admin'
        ? adminOptions
        : [];

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/recommendations');
        const data = res?.data || [];
        setAllRecommendations(data);

        // initial filter
        setRecommendations(filterLogic(data, filter, user));
      } catch (error) {
        console.log(error);
        theme === 'dark'
          ? toast.error('Error loading data', {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
          : toast.error('Error loading data.');
      }
    }

    fetchData();
  }, [user]);

  // Apply filter whenever filter changes
  useEffect(() => {
    if (allRecommendations.length) {
      setRecommendations(filterLogic(allRecommendations, filter, user));
    }
  }, [filter, allRecommendations, user]);

  // --- This is your original logic rewritten cleanly ---
  function filterLogic(allCandidates, filter, user) {
    let filteredCandidates = [];

    if (user.role === 'employee') {
      // Employee: only their own candidates
      filteredCandidates = recommendations;
    }

    if (user.role === 'manager') {
      // Manager logic similar to your original
      filteredCandidates = allCandidates.filter((c) => {
        if (filter === 'myCandidates') return c.userId === user.id;
        if (filter === 'department') return c.department === user.department_id;
        // default: both my and department candidates
        return c.userId === user.id || c.department === user.department_id;
      });
    }

    if (user.role === 'admin') {
      // Admin logic similar to your original
      filteredCandidates = allCandidates.filter((c) => {
        if (!filter || filter === 'all') return true;
        return c.department === filter.toUpperCase();
      });
    }

    return filteredCandidates;
  }
  function openPdf(base64String, fileType = 'application/pdf') {
    if (!base64String) return;

    // Remove data URL prefix if exists
    const cleanedBase64 = base64String.includes('base64,')
      ? base64String.split('base64,')[1]
      : base64String;

    try {
      const byteCharacters = atob(cleanedBase64);
      const byteNumbers = new Array(byteCharacters.length)
        .fill()
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: fileType });
      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, '_blank');
    } catch (error) {
      console.error('Failed to decode Base64:', error);
      alert('Invalid PDF file');
    }
  }

  return (
    <div className="p-4">
      {/* Dropdown only for manager/admin */}
      {options.length > 0 && (
        <div className="mb-4 w-[50%]">
          <Select
            classNamePrefix="rs"
            name="candidate"
            options={options}
            value={options.find((opt) => opt.value === filter)}
            onChange={(option) => setFilter(option.value)}
            isSearchable={false}
          />
        </div>
      )}

      {/* Table */}
      <Table column={columns} rows={recommendations} />
    </div>
  );
}
