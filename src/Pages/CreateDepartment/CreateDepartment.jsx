import { useForm } from 'react-hook-form';

export default function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      departmentName: '',
      departmentDescription: '',
    },
  });
  const onsubmit = (data) => console.log(data);
  return (
    <>
      <div className="mx-auto w-[80%]">
        <form
          onSubmit={handleSubmit(onsubmit)}
          action=""
          className="mpauto flex flex-col gap-5"
        >
          <input
            {...register('departmentName', { required: 'Name is Required' })}
            type="text"
            className="h-[56px] w-full border-2  ps-2 outline-green-600"
            placeholder="Department Name "
          />
          {errors.departmentName && (
            <p className="text-red-500">{errors.departmentName.message}</p>
          )}
          <textarea
            placeholder="Description"
            {...register('departmentDescription', {
              required: 'Description is Required',
            })}
            className="h-22 w-full border-2 border-gray-200 ps-2 outline-green-600"
            name="desciption"
            id=""
          ></textarea>
          {errors.departmentDescription && (
            <p className="text-red-500">
              {errors.departmentDescription.message}
            </p>
          )}
          <button
            type="submit"
            className="bg-green h-10 w-[14%] rounded-lg text-lg text-white"
          >
            Create Department
          </button>
        </form>
      </div>
    </>
  );
}
