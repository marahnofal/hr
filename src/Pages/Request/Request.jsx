import { useFormik } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { useAuth } from '../../context/ThemeContext/AuthContext';

import toast from 'react-hot-toast';
import api from './../../Services/api';
import RequestManagement from '../RequestManagement/RequestManagement';

export default function Request() {
  const { user } = useAuth();
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let validation = Yup.object().shape({
    Type: Yup.string().required('Required'),
    FromDate: Yup.date().required('Required').min(today, 'invalid past dates'),
    ToDate: Yup.date()
      .required('Required')
      .min(Yup.ref('FromDate'), 'Does not match with the starting Date'),
    Reason: Yup.string().required('Required'),
  });
  let formik = useFormik({
    initialValues: {
      Type: '',
      FromDate: null,
      ToDate: null,
      Reason: '',
    },
    onSubmit: async (values) => {
      try {
        await api.post('/leaves', {
          name: user?.name,
          userId: user?.id,
          department: user?.department_id,
          type: values.Type,
          from: values.FromDate,
          to: values.ToDate,
          reason: values.Reason,
          status: 'pending',
        });
        toast.success('submitted succesffuly');
      } catch (err) {
        toast.error('your leave failed to be submitted');
        console.log(err);
      }
    },
    validationSchema: validation,
  });
  const options = [
    { value: '', label: 'Select Leave Type' },
    { value: 'planned', label: 'Planned Vacation' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'emergency', label: 'Emergency' },
  ];
  return (
    <>
      <form onSubmit={formik.handleSubmit} action="" className="mx-2">
        <div>
          <Select
            classNamePrefix="rs"
            name="Type"
            options={options}
            value={options.find((opt) => opt.value === formik.values.Type)}
            onChange={(option) => formik.setFieldValue('Type', option.value)}
            onBlur={() => formik.setFieldTouched('Type', true)}
          />
          {formik.errors.Type && formik.touched.Type && (
            <p className="text-red-500">{formik.errors.Type}</p>
          )}
        </div>
        <div className="flex items-center gap-10">
          <DatePicker
            selected={formik.values.FromDate}
            onChange={(date) => formik.setFieldValue('FromDate', date)}
            onBlur={() => formik.setFieldTouched('FromDate', true)}
            placeholderText="Starting Date"
            minDate={today}
            className="border-default col-span-1 my-2 h-[56px] w-full rounded-lg border-2 px-2 outline-0"
          />
          {formik.errors.FromDate && formik.touched.FromDate && (
            <p className="text-red-500">{formik.errors.FromDate}</p>
          )}
          <DatePicker
            selected={formik.values.ToDate}
            onChange={(date) => formik.setFieldValue('ToDate', date)}
            onBlur={() => formik.setFieldTouched('ToDate', true)}
            placeholderText="Ending Date"
            minDate={today}
            className="border-default col-span-1 my-2 h-[56px] w-full rounded-lg border-2 px-2 outline-0"
          />
          {formik.errors.ToDate && formik.touched.ToDate && (
            <p className="text-red-500">{formik.errors.ToDate}</p>
          )}
        </div>

        <textarea
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Reason}
          placeholder="Reason"
          name="Reason"
          id=""
          className="border-default col-span-1 my-2 h-[100px] w-full rounded-lg border-2 px-2 outline-0"
        ></textarea>
        {formik.errors.Reason && formik.touched.Reason && (
          <p className="text-red-500">{formik.errors.Reason}</p>
        )}
        <button type="submit" className="bg-green h-8 w-16 text-white">
          Apply
        </button>
      </form>
      <RequestManagement />
    </>
  );
}
