interface ILogin {
  email: string;
  password: string;
}

import TextField from "@mui/material/TextField";
import { Button, Box } from "@mui/material";
import { CustomAxios } from "../utils/CustomAxios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (userInfo: any) => {
    try {
      const res = await CustomAxios.post("/auth/login", userInfo);
      const data = res.data;
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.success) toast.success("Logged in");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.msg === "User not found") {
        setError("email", {
          message: "Email is incorrect",
        });
      } else if (error?.response?.data?.msg === "Incorrect password")
        setError("password", {
          message: "Password is incorrect",
        });
      else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          border: "1px solid gray",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
              message: "Please enter a valid email",
            },
          })}
          variant="outlined"
        />
        <Box color="red">{errors.email?.message}</Box>
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            pattern: {
              value:
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
              message:
                "Minimum eight characters, at least one letter and one number",
            },
          })}
          variant="outlined"
        />
        <Box color="red">{errors.password?.message}</Box>
        <Button type="submit" variant="contained">
          {isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </Box>
    </Box>
  );
}
