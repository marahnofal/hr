import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import Table from '../../Components/Table/Table';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import api from '../../Services/api';
import { useLoading } from '../../context/LoaderContext';

export default function Candidates() {
  const status = [
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'Interview', label: 'Interview in process' },
    { value: 'acepted', label: 'Accepted' },
  ];
  const { user } = useAuth();
  const { theme } = useTheme();
  const { loading, setLoading } = useLoading();

  const [allRecommendations, setAllRecommendations] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [filter, setFilter] = useState('');

  const columns = [
    { header: 'Job Title', accessorKey: 'title' },
    { header: 'Department', accessorKey: 'department' },

    { header: 'Employee ID', accessorKey: 'userId' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const currentStatus = row.original.status;
        return user.role === 'manager' ? (
          <Select
            classNamePrefix="rs"
            isSearchable={false}
            options={status}
            value={status.find((o) => o.value === row.original.status)}
            onChange={(val) => controlCandidateStatus(row.original.id, val)}
          />
        ) : (
          currentStatus
        );
      },
    },
    {
      header: 'Resume',
      accessorKey: 'fileData',
      cell: ({ row }) => {
        const { fileData, fileType } = row.original;
        return (
          <button
            onClick={() => openPdf(fileData, fileType)}
            className="bg-green rounded px-2 py-1 text-white"
          >
            View PDF
          </button>
        );
      },
    },
  ];
  async function controlCandidateStatus(rowID, newStatus) {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await api.patch(`/recommendations/${rowID}`, {
        status: newStatus.value,
      });
      setRecommendations((prev) =>
        prev.map((rec) =>
          rec.id === rowID ? { ...rec, status: newStatus.value } : rec
        )
      );

      toast.success('Status updated');
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

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

  const options =
    user?.role === 'manager'
      ? managerOptions
      : user?.role === 'admin'
        ? adminOptions
        : [];

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/recommendations');
        let data = res?.data || [];
        user?.role === 'manager'
          ? data.filter((c) => c.department === user.department || c.userId)
          : user?.role === 'employee'
            ? data.filter((c) => user.id === c.userId)
            : (data = data);

        setAllRecommendations(data);

        setRecommendations(filterLogic(data, filter, user));
      } catch (error) {
        console.log(error);

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

  useEffect(() => {
    if (allRecommendations.length) {
      setRecommendations(filterLogic(allRecommendations, filter, user));
    }
  }, [filter, allRecommendations, user]);

  function filterLogic(allCandidates, filter, user) {
    let filteredCandidates = [];

    if (user?.role === 'employee') {
      filteredCandidates = recommendations;
    }

    if (user?.role === 'manager') {
      filteredCandidates = allCandidates.filter((c) => {
        if (filter === 'myCandidates') return c.userId === user.id;
        if (filter === 'department') return c.department === user.department_id;

        return c.userId === user.id || c.department === user.department_id;
      });
    }

    if (user?.role === 'admin') {
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
