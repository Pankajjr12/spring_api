import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { registerUser } from "../../actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from(
  {
    length: 31,
  },
  (_, i) => i + 1
);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "Febuary" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
const RegisterForm = () => {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { theme } = useSelector((store) => store);

  const isDarkTheme = theme.currentTheme === "dark" 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      birthDate: {
        day: "",
        month: "",
        year: "",
      },
    },
    validationSchema,
    onSubmit: async (values) => {
      const formattedbirthDate = `${values.birthDate.year}-${values.birthDate.month}-${values.birthDate.day}`;
      const formattedValues = { ...values, birthDate: formattedbirthDate };
    
        await dispatch(registerUser(formattedValues));
        setSnackbarMessage("Registration successful!");
        setSnackbarOpen(true);
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("birthDate", {
      ...formik.values.birthDate,
      [name]: event.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="FullName"
              name="fullName"
              variant="outlined"
              size="large"
              type="text"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              size="large"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              variant="outlined"
              size="large"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel>Day</InputLabel>
            <Select
              fullWidth
              name="day"
              value={formik.values.birthDate.day}
              onChange={handleDateChange("day")}
              onBlur={formik.handleBlur}
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={4}>
            <InputLabel>Month</InputLabel>
            <Select
              fullWidth
              name="month"
              value={formik.values.birthDate.month}
              onChange={handleDateChange("month")}
              onBlur={formik.handleBlur}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <InputLabel>Year</InputLabel>
            <Select
              fullWidth
              name="year"
              value={formik.values.birthDate.year}
              onChange={handleDateChange("year")}
              onBlur={formik.handleBlur}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid className="mt-15" item xs={12}>
            <Button
              onClick={formik.handleSubmit}
              className="hover:text-black hover:font-bold my-3"
              sx={{
                borderRadius: "20px",
                overflow: "hidden",
                py: "10px",
                size: "large",
              }}
              fullWidth
              variant="contained"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
       anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <Button color="inherit" size="small" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      
      />
    </>
  );
};

export default RegisterForm;
