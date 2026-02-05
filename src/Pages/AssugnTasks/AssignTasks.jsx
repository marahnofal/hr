import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import api from '../../Services/api';
import { useAuth } from '../../context/ThemeContext/AuthContext';
import toast from 'react-hot-toast';

export default function AssignTasks() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);

  const today = new Date();

  // =======================
  // OPTIONS
  // =======================
  const adminOptions = [
    { value: 'WEB', label: 'Web Department' },
    { value: 'QUALITY', label: 'Quality Department' },
    { value: 'MOBILE', label: 'Mobile Department' },
    { value: 'DESIGN', label: 'Design Department' },
  ];

  const managerOptions = employees.map((emp) => ({
    value: emp.id,
    label: emp.name,
  }));

  useEffect(() => {
    if (user?.role !== 'manager') return;

    async function fetchEmployees() {
      try {
        const res = await api.get('/users');
        const filtered = res.data.filter(
          (u) => u.department_id === user?.department_id
        );
        setEmployees(filtered);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }

    fetchEmployees();
  }, [user]);

  const formik = useFormik({
    initialValues: {
      department: null,
      employee: null,
      fromDate: null,
      toDate: null,
      description: '',
    },

    validationSchema: Yup.object({
      department:
        user?.role === 'admin'
          ? Yup.object().nullable().required('Department is required')
          : Yup.mixed().nullable(),

      employee:
        user?.role === 'manager'
          ? Yup.object().nullable().required('Employee is required')
          : Yup.mixed().nullable(),

      fromDate: Yup.date().required('Start date is required'),

      toDate: Yup.date()
        .min(Yup.ref('fromDate'), 'Deadline must be after start date')
        .required('Deadline is required'),

      description: Yup.string()
        .min(5, 'Too short')
        .required('Task details are required'),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          assigned_to:
            user?.role === 'admin'
              ? values.department.value
              : values.employee.value,

          from_date: values.fromDate.toISOString().split('T')[0],
          to_date: values.toDate.toISOString().split('T')[0],
          description: values.description,

          status: 'assigned',
          created_by: user?.role,
        };

        await api.post('/tasks', payload);

        resetForm();
        toast('Task assigned successfully ✅');
      } catch (error) {
        toast('Something went wrong ❌');
      }
    },
  });

  return (
    <div className="mx-auto mt-6 w-3/4 max-w-2xl p-4">
      <h2 className="mb-4 text-xl font-semibold">Assign Task</h2>
      <form onSubmit={formik.handleSubmit} className="grid gap-4">
        {/* Admin: Select Department */}
        {user?.role === 'admin' && (
          <>
            <Select
              classNamePrefix="rs"
              options={adminOptions}
              value={formik.values.department}
              onChange={(val) => formik.setFieldValue('department', val)}
              onBlur={() => formik.setFieldTouched('department', true)}
              placeholder="Select department"
            />
            {formik.touched.department && formik.errors.department && (
              <p className="text-sm text-red-500">{formik.errors.department}</p>
            )}
          </>
        )}

        {user?.role === 'manager' && (
          <>
            <Select
              classNamePrefix="rs"
              options={managerOptions}
              value={formik.values.employee}
              onChange={(val) => formik.setFieldValue('employee', val)}
              onBlur={() => formik.setFieldTouched('employee', true)}
              placeholder="Assign employee"
              isDisabled={managerOptions.length === 0}
            />
            {formik.touched.employee && formik.errors.employee && (
              <p className="text-sm text-red-500">{formik.errors.employee}</p>
            )}
          </>
        )}

        <DatePicker
          selected={formik.values.fromDate}
          onChange={(date) => formik.setFieldValue('fromDate', date)}
          onBlur={() => formik.setFieldTouched('fromDate', true)}
          minDate={today}
          placeholderText="Start date"
          className="border-default col-span-1 my-2 h-[56px] w-full rounded-lg border-2 px-2 outline-0"
        />
        {formik.touched.fromDate && formik.errors.fromDate && (
          <p className="text-sm text-red-500">{formik.errors.fromDate}</p>
        )}

        <DatePicker
          selected={formik.values.toDate}
          onChange={(date) => formik.setFieldValue('toDate', date)}
          onBlur={() => formik.setFieldTouched('toDate', true)}
          minDate={formik.values.fromDate || today}
          placeholderText="Deadline"
          className="border-default col-span-1 my-2 h-[56px] w-full rounded-lg border-2 px-2 outline-0"
        />
        {formik.touched.toDate && formik.errors.toDate && (
          <p className="text-sm text-red-500">{formik.errors.toDate}</p>
        )}

        {/* Task Description */}
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Task details"
          className="rounded-lg border p-2"
          rows={4}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-sm text-red-500">{formik.errors.description}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
          className="bg-green p-2"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
}
