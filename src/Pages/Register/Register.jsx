import { useFormik } from "formik";
import * as Yup from "yup";
export default function Register() {
  const validation = Yup.object().shape({
    UserName: Yup.string()
      .required("Full Name is Requied")
      .min(3, "Minimum 3 letters"),
    Password: Yup.string()
      .required("Password is Required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9],'password Must Match)(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Invalid Password at least one uppercase Letter , one Lowercase Letter , number and special charachter"
      ),
    ConfirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("Password")]),
    Phone: Yup.string()
      .required("Phone Number is required")
      .matches(/^01[0125][0-9]{8}$/, "invalid Phone number"),
    Address: Yup.string().required("Adress  is required"),
    Gender: Yup.string().required("Gender is required"),
  });
  let formik = useFormik({
    initialValues: {
      UserName: undefined,
      Address: "",
      Password: "",
      ConfirmPassword: "",
      Phone: "",
      Gender: "",
    },
    onSubmit: (e) => console.log(e),
    validationSchema: validation,
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        action=""
        className="grid grid-cols-1 md:grid-cols-2 px-6 gap-5"
      >
        <div className="">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.UserName}
            name="UserName"
            type="text"
            placeholder="Full Name"
            className="ps-2  outline-0 w-full h-[56px] rounded-lg col-span-1 my-2 "
          />
          {formik.errors.UserName && formik.touched.UserName && (
            <p className="text-red-500">{formik.errors.UserName}</p>
          )}
        </div>
        <div>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Address}
            name="Address"
            type="text"
            placeholder="Address"
            className="ps-2  outline-0 w-full h-[56px] rounded-lg col-span-1 my-2"
          />

          {formik.errors.Address && formik.touched.Address && (
            <p className="text-red-500">{formik.errors.Address}</p>
          )}
        </div>
        <div>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Password}
            name="Password"
            type="password"
            placeholder="Passwprd"
            className="ps-20 outline-0 w-full h-[56px] rounded-lg col-span-1 my-2"
          />
          {formik.errors.Password && formik.touched.Password && (
            <p className="text-red-500">{formik.errors.Password}</p>
          )}
        </div>
        <div>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ConfirmPassword}
            name="ConfirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="ps-2 border-2 outline-0 w-full h-[56px] rounded-lg col-span-1 my-2"
          />
          {formik.errors.ConfirmPassword && formik.touched.ConfirmPassword && (
            <p className="text-red-500">{formik.errors.ConfirmPassword}</p>
          )}
        </div>
        <div>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Phone}
            name="Phone"
            type="tel"
            placeholder="Phone Number"
            className="ps-2  outline-0 w-full h-[56px] rounded-lg col-span-1"
          />
          {formik.errors.Phone && (
            <p className="text-red-500">{formik.errors.Phone}</p>
          )}
        </div>
        <div>
          <select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Gender}
            name="Gender"
            id=""
            placeholder="Gender"
            className="ps-2 outline-0 w-full h-[56px] rounded-lg col-span-1 my-2 "
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formik.errors.Gender && formik.touched.Gender && (
            <p className="text-red-500">{formik.errors.Gender}</p>
          )}
        </div>

        <button
          type="submit"
          name="Gender"
          className="col-span-2 bg-green p-4 rounded-lg text-white mx-auto"
        >
          {" "}
          Register
        </button>
      </form>
    </>
  );
}
